"use server";

import { auth } from "@/lib/auth";

export async function signInUser(email: string, password: string) {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true, message: "User signed in successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "User sign in failed" };
  }
}

export async function signUpUser(
  email: string,
  password: string,
  name: string
) {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    return { success: true, message: "User signed up successfully" };
  } catch (error) {
    const e = error as Error;
    console.log(e.message);
    return { success: false, message: e.message || "User sign up failed" };
  }
}
