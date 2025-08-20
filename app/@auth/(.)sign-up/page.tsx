"use client";

import { useRouter } from "next/navigation";

import { SignUpForm } from "@/components/forms/signup-form";
import { Logo } from "@/components/logo";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function SignUpModal() {
  const router = useRouter();
  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent
        className="sm:max-w-[425px]"
        aria-description="Sign up to your account"
      >
        <DialogHeader>
          <DialogTitle className="self-center">
            <span className="sr-only">Sign up</span>
            <span aria-hidden="true">
              <Logo />
            </span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Sign up to your account
          </DialogDescription>
        </DialogHeader>
        <SignUpForm />
      </DialogContent>
    </Dialog>
  );
}
