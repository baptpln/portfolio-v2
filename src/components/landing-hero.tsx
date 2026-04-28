import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { Construction } from "lucide-react";

export function LandingHero() {
  const { t } = useTranslation();

  return (
    <section className=" flex flex-col justify-center items-start px-8 md:px-20 max-w-7xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <img
          src="/me_compressed.png"
          alt="Baptiste Poulain"
          className="w-16 h-16 rounded-full object-cover ring-2 ring-border"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <span className="text-xl md:text-2xl text-muted-foreground font-heading font-medium mb-4 block">
          {t("hero.hello")}
        </span>
      </motion.div>

      <motion.h1
        className="text-7xl md:text-9xl font-bold tracking-tight mb-8 font-display"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        {t("hero.name")}
      </motion.h1>

      <motion.div
        className="text-2xl md:text-4xl font-medium tracking-tight max-w-4xl leading-relaxed font-heading"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="text-foreground">
          {t("hero.craft")}{" "}
          <span className="text-primary font-bold italic">
            {t("hero.animations")}
          </span>
          , <span className="text-red-500 font-bold">{t("hero.ux")}</span>, and{" "}
          <span className="text-brown-600 font-bold">
            {t("hero.micro-interactions")}
          </span>
          .
        </p>
      </motion.div>

      <div className="flex flex-wrap items-center gap-2 mt-12">
        <Button size="lg">{t("hero.cta")}</Button>
        <Button variant="outline" size="lg" disabled>
          <Construction />
          {t("hero.viewWorks")}
        </Button>
      </div>
    </section>
  );
}
