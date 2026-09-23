import anthropicLogo from "@/assets/brands/anthropic.svg";
import appleLogo from "@/assets/brands/apple.svg";
import cloudflareLogo from "@/assets/brands/cloudflare.svg";
import figmaLogo from "@/assets/brands/figma.svg";
import nvidiaLogo from "@/assets/brands/nvidia.svg";
import openaiLogo from "@/assets/brands/openai.svg";
import palantirLogo from "@/assets/brands/palantir.svg";
import vercelLogo from "@/assets/brands/vercel.svg";
import type { Contact } from "./types";

export const BAPTISTE_LOGO = "/drache-labs-transparent.svg";

/** All demo contacts, Baptiste included — his name doesn't need translating. */
export function getContacts(): Contact[] {
  return [
    {
      name: "Baptiste",
      logo: BAPTISTE_LOGO,
      lightBg: "bg-foreground",
      darkBg: "dark:bg-secondary",
    },
    { name: "OpenAI", logo: openaiLogo, darkBg: "dark:bg-primary" },
    { name: "Anthropic", logo: anthropicLogo, darkBg: "dark:bg-primary" },
    { name: "Apple", logo: appleLogo, darkBg: "dark:bg-primary" },
    { name: "Vercel", logo: vercelLogo, darkBg: "dark:bg-primary" },
    { name: "Palantir", logo: palantirLogo, darkBg: "dark:bg-primary" },
    { name: "Figma", logo: figmaLogo },
    { name: "Nvidia", logo: nvidiaLogo, darkBg: "dark:bg-foreground" },
    { name: "Cloudflare", logo: cloudflareLogo },
  ];
}
