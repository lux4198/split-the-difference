import { auth } from "@/auth";
import {
  deleteGroup,
  getExpenses,
  getGroup,
  getMembers,
} from "../../lib/dbUtils";
import { db } from "@/db";

export async function GET(request, response) {
  const session = await auth();
  const { searchParams } = new URL(request.url);
  const groupName = searchParams.get("name");
  if (!groupName || !session || session.user.name !== groupName)
    return Response.json({ msg: "Invalid request.", status: "failed" });
  try {
    const groupInfo = await getGroup(groupName);
    delete groupInfo.password;
    delete groupInfo.email;

    const groupId = groupInfo.id;

    const groupMembers = await getMembers(groupId);

    const groupExpenses = await getExpenses(groupId);

    return Response.json({
      groupInfo: groupInfo,
      members: groupMembers,
      expenses: groupExpenses,
    });
  } catch (e) {
    return Response.json({
      msg: "Request failed",
      status: "failed",
      error: e,
    });
  }
}

export async function DELETE(request) {
  const req = await request.json(); // Get the member ID from the query params
  const { id } = req;
  const session = await auth();
  if (!id || !session || session.user.id != id)
    return Response.json({ msg: "Invalid request.", status: "failed" });

  try {
    const group = await deleteGroup(id);
    console.log("Delete group: ", group);
    return Response.json({
      msg: "Group deleted successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Failed to delete group:", error);
    return Response.json({
      msg: "Failed to delete group",
      status: "failed",
      error: error.message,
    });
  }
}
