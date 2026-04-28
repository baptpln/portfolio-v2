import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Hammer, Pickaxe, Construction } from "lucide-react";

export function UnderConstruction() {
  const { t } = useTranslation();

  const viewportConfig = { once: false, amount: 0.2, margin: "100% 0px 0px 0px" };

  return (
    <section className="py-24 px-8 md:px-20 max-w-7xl mx-auto w-full relative z-0 min-h-[500px]">
      <div
        className="relative p-10 rounded-3xl overflow-hidden shadow-2xl min-h-[400px] flex items-center justify-center border-none"
        style={{
          background:
            "radial-gradient(circle at top right, var(--orb-100) 0%, var(--orb-200) 24%, var(--orb-300) 69%, var(--orb-400) 100%)",
        }}
      >
        {/* Layer 1: Noise Texture - Tiled Background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={viewportConfig}
          className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay border-none"
          style={{
            backgroundImage: "url('/noise-big.webp')",
            backgroundSize: "100px 100px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Layer 2: Background micro-animations - Fixed Background */}
        <div className="absolute inset-0 z-1 pointer-events-none opacity-40 border-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                x: [0, -50 - Math.random() * 100],
                y: [0, -150 - Math.random() * 100],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Layer 3: Content Layer - Real flow on top */}
        <div className="relative z-20 flex flex-col items-center text-center w-full max-w-2xl px-4 border-none">
          <motion.div
            initial={{ y: -40, opacity: 0, rotate: -15 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={viewportConfig}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mb-8 p-5 rounded-2xl bg-white/20 backdrop-blur-2xl text-white border border-white/10 shadow-lg"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Pickaxe size={48} strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-4 font-display text-white leading-tight"
            style={{ textShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
          >
            {t("underConstruction.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white font-heading leading-relaxed mb-8"
            style={{ textShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
          >
            {t("underConstruction.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-8"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="text-white/60"
            >
              <Hammer size={24} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="text-white/60"
            >
              <Construction size={24} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
