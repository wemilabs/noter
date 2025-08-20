import { Suspense } from "react";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { ResetPasswordForm } from "@/components/forms/reset-password-form";

export default async function ResetPasswordPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="self-center">
          <Logo />
        </Link>
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
