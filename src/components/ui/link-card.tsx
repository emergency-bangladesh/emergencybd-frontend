import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import Muted from "./typography/muted";

type LinkCardProps = {
  to: LinkProps["to"];
  icon?: ReactNode;
  heading: string;
  subHeading?: string;
};

export const LinkCard = ({ to, heading, subHeading, icon }: LinkCardProps) => (
  <Link
    to={to}
    className="flex justify-start items-center gap-4 border p-4 rounded-xl bg-background shadow-xs shadow-accent hover:bg-accent w-full"
  >
    {icon && (
      <div className="flex items-center justify-center h-full">{icon}</div>
    )}
    <div className="flex flex-col items-start justify-start gap-1">
      <h4>{heading}</h4>
      <Muted className="leading-5"> {subHeading} </Muted>
    </div>
  </Link>
);
