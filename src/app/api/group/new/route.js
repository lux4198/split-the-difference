import bcrypt from "bcrypt";
import { z } from "zod";
import { db } from "@/db";

export async function POST(request) {
  const res = await request.json();
  let code = "";
  try {
    const parsedCredentials = z
      .object({ name: z.string(), password: z.string().min(6) })
      .safeParse(res);
    if (!parsedCredentials.success) {
      let msg = "Password has to have a minimum length of 6 characters.";
      return Response.json({ status: "failed", msg: msg, code: code });
    }

    const password = bcrypt.hashSync(res.password, 10);

    const group = await db
      .insertInto("Group")
      .values({
        name: res.name,
        email: res.email,
        password: password,
      })
      .executeTakeFirst();

    return Response.json({
      status: "success",
      msg: "Group added successfully.",
      code: code,
      data: group,
    });
  } catch (e) {
    let msg = "There was an error processing the request.";
    if (e.code === "23505") {
      msg = "Unique constraint violation.";
      code = e.code;
    }
    return Response.json({ status: "failed", msg: msg, code: code, error: e });
  }
}
