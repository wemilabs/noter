import Link from "next/link";

import { SignUpForm } from "@/components/forms/signup-form";
import { Logo } from "@/components/logo";

export default function SignUpPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="self-center">
          <Logo />
        </Link>
        <SignUpForm />
      </div>
    </div>
  );
}
