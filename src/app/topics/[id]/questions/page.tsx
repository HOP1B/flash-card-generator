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
        console.log("Fetched quiz data (client):", response.data); // Debug log
        const data: TopicData = response.data;
        // Filter out questions without options
        const validQuestions = data.questions.filter(
          (q) => q.options && q.options.length > 0
        );
        if (!validQuestions || validQuestions.length === 0) {
          throw new Error("No valid questions available");
        }
        setTopicData({ ...data, questions: validQuestions });
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
        <p className="text-lg text-gray-600">Loading quiz...</p>
      </div>
    );
  }

  if (!topicData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">No valid quiz questions found</p>
      </div>
    );
  }

  const currentQuestion = topicData.questions[currentQuestionIndex];
  const isCorrect = selectedOption
    ? currentQuestion.options.find((opt) => opt.id === selectedOption)
        ?.isCorrect
    : false;
  const correctAnswer =
    currentQuestion.options.find((opt) => opt.isCorrect)?.title ||
    "Not available";

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex w-full max-w-5xl justify-between py-5 px-8 mb-9">
        <div className="flex items-center">
          <Link href="/dashboard" className="cursor-pointer">
            <House size={18} className="text-gray-700" />
          </Link>
          <p className="text-[#1d1d1d] text-sm font-semibold ml-3 flex items-center pl-3 h-8 border-l-2 border-gray-300">
            {topicData.title}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/topics/${topicId}/summary`}
            className="flex justify-center items-center gap-2 hover:bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold rounded-lg px-3 py-1 transition duration-300"
          >
            <BookOpenCheck size={16} /> Summary
          </Link>
          <Link
            href={`/topics/${topicId}/questions`}
            className="flex justify-center items-center gap-2 bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold rounded-lg px-3 py-1"
          >
            <MessageCircleQuestion size={16} /> Questions
          </Link>
          <Link
            href={`/topics/${topicId}/flashcard`}
            className="flex justify-center items-center gap-2 hover:bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold rounded-lg px-3 py-1 transition duration-300"
          >
            <Layers size={16} /> Flashcards
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-3xl mt-9">
        <div className="p-6 bg-white shadow-md rounded-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-500 font-semibold">
              Question {currentQuestionIndex + 1} of{" "}
              {topicData.questions.length}
            </h2>
          </div>

          <p className="text-xl font-bold mb-6 text-gray-800">
            {currentQuestion.title}
          </p>

          {currentQuestion.options && currentQuestion.options.length > 0 ? (
            <ul className="space-y-3">
              {currentQuestion.options.map((option) => (
                <li
                  key={option.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors
                    ${
                      selectedOption === option.id
                        ? option.isCorrect
                          ? "bg-green-100 border-green-500"
                          : "bg-red-100 border-red-500"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  onClick={() => handleSelect(option.id)}
                >
                  <p className="text-gray-800">{option.title}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-600">
              No options available for this question.
            </p>
          )}

          {selectedOption && (
            <div className="mt-4 flex justify-between items-center">
              <p
                className={`font-semibold ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isCorrect
                  ? "Correct! 🎉"
                  : `Incorrect, correct answer is "${correctAnswer}".`}
              </p>
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
