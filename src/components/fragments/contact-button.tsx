import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { useWebHaptics } from "web-haptics/react";
import { useTranslation } from "react-i18next";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MatrixDisplay } from "./matrix/matrix-display";
import { contactMatrix } from "./matrix/contact-matrix";
function field(i: number) {
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: i * 0.07, duration: 0.35, ease: "easeOut" as const },
  };
}

interface ContactButtonProps {
  className?: string;
}

export const ContactButton = ({ className }: ContactButtonProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { trigger } = useWebHaptics();

  const handleOpen = () => {
    trigger([{ duration: 15 }, { delay: 30, duration: 25 }]);
    setOpen(true);
  };

  return (
    <>
      <div className={cn("relative overflow-visible", className)}>
        <Button
          variant="ghost_reversed"
          size="sm"
          className="rounded-xl group font-heading text-white hover:bg-white hover:text-foreground dark:hover:text-secondary gap-2 overflow-visible items-center relative"
          onClick={handleOpen}
        >
          <span className="mr-1">{t("contact.title")}</span>
          <MatrixDisplay
            matrices={contactMatrix}
            dotSize="h-[2px] w-[2px]"
            onColor="bg-white group-hover:bg-foreground dark:group-hover:bg-secondary"
            offColor="bg-white/10 group-hover:bg-foreground/10 dark:group-hover:bg-secondary/10"
            spacing="gap-[1px]"
            speed={5}
          />
        </Button>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal forceMount>
          <AnimatePresence>
            {open && (
              <>
                <Dialog.Overlay asChild forceMount>
                  <motion.div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </Dialog.Overlay>

                <Dialog.Content asChild forceMount>
                  <motion.div
                    className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-background border border-border rounded-2xl p-6 shadow-2xl outline-none"
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <Dialog.Title className="font-display text-2xl font-bold">
                          {t("contact.workTogether")}
                        </Dialog.Title>
                        <Dialog.Description className="text-sm text-muted-foreground mt-1">
                          {t("contact.dialogDescription")}
                        </Dialog.Description>
                      </div>
                      <Dialog.Close asChild>
                        <button className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                          <X size={16} />
                          <span className="sr-only">Close</span>
                        </button>
                      </Dialog.Close>
                    </div>

                    {/* Fields */}
                    <div className="flex flex-col gap-4">
                      <motion.div {...field(0)}>
                        <label className="text-xs font-heading font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
                          {t("contact.nameLabel")}
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t("contact.namePlaceholder")}
                          className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm font-heading placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                        />
                      </motion.div>

                      <motion.div {...field(1)}>
                        <label className="text-xs font-heading font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
                          {t("contact.emailLabel")}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t("contact.emailPlaceholder")}
                          className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm font-heading placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                        />
                      </motion.div>

                      <motion.div {...field(2)}>
                        <label className="text-xs font-heading font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
                          {t("contact.messageLabel")}
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={t("contact.messagePlaceholder")}
                          rows={4}
                          className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm font-heading placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                        />
                      </motion.div>

                      <motion.div {...field(3)}>
                        <Button type="submit" className="w-full gap-2">
                          <Send size={14} />
                          {t("contact.sendMessage")}
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </>
            )}
          </AnimatePresence>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
