import { motion } from "framer-motion";

export default function SectionWrapper({ id, title, icon, accent, children }) {
  return (
    <motion.section
      id={id}
      className="relative mb-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <span
          className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl shadow-lg"
          style={{ backgroundColor: accent + "22", boxShadow: `0 0 20px ${accent}33` }}
        >
          {icon}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-100 dark:text-gray-100 text-gray-800 transition-colors">
          {title}
        </h2>
        <div
          className="flex-1 h-px opacity-30"
          style={{ background: `linear-gradient(to left, transparent, ${accent})` }}
        />
      </div>

      {children}
    </motion.section>
  );
}
