import { Root, Thumb } from "@radix-ui/react-switch";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const rootVariants = cva(
  "group relative inline-flex h-7 min-w-14 items-center rounded-full shadow-xs",
  {
    variants: {
      variant: {
        default: cn("bg-card", "text-card-foreground"),
        accent: cn("bg-accent", "text-accent-foreground"),
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const thumbVariants = cva(
  "absolute bottom-0 left-0 top-0 w-1/2 rounded-full transition-transform duration-300 ease-in-out  data-[state=checked]:translate-x-full min-w-7",
  {
    variants: {
      variant: {
        default: "bg-card-foreground",
        accent: "bg-accent-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const firstOptionVariants = cva(
  "flex flex-1 flex-row items-center justify-center gap-0.5 whitespace-nowrap px-1 py-0 text-sm transition-colors duration-300 ease-in-out [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: cn(
          "text-card",
          "group-data-[state=checked]:text-card-foreground",
        ),
        accent: cn(
          "text-accent",
          "group-data-[state=checked]:text-accent-foreground",
        ),
      },
    },
    defaultVariants: { variant: "default" },
  },
);
const secondOptionVariants = cva(
  "flex flex-1 flex-row items-center justify-center gap-0.5 whitespace-nowrap px-1 py-0 text-sm transition-colors duration-300 ease-in-out [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: cn(
          "text-card-foreground",
          "group-data-[state=checked]:text-card",
        ),
        accent: cn(
          "text-accent-foreground",
          "group-data-[state=checked]:text-accent",
        ),
      },
    },
    defaultVariants: { variant: "default" },
  },
);

type SelectSwitchProps = ComponentProps<typeof Root> &
  VariantProps<typeof rootVariants> & {
    options: [ReactNode, ReactNode];
  };

function SelectSwitch({
  className,
  variant,
  options,
  ...props
}: SelectSwitchProps) {
  return (
    <Root
      className={cn(rootVariants({ variant }), className)}
      {...props}
      aria-label="select-switch-root"
    >
      <Thumb
        className={thumbVariants({ variant })}
        aria-label="select-switch-thumb"
      />
      <div className="relative z-10 flex w-full items-center">
        <div className={firstOptionVariants({ variant })}>{options[0]}</div>
        <div className={secondOptionVariants({ variant })}>{options[1]}</div>
      </div>
    </Root>
  );
}

export { SelectSwitch };
