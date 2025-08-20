"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = (props: ToasterProps) => {
  const { theme = "system", resolvedTheme } = useTheme();
  const toastsTheme = (resolvedTheme ?? theme) as ToasterProps["theme"];
  const { className, ...rest } = props;

  return (
    <Sonner
      theme={toastsTheme}
      className={["toaster group", className].filter(Boolean).join(" ")}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...rest}
    />
  );
};

export { Toaster };
