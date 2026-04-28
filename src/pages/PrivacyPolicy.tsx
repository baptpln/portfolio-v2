import { motion } from "framer-motion";

export const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-32 max-w-4xl mt-28 lg:mt-4"
    >
      <h1 className="font-display text-4xl mb-8">
        Politique de Confidentialité
      </h1>

      <section className="space-y-6 text-muted-foreground leading-relaxed">
        <div>
          <h2 className="text-foreground font-heading text-xl mb-2">
            1. Collecte des données
          </h2>
          <p>
            Les données personnelles collectées sur ce site sont uniquement
            celles que vous fournissez volontairement via le formulaire de
            contact (Nom, Email, Message).
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-heading text-xl mb-2">
            2. Utilisation des données
          </h2>
          <p>
            Ces informations sont utilisées exclusivement pour répondre à vos
            demandes de renseignements. Elles ne sont jamais partagées avec des
            tiers ni vendues.
          </p>
        </div>

        <div>
          <h2 className="text-foreground font-heading text-xl mb-2">
            3. Vos droits
          </h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de
            rectification et de suppression de vos données personnelles. Vous
            pouvez exercer ce droit en nous contactant via le formulaire de
            contact.
          </p>
        </div>

        <p className="text-sm italic pt-8 border-t border-foreground/5">
          Note : Ce document est une ébauche générique. Vous devriez le
          compléter avec vos informations réelles.
        </p>
      </section>
    </motion.div>
  );
};
