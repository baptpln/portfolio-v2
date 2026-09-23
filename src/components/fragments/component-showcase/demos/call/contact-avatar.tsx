import type { FC } from "react";
import type { Contact } from "./types";

interface ContactAvatarProps {
  contact: Contact;
  size?: "sm" | "lg";
}

const SIZE = {
  sm: "h-9 w-9 text-xs",
  lg: "h-20 w-20 text-3xl",
};

const LOGO_PADDING = {
  sm: "p-2",
  lg: "p-4",
};

export const ContactAvatar: FC<ContactAvatarProps> = ({
  contact,
  size = "sm",
}) => {
  if (contact.logo) {
    const lightBg = contact.lightBg ?? "bg-muted";
    const darkBg = contact.darkBg ?? "dark:bg-muted";

    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded-full border border-border ${lightBg} ${darkBg} ${SIZE[size]} ${LOGO_PADDING[size]}`}
      >
        <img
          src={contact.logo}
          alt={contact.name}
          className="h-full w-full object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-muted-foreground/20 font-semibold text-foreground ${SIZE[size]}`}
    >
      {contact.name.charAt(0).toUpperCase()}
    </span>
  );
};
