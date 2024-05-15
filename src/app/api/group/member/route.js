import { prisma } from "@/app/lib/db";

export async function POST(request) {
  const req = await request.json();

  const { name, groupId } = req;

  if (!name || !groupId) {
    return Response.json({
      status: "failed",
      msg: "One or more missing fields.",
    });
  }

  try {
    const member = await prisma.member.create({
      data: {
        name,
        groupId: groupId,
      },
    });

    const memberResponse = await prisma.member.findUnique({
      where: {
        id: member.id,
      },
    });

    return Response.json({ status: "success", data: memberResponse });
  } catch (error) {
    console.error("Failed to create member:", error);
    return Response.json({
      status: "failed",
      msg: "Failed to create member.",
    });
  }
}

export async function DELETE(request) {
  const req = await request.json(); // Get the member ID from the query params
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
