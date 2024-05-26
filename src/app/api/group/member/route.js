import { auth } from "@/auth";
import { db } from "@/db";

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
    const member = await db
      .insertInto("Member")
      .values({
        groupId: groupId,
        name: name,
      })
      .returningAll()
      .executeTakeFirst();

    return Response.json({ status: "success", data: member });
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
    let member = await db
      .selectFrom("Member")
      .select(["id", "groupId"])
      .where("id", "=", id)
      .executeTakeFirst();
    if (!session || session.user.id != member.groupId)
      return Response.json({ msg: "Invalid request.", status: "failed" });

    await db.deleteFrom("Member").where("id", "=", id).executeTakeFirst();

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
