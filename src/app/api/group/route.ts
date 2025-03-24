// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const GET = async () => {
//   const groups = await prisma.group.findMany({});
//   return groups;
// };
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  const groups = await prisma.group.findMany({});

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
