"use client";

import { useRouter } from "next/navigation";

import { SignUpForm } from "@/components/forms/signup-form";
import { Logo } from "@/components/logo";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SignUpModal() {
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-description="Sign up to your account"
      >
        <DialogHeader>
          <DialogTitle className="self-center">
            <Logo />
          </DialogTitle>
        </DialogHeader>
        <SignUpForm />
      </DialogContent>
    </Dialog>
  );
}
