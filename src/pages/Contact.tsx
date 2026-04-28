import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function Contact() {
  const { t } = useTranslation();

  return (
    <div className="mt-28 lg:mt-4 p-4 min-w-full max-w-[calc(100dvw)] overflow-x-hidden pt-20">
      {/* Contact Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6">{t("contact.title")}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="bg-muted/20 py-20 rounded-3xl my-8">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            {t("contact.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background text-center py-8 rounded-xl border p-6">
              <div className="mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("contact.emailMethod")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("contact.emailSub")}
                </p>
                <Button variant="outline">{t("contact.emailCta")}</Button>
              </div>
            </div>

            <div className="bg-background text-center py-8 rounded-xl border p-6">
              <div className="mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
                <p className="text-muted-foreground mb-4">
                  {t("contact.linkedinSub")}
                </p>
                <Button variant="outline">{t("contact.linkedin")}</Button>
              </div>
            </div>

            <div className="bg-background text-center py-8 rounded-xl border p-6">
              <div className="mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("contact.portfolio")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("contact.portfolioSub")}
                </p>
                <Button variant="outline">{t("contact.portfolio")}</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t("contact.sendMessage")}
          </h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {t("contact.nameLabel")}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t("contact.namePlaceholder")}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {t("contact.emailLabel")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t("contact.emailPlaceholder")}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-2"
              >
                {t("contact.subjectLabel")}
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={t("contact.subjectPlaceholder")}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                {t("contact.messageLabel")}
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder={t("contact.messagePlaceholder")}
              />
            </div>
            <div className="text-center">
              <Button size="lg" className="w-full md:w-auto">
                {t("contact.workTogether")}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
