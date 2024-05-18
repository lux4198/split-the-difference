import { prisma } from "@/app/lib/db";
import { auth } from "@/auth";

export async function POST(request, response) {
  const req = await request.json();

  const { name, groupId } = req;

  const session = await auth();
  if (!session || session.user.id != groupId)
    return Response.json({ msg: "Invalid request.", status: "failed" });

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

export async function DELETE(request, response) {
  const session = await auth();
  const req = await request.json(); // Get the member ID from the query params
  const { id } = req;

  try {
    let member = await prisma.member.findUnique({
      where: { id: id },
    });

    if (!session || session.user.id != member.groupId)
      return Response.json({ msg: "Invalid request.", status: "failed" });

    member = await prisma.member.delete({
      where: { id: id },
    });

    return Response.json({
      msg: "Member deleted successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Failed to delete member:", error);
    return Response.json({
      msg: "Failed to delete member",
      status: "failed",
      error: error.message,
    });
  }
}
