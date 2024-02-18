import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getGroup(name) {
  try {
    const group = await prisma.group.findUnique({
      where: {
        name: name,
      },
    });
    return group;
  } catch (error) {
    console.error("Failed to fetch group:", error);
    throw new Error("Failed to fetch group.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ name: z.string(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { name, password } = parsedCredentials.data;
          const group = await getGroup(name);
          if (!group) return null;
          const passwordsMatch = await bcrypt.compare(password, group.password);

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
