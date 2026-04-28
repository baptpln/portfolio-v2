import { motion } from "framer-motion";
import { NavbarContent } from "./navbar-content";

export const Navbar = () => {
  return (
    <motion.header
      layout
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none"
    >
      <motion.div
        layout
        transition={{
          layout: { duration: 1, ease: "easeOut" },
        }}
        className="w-fit flex items-center gap-1 sm:gap-2 p-1 bg-primary dark:bg-secondary backdrop-blur-md border border-white/10 rounded-full shadow-2xl pointer-events-auto"
      >
        <NavbarContent />
      </motion.div>
    </motion.header>
  );
};
