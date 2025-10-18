import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const InfoVariants = cva(
  "flex items-center justify-center gap-2 px-4 py-2 rounded-md w-fit max-sm:w-full text-sm md:text-base",
  {
    variants: {
      variant: {
        outline: "bg-background border",
        accent: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "accent",
    },
  },
);

type InfoProps = VariantProps<typeof InfoVariants> & {
  icon: React.ReactNode;
  text: string;
};
export const Info = ({ icon, text, variant }: InfoProps) => (
  <div className={InfoVariants({ variant })}>
    {icon}
    {text}
  </div>
);
