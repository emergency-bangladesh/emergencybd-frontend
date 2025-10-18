import { cn } from "@/lib/utils";

export default function Muted({
  children,
  className,
  ...props
}: { children: React.ReactNode; className?: string } & Omit<
  React.ComponentProps<"p">,
  "className"
>) {
  return (
    <span
      className={cn("text-muted-foreground text-sm leading-normal", className)}
      {...props}
    >
      {children}
    </span>
  );
}
