import { Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/db";
import bcrypt from "bcrypt";
import { z } from "zod";

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

    await prisma.group.create({
      data: {
        email: res.email,
        name: res.name,
        password: password,
      },
    });

    return Response.json({
      status: "success",
      msg: "Group added successfully.",
      code: code,
    });
  } catch (e) {
    let msg = "There was an error processing the request.";
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        msg = "Unique constraint violation.";
        code = e.code;
      }
    }
    return Response.json({ status: "failed", msg: msg, code: code });
  }
}
