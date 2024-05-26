import { auth } from "@/auth";
import { db } from "@/db";

export async function POST(request) {
  const req = await request.json();
  const { currency, sharedBy, payedBy, name, value, groupId, type } = req;

  const session = await auth();
  if (!session || session.user.id != groupId)
    return Response.json({ msg: "Invalid request.", status: "failed" });

  if (!currency || !sharedBy || !payedBy || !name || !value || !groupId) {
    return Response.json({
      status: "failed",
      msg: "One or more missing fields.",
    });
  }

  try {
    const expense = await db
      .insertInto("Expense")
      .values({
        name: name,
        type: type,
        value: value,
        currency: currency,
        groupId: groupId,
        memberId: payedBy.id,
      })
      .returningAll()
      .executeTakeFirst();

    console.log(expense);

    // A = expense.id,  B = member.id
    const membersSharingIds = await db
      .insertInto("_MemberExpensesShared")
      .values(sharedBy.map(({ id }) => ({ A: expense.id, B: id })))
      .returningAll()
      .executeTakeFirst();

    const membersSharing = await db
      .selectFrom("Member")
      .innerJoin("_MemberExpensesShared", "B", "id")
      .select(["id", "name", "groupId"])
      .where("A", "=", expense.id)
      .execute();

    expense["membersSharing"] = membersSharing;

    return Response.json({ status: "success", data: expense });
  } catch (error) {
    console.error("Failed to create expense:", error);
    return Response.json({
      status: "failed",
      msg: "Failed to create expense.",
      error: error,
    });
  }
}

export async function DELETE(request) {
  const req = await request.json(); // Get the expense ID from the query params
  const { id } = req;
  const session = await auth();

  try {
    let expense = await db
      .selectFrom("Expense")
      .select(["groupId"])
      .where("id", "=", id)
      .executeTakeFirst();

    if (!session || session.user.id != expense.groupId)
      return Response.json({ msg: "Invalid request.", status: "failed" });

    await db.deleteFrom("Expense").where("id", "=", id).execute();

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

export async function PATCH(request) {
  const req = await request.json();
  const { id, currency, sharedBy, payedBy, name, value, groupId } = req;
  const session = await auth();
  try {
    let expense = await db
      .selectFrom("Expense")
      .select(["groupId"])
      .where("id", "=", id)
      .executeTakeFirst();

    if (!session || session.user.id != expense.groupId)
      return Response.json({ msg: "Invalid request.", status: "failed" });

    expense = await db
      .updateTable("Expense")
      .set({
        currency: currency,
        memberId: payedBy.id,
        name: name,
        value: value,
      })
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();

    // A = expense.id,  B = member.id
    const membersSharingIds = await db
      .selectFrom("_MemberExpensesShared")
      .select("B")
      .where("A", "=", expense.id)
      .execute();

    sharedBy.forEach(async ({ id }) => {
      if (!membersSharingIds.map(({ B }) => B).includes(id)) {
        await db
          .insertInto("_MemberExpensesShared")
          .values({ A: expense.id, B: id })
          .execute();
      }
    });

    membersSharingIds.forEach(async ({ B: id }) => {
      if (!sharedBy.map(({ id }) => id).includes(id)) {
        await db
          .deleteFrom("_MemberExpensesShared")
          .where("A", "=", expense.id)
          .where("B", "=", id)
          .execute();
      }
    });

    expense["membersSharing"] = sharedBy;

    return Response.json({ status: "success", data: expense });
  } catch (error) {
    console.error("Failed to create expense:", error);
    return Response.json({
      status: "failed",
      msg: "Failed to create expense.",
    });
  }
}
