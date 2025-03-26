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

    const rawQuizzes = (await generateQuizzes(transcript)).slice(1);
    const rawFlashcards = (await generateFlashcards(transcript)).slice(1);
    const rawSummaries = await generateSummary(transcript);

    const quizzes = rawQuizzes.map((quiz) => convertResponseToQna(quiz)).flat();
    const flashcards = rawFlashcards
      .map((flashcard) => convertResponseToFlashcard(flashcard))
      .flat();

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
      },
    });

    const rawQuiz = await prisma.topicQuiz.create({
      data: {
        topic: {
          connect: {
            id: topic.id,
          },
        },
      },
    });

    const questions = [];
    for (const question of quizzes) {
      const newQuestion = await prisma.topicQuizQuestion.create({
        include: {
          options: true,
        },
        data: {
          title: question.question,
          quiz: {
            connect: {
              id: rawQuiz.id,
            },
          },
          options: {
            createMany: {
              data: question.answers.map((answer) => ({
                title: answer.option,
                isCorrect: answer.correct,
              })),
            },
          },
        },
      });
      questions.push(newQuestion);
    }

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
