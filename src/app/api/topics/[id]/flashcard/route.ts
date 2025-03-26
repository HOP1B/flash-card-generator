// app/api/topics/[id]/flashcard/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const topicId = params.id;

    const topic = await prisma.topic.findUnique({
      where: { id: topicId },
      include: { flashcards: true },
    });

    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        id: topic.id,
        title: topic.title,
        flashcards: topic.flashcards.map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
        })),
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
