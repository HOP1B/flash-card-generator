import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Topic } from "@prisma/client";

const prisma = new PrismaClient();

interface TopicWithFlashcards extends Topic {
  flashcards?: {
    id: string;
    question: string;
    answer: string;
  }[];
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: topicId } = await params;

    const topic = (await prisma.topic.findUnique({
      where: { id: topicId },
      include: { flashcards: true },
    })) as TopicWithFlashcards | null;

    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    // Safely map flashcards
    const flashcards = topic.flashcards
      ? topic.flashcards.map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
        }))
      : [];

    return NextResponse.json(
      {
        id: topic.id,
        title: topic.title,
        flashcards,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
