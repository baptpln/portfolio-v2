import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import adeoLogo from "@/assets/brands/adeo.svg";
import decathlonLogo from "@/assets/brands/decathlon.svg";
import lorealLogo from "@/assets/brands/loreal-light.svg";
import mdsLogo from "@/assets/brands/mydigitalschool.svg";
import sfeirLogo from "@/assets/brands/sfeir.webp";
import ynovLogo from "@/assets/brands/ynov.png";

interface Brand {
  name: string;
  src: string;
  /** Intrinsic width / height of the asset, so the mask box matches it. */
  ratio: number;
  /** Optical size tweak: wide wordmarks read smaller, square marks bigger. */
  scale?: number;
}

/** Base logo height in px; each brand's `scale` multiplies it. */
const LOGO_HEIGHT = 28;

// SFEIR first: it anchors the row, and the clients after it are missions
// carried out through them rather than direct clients of my own company.
const companies: Brand[] = [
  { name: "SFEIR", src: sfeirLogo, ratio: 2.98 },
  { name: "Adeo", src: adeoLogo, ratio: 1.78, scale: 1.5 },
  { name: "Decathlon", src: decathlonLogo, ratio: 5.03, scale: 0.75 },
  { name: "L'Oréal Paris", src: lorealLogo, ratio: 5.53, scale: 0.8 },
];

const schools: Brand[] = [
  { name: "MyDigitalSchool", src: mdsLogo, ratio: 1.7, scale: 1.4 },
  { name: "Ynov Campus Lille", src: ynovLogo, ratio: 2.0, scale: 1.5 },
];

const rowVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const logoVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/**
 * Logos are painted with the theme's foreground colour through a CSS mask
 * rather than rendered as images: one consistent weight across the row, full
 * strength (no dimming), and dark mode handled without per-logo inverts.
 */
function Logo({ brand }: { brand: Brand }) {
  const height = LOGO_HEIGHT * (brand.scale ?? 1);

  return (
    <motion.span
      variants={logoVariants}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      role="img"
      aria-label={brand.name}
      className="block bg-foreground/85 transition-colors duration-300 hover:bg-foreground"
      style={{
        height,
        width: height * brand.ratio,
        // Quoted: small assets are inlined by Vite as data: URLs, whose commas
        // would otherwise break the CSS url() function.
        maskImage: `url("${brand.src}")`,
        WebkitMaskImage: `url("${brand.src}")`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

function LogoRow({
  label,
  hint,
  brands,
}: {
  label: string;
  hint?: string;
  brands: Brand[];
}) {
  return (
    <motion.div
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:gap-14"
    >
      <div className="shrink-0 text-center md:w-44 md:text-left">
        <p className="text-xs font-heading uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
        {hint && (
          <p className="mt-1 text-xs font-heading text-muted-foreground/60">
            {hint}
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-wrap items-center justify-center gap-10 md:justify-between md:gap-14">
        {brands.map((brand) => (
          <Logo key={brand.name} brand={brand} />
        ))}
      </div>
    </motion.div>
  );
}

export function TrustedBySection() {
  const { t } = useTranslation();

  return (
    <section className="my-16 w-full border-y border-border">
      <div className="mx-auto w-full max-w-6xl divide-y divide-border px-8 md:px-20">
        <LogoRow
          label={t("trustedBy.label")}
          hint={t("trustedBy.subtitle")}
          brands={companies}
        />
        <LogoRow label={t("trustedBy.teaching")} brands={schools} />
      </div>
    </section>
  );
}
