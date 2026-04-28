import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const LegalMentions = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-32 max-w-4xl mt-28 lg:mt-4"
    >
      <h1 className="font-display text-4xl mb-8">{t("legal.title")}</h1>

      <section className="space-y-6 text-muted-foreground leading-relaxed">
        <div>
          <h2 className="text-foreground font-heading text-xl mb-2">
            {t("legal.edition")}
          </h2>
          <p>{t("legal.paragraph1")}</p>
          <p className="mt-2">
            <strong>{t("legal.owner")}</strong> {t("legal.ownerName")}
            <br />
            <strong>{t("legal.contact")}</strong> {t("legal.email")}
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-heading text-xl mb-2">
            {t("legal.hosting")}
          </h2>
          <p>
            {t("legal.hostedBy")} {t("legal.hostDetails")}.
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-heading text-xl mb-2">
            {t("legal.ip")}
          </h2>
          <p>{t("legal.iptext")}</p>
        </div>

        <p className="text-sm italic pt-8 border-t border-foreground/5">
          {t("legal.note")}
        </p>
      </section>
    </motion.div>
  );
};
