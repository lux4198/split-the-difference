import { prisma } from "@/app/lib/db";

export async function GET() {
  const data = await prisma.group.findMany();

  return Response.json({ data });
}
