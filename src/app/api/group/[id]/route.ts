/* eslint-disable @typescript-eslint/no-unused-vars */
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const GET = async () => {
//   const groups = await prisma.group.findMany({});
//   return groups;
// };
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const group = await prisma.group.findUnique({
    where: {
      id,
    },
  });

  // Return a valid Response object
  return NextResponse.json(group);
};
