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

    // Print out the request data before sending
    console.log("Request Data:", requestData);

    const fResult = await fetch(
      "https://api.coze.com/v1/conversation/message/create?conversation_id=7402185067860459527",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer pat_XfESlceOmU1Kjf6yhOpfdYKveE8igIJ0hG7cYuCYjYaAuxDSBE3owoScY7ZYyKXE",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bot_id: "7402185067860459527",
          stream: false,
          response_format: "json_object",
          messages: [
            {
              role: "user",
              content: `Give me ${numberOfQuestions} questions for a ${level} level ${type} quiz covering ${knowledgeRange}. Format: {id: number, q: string, a: string, opts: string[]}`,
              content_type: "text",
            },
          ],
        }),
      }
    );

    // const fJson = await fResult.json();
    // console.log(fJson);

    console.log("Raw response:", fResult);
    const fJson = await fResult.json();
    console.log("Parsed response:", fJson);
  };

  return (
    <div className="w-96 h-full flex justify-center items-center overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <SelectMenu
          label="Type"
          options={["Multiple Choices", "True or False"]}
          onChange={(value) => setType(value)} // Capture selected value
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
          onClick={handleGenerateQuiz} // Call API when button is clicked
          className="rounded-md m-4 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Generate Quiz
        </button>
      </div>
    </div>
  );
}
