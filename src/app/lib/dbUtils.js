import { db } from "@/db";

async function getGroup(name) {
  try {
    const group = await db
      .selectFrom("Group")
      .selectAll()
      .where("name", "=", name)
      .executeTakeFirst();
    return group;
  } catch (error) {
    console.error("Failed to fetch group:", error);
    throw new Error(error);
  }
}

async function deleteGroup(groupId) {
  try {
    const group = await db
      .deleteFrom("Group")
      .where("Group.id", "=", groupId)
      .executeTakeFirst();
    return group;
  } catch (error) {
    console.error("Failed to delete group:", error);
    throw new Error(error);
  }
}

async function getMembers(groupId) {
  try {
    const members = await db
      .selectFrom("Member")
      .selectAll()
      .where("groupId", "=", groupId)
      .execute();
    return members;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    throw new Error(error);
  }
}

async function getExpenses(groupId) {
  try {
    const expenses = await db
      .selectFrom("Expense")
      .selectAll()
      .where("Expense.groupId", "=", groupId)
      .orderBy("Expense.createdAt", "desc")
      .execute();
    if (expenses.length > 0) {
      const expensesIds = expenses.map((e) => e.id);
      // A = expense.id,  B = member.id
      const membersSharing = await db
        .selectFrom("_MemberExpensesShared")
        .innerJoin("Member", "_MemberExpensesShared.B", "Member.id")
        .select([
          "_MemberExpensesShared.A",
          "Member.id",
          "Member.name",
          "Member.groupId",
        ])
        .where("_MemberExpensesShared.A", "in", expensesIds)
        .execute();
      expenses.forEach((expense) => {
        expense["membersSharing"] = membersSharing
          .filter(({ A }) => A === expense.id)
          .map(({ A, ...obj }) => ({ ...obj }));
      });
    }
    return expenses;
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    throw new Error(error);
  }
}

export { getGroup, deleteGroup, getMembers, getExpenses };
