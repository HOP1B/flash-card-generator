"use client";

import { useState } from "react";

const Ques = () => {
  const [selected, setSelected] = useState<string|null>(null);
  const correctAnswer = "A";
  const handleSelect = (option:string) => {
    setSelected(option);
  };
  
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Question</h2>
      <p className="text-gray-700">
        If you wanted invite someone to a Party, which phrase would be most
        appropriate
      </p>
      <ul className="mt-2 space-y-2">
        {[
          { option: "A", text: "Could you come to my party?" },
          { option: "B", text: "You should come to my party." },
          { option: "C", text: "You must come to my party." },
          { option: "D", text: "I hope you come to my party." },
        ].map(({ option, text }) => (
          <li
            key={option}
            className={`p-2 border rounded cursor-pointer hover:bg-gray-100 ${
              selected === option ? "bg-blue-200" : ""
            }`}
            onClick={() => handleSelect(option)}
          >
            {text}
          </li>
        ))}
      </ul>

      {selected && (
        <p className="mt-2 font-semibold">
          {selected === correctAnswer ? " Correct!" : " Incorrect, try again."}
        </p>
      )}
    </div>
  );
};

export default Ques;