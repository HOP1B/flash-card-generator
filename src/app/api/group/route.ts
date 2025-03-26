// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const GET = async () => {
//   const groups = await prisma.group.findMany({});
//   return groups;
// };
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { message: "userId not present" },
      { status: 400 }
    );
  }

  const groups = await prisma.group.findMany({
    where: {
      userId,
    },
  });

  // Return a valid Response object
  return new Response(JSON.stringify(groups), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST = async (req: NextRequest) => {
  const { title, userId } = await req.json();

  const newTopic = await prisma.group.create({
    data: {
      name: title,
      userId,
    },
  });

  return NextResponse.json(newTopic);
};
