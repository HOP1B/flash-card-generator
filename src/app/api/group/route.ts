// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const GET = async () => {
//   const groups = await prisma.group.findMany({});
//   return groups;
// };
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  const groups = await prisma.group.findMany({});

  // Return a valid Response object
  return new Response(JSON.stringify(groups), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};