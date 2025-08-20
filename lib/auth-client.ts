import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL:
    (process.env.NEXT_PUBLIC_BASE_URL as string) ?? "http://localhost:3000",
});

export const authWithGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
    errorCallbackURL: "/error",
  });
};

export const { signIn, signOut, forgetPassword, resetPassword, useSession } =
  authClient;
