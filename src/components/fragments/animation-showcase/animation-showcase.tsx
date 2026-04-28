import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import { ShowcaseNotification } from "./showcase-notification";

export function AnimationShowcase() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-8 md:px-20 max-w-7xl mx-auto w-full">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
          {t("animationShowcase.heading")}
        </h2>
        <p className="text-muted-foreground text-lg font-heading">
          {t("animationShowcase.subheading")}
        </p>
      </motion.div>

      {/* Comparison panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Bad panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-card/50 p-6 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground/70 bg-muted px-2.5 py-1 rounded-full">
              {t("animationShowcase.without.label")}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-6 font-heading">
            {t("animationShowcase.without.description")}
          </p>
          <div className="flex-1 flex items-center justify-center rounded-xl bg-background/60 border border-border/50 p-4">
            <ShowcaseNotification mode="bad" />
          </div>
        </motion.div>

        {/* Good panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-border bg-card/50 p-6 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-heading font-semibold uppercase tracking-widest text-foreground bg-primary/10 px-2.5 py-1 rounded-full">
              {t("animationShowcase.with.label")}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-6 font-heading">
            {t("animationShowcase.with.description")}
          </p>
          <div className="flex-1 flex items-center justify-center rounded-xl bg-background/60 border border-border/50 p-4">
            <ShowcaseNotification mode="good" />
          </div>
        </motion.div>
      </div>

      {/* Punchline */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center text-muted-foreground text-lg mt-12 font-heading"
      >
        <Trans
          i18nKey="animationShowcase.punchline"
          components={{ strong: <strong className="text-foreground" /> }}
        />
      </motion.p>
    </section>
  );
}
