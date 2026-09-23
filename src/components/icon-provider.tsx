import { IconContext } from "@phosphor-icons/react";
import type { FC, ReactNode } from "react";

export const IconProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <IconContext.Provider value={{ "aria-hidden": true }}>
      {children}
    </IconContext.Provider>
  );
};
