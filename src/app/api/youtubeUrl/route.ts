/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import {
  convertResponseToFlashcard,
  convertResponseToQna,
  extractVideoId,
  generateFlashcards,
  generateQuizzes,
  generateSummary,
  getYouTubeTranscript,
} from "./utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { url, userId, groupId } = await req.json();

    if (!userId)
      return NextResponse.json(
        { error: "UserId is required" },
        { status: 400 }
      );
    if (!groupId)
      return NextResponse.json(
        { error: "GroupId is required" },
        { status: 400 }
      );
    if (!url)
      return NextResponse.json(
        { error: "YouTube URL is required" },
        { status: 400 }
      );

    const videoId = extractVideoId(url);
    if (!videoId)
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );

    const transcript = await getYouTubeTranscript(videoId);
    if (!transcript) {
      return NextResponse.json(
        { error: "No transcript available for this video" },
        { status: 400 }
      );
    }

    const rawQuizzes = await generateQuizzes(transcript); // Returns a string
    const rawFlashcards = await generateFlashcards(transcript); // Returns a string
    const rawSummaries = await generateSummary(transcript);
    
    const quizzes = convertResponseToQna(rawQuizzes);
    const flashcards = convertResponseToFlashcard(rawFlashcards);
    console.log({ flashcards });

    if (!quizzes || quizzes.length === 0) {
      console.warn("No quizzes generated for this transcript.");
    }

    const topic = await prisma.topic.create({
      data: {
        youtubeId: videoId,
        title: rawSummaries[0]?.title || "Untitled",
        summary: rawSummaries[0]?.content || "",
        userId,
        group: {
          connect: {
            id: groupId,
          },
        },
        flashcards: {
          createMany: {
            data: flashcards.map((flashcard) => ({
              question: flashcard.question,
              answer: flashcard.answer,
            })),
          },
        },
        quizzes: {
          create:
            quizzes.length > 0
              ? {
                  questions: {
                    create: quizzes.map((quiz) => ({
                      title: quiz.question,
                      options: {
                        create: quiz.answers.map((answer) => ({
                          title: answer.option,
                          isCorrect: answer.correct,
                        })),
                      },
                    })),
                  },
                }
              : undefined,
        },
      },
      include: {
        quizzes: {
          include: {
            questions: {
              include: { options: true },
            },
          },
        },
      },
    });

    return NextResponse.json(topic, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
