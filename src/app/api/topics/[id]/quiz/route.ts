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
      include: {
        quizzes: {
          include: {
            questions: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });

    if (!topic || !topic.quizzes.length) {
      return NextResponse.json(
        { error: "No quiz found for this topic" },
        { status: 404 }
      );
    }

    // Assuming one quiz per topic for simplicity; take the first quiz
    const quiz = topic.quizzes[0];

    return NextResponse.json(
      {
        title: topic.title,
        questions: quiz.questions.map((q) => ({
          id: q.id,
          title: q.title,
          options: q.options.map((o) => ({
            id: o.id,
            title: o.title,
            isCorrect: o.isCorrect,
          })),
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
