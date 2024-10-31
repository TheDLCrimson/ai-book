import React, { useState, useEffect } from "react";
import SelectMenu from "./select-menus";

type Quizzes = {
  id: number;
  question: string;
  answer: string;
  options: string[];
};

export default function SideContent() {
  const [type, setType] = useState("Multiple Choices");
  const [level, setLevel] = useState("Basic");
  const [knowledgeRange, setKnowledgeRange] = useState("Chapter 1");
  const [numberOfQuestions, setNumberOfQuestions] = useState("5");
  const [questions, setQuestions] = useState<Quizzes[]>([]);
  const [isQuizGenerated, setIsQuizGenerated] = useState(false);

  const handleGenerateQuiz = async () => {
    const requestData = {
      type,
      level,
      knowledgeRange,
      numberOfQuestions,
    };

    console.log("Request Data:", requestData);

    const fetchQuizQuestions = async () => {
      try {
        const response = await fetch("https://api.coze.com/v3/chat", {
          method: "POST",
          headers: {
            Authorization:
              "Bearer pat_WOmFBGEykcbel1nz9Mzu32jW5UaWx0Rp9LFuNGr3zbrFVgeCI4QmOg2Fkd0ZED5j",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bot_id: "7402185067860459527",
            user_id: "Crimson",
            stream: true,
            response_format: "json_object",
            additional_messages: [
              {
                role: "user",
                content: `Give me ${numberOfQuestions} questions for a ${level} level ${type} quiz covering ${knowledgeRange} from the book Linear Algebra and Applications. Format is: {id: number, q: string, a: string, opts: string[]}. Do Not Have Label A, B, C, D in options`,
                content_type: "text",
              },
            ],
          }),
        });

        return await response.text();
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
        throw error;
      }
    };

    const parseResponse = (responseText: string) => {
      const events = responseText.split("\nevent:");
      let completedMessageCount = 0;

      for (let eventBlock of events) {
        if (eventBlock.includes("conversation.message.completed")) {
          completedMessageCount++;
          if (completedMessageCount === 2) {
            const jsonData = eventBlock.split("data:")[1].trim();
            try {
              const parsedData = JSON.parse(jsonData);
              if (parsedData.content && parsedData.content_type === "text") {
                return parsedData.content;
              }
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        }
      }
    };

    const parseQuestions = (contentText: string) => {
      const regex =
        /\{id:\s*(\d+),\s*q:\s*"([^"]+)",\s*a:\s*"([^"]+)",\s*opts:\s*\[([^\]]+)\]\}/g;
      const parsedQuestions: Quizzes[] = [];
      let match;

      while ((match = regex.exec(contentText)) !== null) {
        const id = parseInt(match[1]);
        const question = match[2];
        const answer = match[3];
        const options = match[4]
          .split(",")
          .map((opt) => opt.trim().replace(/^"|"$/g, ""));

        parsedQuestions.push({ id, question, answer, options });
      }

      return parsedQuestions;
    };

    try {
      const rawResponse = await fetchQuizQuestions();
      console.log("Raw response text:", rawResponse);

      const contentText = parseResponse(rawResponse);
      if (contentText) {
        const questionsJson = parseQuestions(contentText);
        console.log(
          "Parsed Questions:",
          JSON.stringify(questionsJson, null, 2)
        );
        setQuestions(questionsJson);
        setIsQuizGenerated(true);
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 mt-">
      <div className="flex flex-col items-center w-full h-full max-h-screen overflow-y-auto">
        {!isQuizGenerated ? (
          <>
            <SelectMenu
              label="Type"
              options={["Multiple Choices", "True or False"]}
              onChange={(value) => setType(value)}
            />
            <SelectMenu
              label="Level"
              options={["Basic", "Medium", "Hard"]}
              onChange={(value) => setLevel(value)}
            />
            <SelectMenu
              label="Knowledge Range"
              options={[
                "Chapter 1 - Vectors",
                "Chapter 2 - Matrices",
                "Chapter 3 - Linear Equations",
                "Chapter 4 - Least-Squares",
                "Chapter 5 - Eigenvalues for Symmetric Matrices",
                "Chapter 6 - Singular Values",
                "Chapter 7 - Examples",
                "Chapter 8 - Applications",
                "Chapter 9 - Theorems",
              ]}
              onChange={(value) => setKnowledgeRange(value)}
            />
            <SelectMenu
              label="Number of Questions"
              options={["5", "10", "15", "20"]}
              onChange={(value) => setNumberOfQuestions(value)}
            />
            <button
              type="button"
              onClick={handleGenerateQuiz}
              className="rounded-md m-4 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Generate Quiz
            </button>
          </>
        ) : (
          <Quiz questions={questions} />
        )}
      </div>
    </div>
  );
}

function Quiz({ questions }: { questions: Quizzes[] }) {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [shuffledQuestions, setShuffledQuestions] = useState<
    {
      id: number;
      question: string;
      answer: string;
      shuffledOptions: string[];
    }[]
  >([]);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState<
    { questionId: number; correctAnswer: string }[]
  >([]);

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const shuffled = questions.map((question) => ({
      ...question,
      shuffledOptions: shuffleArray([...question.options, question.answer]),
    }));
    setShuffledQuestions(shuffled);
  }, [questions]);

  const handleAnswerChange = (questionId: number, selectedOption: string) => {
    setUserAnswers({ ...userAnswers, [questionId]: selectedOption });
  };

  const handleSubmit = () => {
    let correct = 0;
    const incorrect: React.SetStateAction<
      { questionId: number; correctAnswer: string }[]
    > = [];

    shuffledQuestions.forEach((question) => {
      if (userAnswers[question.id] === question.answer) {
        correct += 1;
      } else {
        incorrect.push({
          questionId: question.id,
          correctAnswer: question.answer,
        });
      }
    });

    setCorrectCount(correct);
    setIncorrectQuestions(incorrect);
    setShowResult(true);
  };

  return (
    <div className="w-full overflow-auto flex justify-center px-4 my-8">
      <div className="max-w-3xl w-full mt-6">
        <h2 className="text-lg font-semibold text-gray-900">Quiz Questions</h2>
        {shuffledQuestions.map((question, index) => (
          <fieldset key={question.id} className="mb-4">
            <legend className="text-sm font-semibold leading-6 text-gray-900">
              {index + 1}. {question.question}
            </legend>
            <div className="mt-4 space-y-4">
              {question.shuffledOptions.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center">
                  <input
                    id={`question-${question.id}-option-${optIndex}`}
                    name={`question-${question.id}`}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={() => handleAnswerChange(question.id, option)}
                  />
                  <label
                    htmlFor={`question-${question.id}-option-${optIndex}`}
                    className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        ))}

        <button
          onClick={handleSubmit}
          className="rounded-md m-4 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>

        {showResult && (
          <div className="mt-4 pb-10">
            <h3 className="text-lg font-semibold text-gray-900">
              You got {correctCount} out of {questions.length} correct.
            </h3>
            {incorrectQuestions.length > 0 && (
              <div className="mt-4">
                <h4 className="text-md font-semibold text-red-500">
                  You got the following questions wrong:
                </h4>
                <ul className="list-disc list-inside">
                  {incorrectQuestions.map((item) => (
                    <li key={item.questionId}>
                      Question {item.questionId}: Correct answer is{" "}
                      {item.correctAnswer}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
