import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const group = await prisma.group.findUnique({
    where: { id },
    include: { topics: true },
  });
  if (!group)
    return NextResponse.json({ message: "group not found!" }, { status: 404 });

  return NextResponse.json(group);
};
