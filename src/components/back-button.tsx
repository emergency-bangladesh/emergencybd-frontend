import { IconArrowLeft } from "@tabler/icons-react";
import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { useLanguage } from "@/integrations/language/use-language";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export const BackButton = ({
  to,
  label: buttonText,
  className,
  variant,
  ...props
}: {
  to?: LinkProps["to"];
  label?: string;
} & Omit<
  ComponentProps<typeof Button>,
  "children" | "onClick" | "asChild"
>) => {
  const { language } = useLanguage();
  return (
    <Button
      variant={variant || "outline"}
      className={cn("w-full", className)}
      asChild
      {...props}
    >
      <Link to={to || ".."} className="flex items-center justify-center gap-2">
        <IconArrowLeft />{" "}
        {buttonText ?? (language === "en" ? "Back" : "ফিরে যান")}
      </Link>
    </Button>
  );
};
