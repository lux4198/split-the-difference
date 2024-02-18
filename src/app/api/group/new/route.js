import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient().$extends({
  query: {
    group: {
      $allOperations({ operation, args, query }) {
        if (["create", "update"].includes(operation) && args.data["password"]) {
          args.data["password"] = bcrypt.hashSync(args.data["password"], 10);
        }
        return query(args);
      },
    },
  },
});

export async function POST(request) {
  const res = await request.json();
  let code = "";
  try {
    await prisma.group.create({
      data: {
        email: res.email,
        name: res.name,
        password: res.password,
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
