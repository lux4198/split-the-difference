import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getGroup } from "@/app/lib/dbUtils";

export const authConfig = {
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

          if (passwordsMatch) {
            return group;
          }
        }

        return null;
      },
    }),
  ],
};
