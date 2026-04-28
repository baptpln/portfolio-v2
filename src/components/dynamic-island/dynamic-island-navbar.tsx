"use client";
import { type FC } from "react";
import { NavbarIsland } from "./navbar-island";

export const DynamicIslandNavbar: FC<{ className?: string }> = ({
  className,
}) => {
  return <NavbarIsland className={className} />;
};
