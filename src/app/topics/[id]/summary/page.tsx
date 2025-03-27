/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import ReactMarkdown, { Components } from "react-markdown";

interface TopicData {
  title: string;
  summary: string;
}

const SummaryPage = () => {
  const [topicData, setTopicData] = useState<TopicData | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const topicId = params.id as string;

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/topics/${topicId}/summary`);
        const data: TopicData = response.data;
        if (!data || !data.summary) {
          throw new Error("No summary available");
        }
        setTopicData(data);
      } catch (error) {
        toast.error("Failed to fetch summary data");
        console.error("Error fetching summary data:", error);
        setTopicData(null);
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      fetchSummaryData();
    }
  }, [topicId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading summary...</p>
      </div>
    );
  }

  if (!topicData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">No summary data found</p>
      </div>
    );
  }

  const markdownComponents: Components = {
    h1: ({ node, ...props }: any) => (
      <h1 className="text-2xl font-bold mt-6 mb-4 text-gray-900" {...props} />
    ),
    h2: ({ node, ...props }: any) => (
      <h2
        className="text-xl font-semibold mt-5 mb-3 text-gray-900"
        {...props}
      />
    ),
    ul: ({ node, ...props }: any) => (
      <ul className="list-disc list-outside ml-5 space-y-2" {...props} />
    ),
    ol: ({ node, ...props }: any) => (
      <ol className="list-decimal list-outside ml-5 space-y-2" {...props} />
    ),
    li: ({ node, ...props }: any) => (
      <li className="text-gray-700 leading-relaxed" {...props} />
    ),
    p: ({ node, ...props }: any) => (
      <p className="text-gray-700 leading-relaxed mb-4" {...props} />
    ),
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gray-100">
      <div className="flex w-full max-w-5xl justify-between py-5 px-8 mb-4">
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
            className="flex justify-center items-center gap-2 bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold rounded-lg px-3 py-1"
          >
            <BookOpenCheck size={16} /> Summary
          </Link>
          <Link
            href={`/topics/${topicId}/questions`}
            className="flex justify-center items-center gap-2 hover:bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold rounded-lg px-3 py-1 transition duration-300"
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

      <div className="flex flex-col items-center justify-center w-full max-w-3xl">
        <div className="p-8 bg-white shadow-md rounded-lg w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            {topicData.title}
          </h1>
          <ReactMarkdown components={markdownComponents}>
            {topicData.summary}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
