"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(prevState, formData, callbackUrl) {
  try {
    await signIn("credentials", { ...formData, redirectTo: callbackUrl });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "failed", msg: "Invalid Username or Password." };
        default:
          return { status: "failed", msg: "Something went wrong." };
      }
    }
    throw error;
  }
}
