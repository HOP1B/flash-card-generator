import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Topic } from "@prisma/client";

const prisma = new PrismaClient();

// Define the type for the topic with nested relations
interface TopicWithQuizzes extends Topic {
  quizzes?: {
    questions?: {
      id: string;
      title: string;
      options?: {
        id: string;
        title: string;
        isCorrect: boolean;
      }[];
    }[];
  }[];
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: topicId } = await params; // Destructure params correctly

    const topic = (await prisma.topic.findUnique({
      where: { id: topicId },
      include: {
        quizzes: {
          include: {
            questions: {
              include: { options: true },
            },
          },
        },
      },
    })) as TopicWithQuizzes | null;

    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    // Safely map questions and options
    const questions =
      topic.quizzes && topic.quizzes.length > 0
        ? topic.quizzes.flatMap((quiz) =>
            quiz.questions
              ? quiz.questions.map((q) => ({
                  id: q.id,
                  title: q.title,
                  options: q.options
                    ? q.options.map((opt) => ({
                        id: opt.id,
                        title: opt.title,
                        isCorrect: opt.isCorrect,
                      }))
                    : [],
                }))
              : []
          )
        : [];

    console.log("Fetched quiz data:", { title: topic.title, questions }); // Debug log

    return NextResponse.json(
      {
        title: topic.title,
        questions,
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
