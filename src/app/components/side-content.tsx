import React, { useState } from "react";
import SelectMenu from "./select-menus";

export default function SideContent() {
  const [type, setType] = useState("Multiple Choices");
  const [level, setLevel] = useState("Basic");
  const [knowledgeRange, setKnowledgeRange] = useState("Chapter 1");
  const [numberOfQuestions, setNumberOfQuestions] = useState("5");

  const handleGenerateQuiz = async () => {
    const requestData = {
      type,
      level,
      knowledgeRange,
      numberOfQuestions,
    };

    console.log("Request Data:", requestData);

    const fetchQuizQuestions = async () => {
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
              content: `Give me ${numberOfQuestions} questions for a ${level} level ${type} quiz covering ${knowledgeRange}. Format is: {id: number, q: string, a: string, opts: string[]}`,
              content_type: "text",
            },
          ],
        }),
      });

      return response.text();
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
      const questions = [];
      let match;

      while ((match = regex.exec(contentText)) !== null) {
        const id = parseInt(match[1]);
        const question = match[2];
        const answer = match[3];
        const options = match[4]
          .split(",")
          .map((opt) => opt.trim().replace(/^"|"$/g, ""));

        questions.push({ id, question, answer, options });
      }

      return questions;
    };

    try {
      const rawResponse = await fetchQuizQuestions();
      console.log("Raw response text:", rawResponse);

      const contentText = parseResponse(rawResponse);
      const questionsJson = parseQuestions(contentText);

      console.log(JSON.stringify(questionsJson, null, 2));
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  };

  return (
    <div className="w-96 h-full flex justify-center items-center overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
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
            "Chapter 1",
            "Chapter 2",
            "Chapter 3",
            "Chapter 4",
            "Chapter 5",
            "Chapter 6",
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
      </div>
    </div>
  );
}
