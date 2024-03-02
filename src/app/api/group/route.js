import { prisma } from "@/app/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const groupName = searchParams.get("name");

  const groupData = await prisma.group.findUnique({
    where: {
      name: groupName,
    },
  });
  const groupId = groupData.id;
  const groupMembers = await prisma.member.findMany({
    where: {
      groupId: groupId,
    },
  });
  const groupExpenses = await prisma.expense.findMany({
    include: {
      members: { select: { id: true, name: true } },
    },
    where: {
      groupId: groupId,
    },
  });
  groupExpenses.forEach((expense) => {
    delete expense.groupId;
  });
  return Response.json({ members: groupMembers, expenses: groupExpenses });
}
