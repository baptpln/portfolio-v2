import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

export function ExperienceSection() {
    const { t } = useTranslation();

    const experiences = [
        { key: "loreal" },
        { key: "sfeir" },
        { key: "welovedevs" },
        { key: "willemse" },
    ];

    return (
        <section className="py-24 px-8 md:px-20 max-w-7xl mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "100% 0px 0px 0px" }}
                transition={{ duration: 0.8 }}
                className="mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                    {t("experience.title")}
                </h2>
                <div className="h-1 w-20 bg-primary rounded-full" />
            </motion.div>

            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent">
                {experiences.map((exp, index) => (
                    <ExperienceCard
                        key={exp.key}
                        expKey={exp.key}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}

function ExperienceCard({ expKey, index }: { expKey: string; index: number }) {
    const { t } = useTranslation();
    const isEven = index % 2 === 0;
    const viewportConfig = { once: false, amount: 0.2, margin: "100% 0px 0px 0px" };

    const achievements = t(`experience.${expKey}.achievements`, { returnObjects: true });
    const hasAchievements = Array.isArray(achievements);

    return (
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group min-h-[300px] md:min-h-[220px]">
            {/* Icon Node */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={viewportConfig}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background text-primary shadow-sm md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 z-10"
            >
                <Briefcase size={18} />
            </motion.div>

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-foreground/5 bg-background/40 backdrop-blur-md hover:bg-background/60 transition-colors shadow-sm ml-auto md:ml-0"
            >
                <div className="flex flex-col gap-1 mb-4">
                    <div className="flex flex-wrap items-center gap-2 text-primary font-heading font-medium text-sm lg:text-base">
                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                            <Calendar size={14} />
                            {t(`experience.${expKey}.period`)}
                        </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold font-display">
                        {t(`experience.${expKey}.company`)}
                    </h3>
                    <p className="text-muted-foreground font-heading">
                        {t(`experience.${expKey}.position`)}
                    </p>
                </div>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>{t(`experience.${expKey}.description`)}</p>

                    {hasAchievements && (
                        <ul className="space-y-2 pt-2">
                            {(achievements as string[]).map((achievement: string, i: number) => (
                                <li key={i} className="flex gap-2 text-sm">
                                    <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                                    <span>{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {t(`experience.${expKey}.focus`) && (
                        <p className="text-sm italic border-l-2 border-primary/20 pl-4 py-1">
                            {t(`experience.${expKey}.focus`)}
                        </p>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
