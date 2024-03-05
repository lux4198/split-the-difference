import { prisma } from "@/app/lib/db";

export async function POST(request) {
  const req = await request.json();

  const { currency, sharedBy, payedBy, name, value, groupId } = req;

  if (!currency || !sharedBy || !payedBy || !name || !value) {
    return Response.json({
      status: "failed",
      msg: "One or more missing fields.",
    });
  }

  try {
    const expense = await prisma.expense.create({
      data: {
        name,
        value,
        currency,
        groupId: groupId,
        memberId: payedBy.id,
        membersSharing: {
          connect: sharedBy.map((member) => ({ id: member.id })),
        },
      },
    });

    const expenseResponse = await prisma.expense.findUnique({
      include: {
        membersSharing: { select: { id: true, name: true } },
      },
      where: {
        id: expense.id,
      },
    });

    return Response.json({ status: "success", data: expenseResponse });
  } catch (error) {
    console.error("Failed to create expense:", error);
    return Response.json({
      status: "failed",
      msg: "Failed to create expense.",
    });
  }
}

export async function DELETE(request) {
  const req = await request.json(); // Get the expense ID from the query params
  const { id } = req;
  try {
    const expense = await prisma.expense.delete({
      where: { id: id },
    });
    return Response.json({
      msg: "Expense deleted successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Failed to delete expense:", error);
    return Response.json({
      msg: "Failed to delete expense",
      status: "failed",
      error: error.message,
    });
  }
}
