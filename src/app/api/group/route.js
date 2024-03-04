import { prisma } from "@/app/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const groupName = searchParams.get("name");

  const groupInfo = await prisma.group.findUnique({
    where: {
      name: groupName,
    },
  });
  delete groupInfo.password;
  delete groupInfo.email;

  const groupId = groupInfo.id;

  const groupMembers = await prisma.member.findMany({
    where: {
      groupId: groupId,
    },
  });
  const groupExpenses = await prisma.expense.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      membersSharing: { select: { id: true, name: true } },
    },
    where: {
      groupId: groupId,
    },
  });
  groupExpenses.forEach((expense) => {
    delete expense.groupId;
  });
  const groupPayments = await prisma.payment.findMany({
    where: {
      groupId: groupId,
    },
  });
  return Response.json({
    groupInfo: groupInfo,
    members: groupMembers,
    expenses: groupExpenses,
    payments: groupPayments,
  });
}
