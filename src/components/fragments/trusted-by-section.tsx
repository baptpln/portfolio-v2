import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import adeoLogo from "@/assets/brands/adeo.svg";
import decathlonLogo from "@/assets/brands/decathlon.svg";
import lorealLogo from "@/assets/brands/loreal-light.svg";
import mdsLogo from "@/assets/brands/mydigitalschool.svg";

const brands = [
  { name: "Adeo", src: adeoLogo },
  { name: "Decathlon", src: decathlonLogo },
  { name: "L'Oréal Paris", src: lorealLogo, invertInDark: true },
  { name: "MyDigitalSchool", src: mdsLogo, isTeacher: true },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function TrustedBySection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-8 md:px-20 max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <p className="text-xs font-heading uppercase tracking-[0.2em] text-muted-foreground">
          {t("trustedBy.label")}
        </p>
        <p className="text-xs font-heading text-muted-foreground/60 mt-1">
          {t("trustedBy.subtitle")}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-2 md:flex md:flex-row items-center justify-center gap-10 md:gap-16"
      >
        {brands.map((brand) => (
          <motion.div
            key={brand.name}
            variants={itemVariants}
            className="relative flex items-center justify-center"
          >
            <img
              src={brand.src}
              alt={brand.name}
              className={[
                "h-8 md:h-9 w-auto object-contain opacity-60 hover:opacity-100 transition-all duration-300 hover:-translate-y-0.5",
                brand.invertInDark ? "dark:invert" : "dark:brightness-[1.8]",
              ].join(" ")}
            />
            {brand.isTeacher && (
              <span className="absolute -top-5 -right-3 text-[10px] font-heading font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full leading-none">
                {t("trustedBy.teacher")}
              </span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
