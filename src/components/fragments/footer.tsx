import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const Footer = ({ className }: { className?: string }) => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const legalLinks = [
        { name: t("footer.legalLinks.mentions"), path: "/legal-mentions" },
        { name: t("footer.legalLinks.privacy"), path: "/privacy-policy" },
    ];

    return (
        <footer className={cn("w-full py-12 px-4 border-t border-foreground/5 bg-background/20 backdrop-blur-sm", className)}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-muted-foreground text-sm font-heading">
                    © {currentYear} Baptiste Poulain — {t("footer.designCode")}.
                </div>

                <nav className="flex items-center gap-6">
                    {legalLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    );
};
