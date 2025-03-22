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

function FlippCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [flippedStates, setFlippedStates] = React.useState<boolean[]>([]);

  const cards = [
    { question: "4 plus 5?", answer: "9" },
    { question: "Capital of Mongolia?", answer: "Ulaanbaatar" },
    { question: " 3 x 3?", answer: "9" },
    { question: "our planet", answer: "Delkhiii" },
    { question: "9+2", answer: "9+2?" },
  ];

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

   
    setFlippedStates(Array(cards.length).fill(false));
  }, [api]);

  const toggleFlip = (index: number) => {
    setFlippedStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div className="mx-auto max-w-md">
      <Carousel setApi={setApi} className="w-full max-w-md">
        <CarouselContent>
          {cards.map((card, index) => (
            <CarouselItem key={index}>
              <Card
                onClick={() => toggleFlip(index)}
                className="cursor-pointer w-80 h-96 shadow-lg border border-gray-300"
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
