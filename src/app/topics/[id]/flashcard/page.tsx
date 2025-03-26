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
        if (!data || !data.flashcards) {
          throw new Error("Invalid topic data");
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
        Loading...
      </div>
    );
  }

  if (!topicData) {
    return (
      <div className="flex justify-center items-center h-screen">
        No flashcard data found
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex w-[50%] justify-between py-5 px-8 mr-[480px] mb-4">
        <div className="flex items-center">
          <Link href={"/dashboard"} className="cursor-pointer">
            <House size={18} />
          </Link>
          <p className="text-[#1d1d1d] text-sm font-semibold ml-[10px] flex items-center pl-[10px] h-8 border-l-2">
            {topicData.title}
          </p>
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
            className="flex justify-center items-center gap-2 hover:bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold rounded-lg px-2 duration-500"
          >
            <MessageCircleQuestion /> Questions
          </Link>
          <Link
            href={`/topics/${topicId}/flashcard`}
            className="flex justify-center items-center gap-2 bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold rounded-lg px-2"
          >
            <Layers /> Flashcards
          </Link>
        </div>
      </div>

      <Carousel setApi={setApi}>
        <CarouselContent>
          {topicData.flashcards.map((card, index) => (
            <CarouselItem key={card.id}>
              <Card
                onClick={() => toggleFlip(index)}
                className="cursor-pointer h-[880px] shadow-lg border border-gray-300"
              >
                <CardContent className="flex items-center justify-center h-full text-center text-3xl font-semibold transition-transform duration-300">
                  {flippedStates[index] ? card.answer : card.question}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
}

export default FlippCarousel;
