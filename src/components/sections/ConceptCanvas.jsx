import { motion } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper.jsx";

export default function ConceptCanvas({ data }) {
  return (
    <SectionWrapper
      id="concepts"
      title="آراء ونظريات في تطور الكائنات الحية"
      icon="📖"
      accent="var(--accent-cyan)"
    >
      {/* Main Idea Card */}
      <motion.div
        className="relative rounded-2xl p-6 md:p-8 mb-8 border overflow-hidden animate-glow-border"
        style={{
          backgroundColor: "rgba(0, 229, 255, 0.04)",
          borderColor: "rgba(0, 229, 255, 0.25)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Glow effect */}
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: "var(--accent-cyan)" }}
        />

        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide"
              style={{ backgroundColor: "rgba(0, 229, 255, 0.15)", color: "var(--accent-cyan)" }}
            >
              الفكرة الرئيسة
            </span>
          </div>
          <p
            className="text-lg md:text-xl leading-relaxed font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {data.mainIdea}
          </p>
        </div>
      </motion.div>

      {/* Evolution Definition */}
      <motion.div
        className="rounded-2xl p-6 md:p-8 mb-8 border"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-subtle)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔬</span>
          <h3 className="text-lg font-bold" style={{ color: "var(--accent-emerald)" }}>
            التطور <span className="text-sm font-normal opacity-70">(Evolution)</span>
          </h3>
        </div>
        <p className="text-sm md:text-base leading-loose" style={{ color: "var(--text-secondary)" }}>
          {data.evolutionDefinition}
        </p>
      </motion.div>

      {/* Theories & Mechanisms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.theories.map((theory, i) => (
          <motion.div
            key={theory.nameEn}
            className="rounded-xl p-4 border transition-all hover:border-opacity-50 group"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 * i }}
            whileHover={{ y: -3, boxShadow: "0 8px 25px rgba(0,229,255,0.08)" }}
          >
            <div className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: "rgba(0, 229, 255, 0.1)", color: "var(--accent-cyan)" }}
              >
                {i + 1}
              </span>
              <div>
                <h4 className="font-bold text-sm mb-0.5" style={{ color: "var(--text-primary)" }}>
                  {theory.name}
                </h4>
                <p className="text-xs font-mono opacity-60" style={{ color: "var(--accent-cyan)" }}>
                  {theory.nameEn}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
