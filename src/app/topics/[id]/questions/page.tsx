"use client";

import { useState, useEffect } from "react";
import {
  House,
  BookOpenCheck,
  MessageCircleQuestion,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

interface Option {
  id: string;
  title: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  title: string;
  options: Option[];
}

interface TopicData {
  title: string;
  questions: Question[];
}

const Ques = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [topicData, setTopicData] = useState<TopicData | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const topicId = params.id as string;

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/topics/${topicId}/quiz`);
        const data: TopicData = response.data;
        if (!data.questions || data.questions.length === 0) {
          throw new Error("No questions available");
        }
        setTopicData(data);
      } catch (error) {
        toast.error("Failed to fetch quiz data");
        console.error("Error fetching quiz data:", error);
        setTopicData(null);
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      fetchTopicData();
    }
  }, [topicId]);

  const handleSelect = (optionId: string) => {
    if (!selectedOption) {
      setSelectedOption(optionId);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestionIndex((prev) =>
      prev < (topicData?.questions.length || 0) - 1 ? prev + 1 : 0
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!topicData || !topicData.questions.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        No quiz questions found
      </div>
    );
  }

  const currentQuestion = topicData.questions[currentQuestionIndex];
  const isCorrect = selectedOption
    ? currentQuestion.options.find((opt) => opt.id === selectedOption)
        ?.isCorrect
    : false;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex w-[50%] justify-between py-5 px-8 mr-[480px] mb-4">
        <div className="flex items-center">
          <div>
            <Link href={"/dashboard"} className="cursor-pointer">
              <House size={18} />
            </Link>
          </div>
          <div>
            <p className="text-[#1d1d1d] text-sm font-semibold ml-[10px] flex items-center pl-[10px] h-8 border-l-2">
              {topicData.title}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <Link
            href={`/topics/${topicId}/summary`}
            className="flex justify-center items-center gap-2 hover:bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold rounded-lg px-2 duration-500"
          >
            <BookOpenCheck /> Summary
          </Link>
          <Link
            href={`/topics/${topicId}/questions`}
            className="flex justify-center items-center gap-2 bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold rounded-lg px-2"
          >
            <MessageCircleQuestion /> Questions
          </Link>
          <Link
            href={`/topics/${topicId}/flashcard`}
            className="flex justify-center items-center gap-2 hover:bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold rounded-lg px-2 duration-500"
          >
            <Layers /> Flashcards
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-full w-[768px]">
        <div className="p-6 bg-white shadow-md rounded-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-500 font-semibold">
              Question {currentQuestionIndex + 1} of{" "}
              {topicData.questions.length}
            </h2>
          </div>

          <p className="text-xl font-bold mb-6">{currentQuestion.title}</p>

          <ul className="space-y-3">
            {currentQuestion.options.map((option) => (
              <li
                key={option.id}
                className={`p-3 border rounded cursor-pointer transition-colors
                  ${
                    selectedOption === option.id
                      ? option.isCorrect
                        ? "bg-green-100 border-green-500"
                        : "bg-red-100 border-red-500"
                      : "hover:bg-gray-50 border-gray-300"
                  }`}
                onClick={() => handleSelect(option.id)}
              >
                {option.title}
              </li>
            ))}
          </ul>

          {selectedOption && (
            <div className="mt-4 flex justify-between items-center">
              <p
                className={`font-semibold ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isCorrect ? "Correct! 🎉" : "Incorrect, try again next time."}
              </p>
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {currentQuestionIndex < topicData.questions.length - 1
                  ? "Next Question"
                  : "Restart Quiz"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ques;
