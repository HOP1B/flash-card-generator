"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  House,
  BookOpenCheck,
  MessageCircleQuestion,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface TopicData {
  title: string;
  flashcards: Flashcard[];
}

function FlippCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [flippedStates, setFlippedStates] = React.useState<boolean[]>([]);
  const [topicData, setTopicData] = useState<TopicData | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const topicId = params.id as string;

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/topics/${topicId}/flashcard`);
        const data: TopicData = response.data;
        if (!data || !data.flashcards || data.flashcards.length === 0) {
          throw new Error("No flashcards available");
        }
        setTopicData(data);
        setFlippedStates(Array(data.flashcards.length).fill(false));
      } catch (error) {
        toast.error("Failed to fetch flashcard data");
        console.error("Error fetching flashcard data:", error);
        setTopicData(null);
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      fetchTopicData();
    }
  }, [topicId]);

  const toggleFlip = (index: number) => {
    setFlippedStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading flashcards...</p>
      </div>
    );
  }

  if (!topicData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">No flashcards found</p>
      </div>
    );
  }

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
            className="flex justify-center items-center gap-2 hover:bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold rounded-lg px-3 py-1 transition duration-300"
          >
            <MessageCircleQuestion size={16} /> Questions
          </Link>
          <Link
            href={`/topics/${topicId}/flashcard`}
            className="flex justify-center items-center gap-2 bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold rounded-lg px-3 py-1"
          >
            <Layers size={16} /> Flashcards
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-3xl mt-9">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {topicData.flashcards.map((card, index) => (
              <CarouselItem key={card.id}>
                <Card
                  onClick={() => toggleFlip(index)}
                  className="cursor-pointer h-[400px] shadow-lg border border-gray-200 rounded-lg transition-transform duration-300 hover:shadow-xl"
                >
                  <CardContent className="flex items-center justify-center h-full text-center p-6">
                    <p className="text-xl font-semibold text-gray-800">
                      {flippedStates[index] ? card.answer : card.question}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-gray-600 hover:text-gray-800" />
          <CarouselNext className="text-gray-600 hover:text-gray-800" />
        </Carousel>

        <div className="py-3 text-center text-sm text-gray-500">
          Card {current} of {count}
        </div>
      </div>
    </div>
  );
}

export default FlippCarousel;
