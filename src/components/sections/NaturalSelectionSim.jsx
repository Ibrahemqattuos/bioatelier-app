import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper.jsx";

/* ── Snail SVG Icon (reused per stage) ── */
function SnailIcon({ color, size = 28, opacity = 1 }) {
  const fill = color === "brown" ? "#8B6914" : "#e74c8b";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" opacity={opacity}>
      <ellipse cx="16" cy="22" rx="10" ry="6" fill={fill} opacity={0.85} />
      <ellipse cx="16" cy="18" rx="7" ry="7" fill={fill} />
      <path d="M16 11 C16 11, 18 5, 20 7" stroke={fill} strokeWidth="1.5" fill="none" />
      <path d="M16 11 C16 11, 14 5, 12 7" stroke={fill} strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="7" r="1.2" fill={fill} />
      <circle cx="12" cy="7" r="1.2" fill={fill} />
      {/* Shell spiral */}
      <path d="M16 18 Q20 14, 18 10 Q16 7, 14 10 Q12 14, 16 18" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

/* ── Bird predator icon ── */
function BirdIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <path d="M4 16 Q10 8, 16 14 Q22 8, 28 16" stroke="#f5a623" strokeWidth="2" fill="none" />
      <circle cx="24" cy="14" r="1.5" fill="#f5a623" />
    </svg>
  );
}

/* ── Snail population visualizer ── */
function SnailPopulation({ colorful, brown, predated, stage }) {
  const snails = [];

  // Brown snails
  for (let i = 0; i < brown; i++) {
    snails.push(
      <motion.div
        key={`brown-${i}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: i * 0.06, type: "spring" }}
        className="relative"
      >
        <SnailIcon color="brown" size={30} />
        {/* Camouflage indicator */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-green-700/40" />
      </motion.div>
    );
  }

  // Colorful snails (some crossed out if predated)
  for (let i = 0; i < colorful; i++) {
    snails.push(
      <motion.div
        key={`colorful-${i}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: (brown + i) * 0.06, type: "spring" }}
        className="relative"
      >
        <SnailIcon color="colorful" size={30} />
      </motion.div>
    );
  }

  // Show predated colorful snails with X mark
  if (predated === "colorful" && stage > 1) {
    const predatedCount = stage === 2 ? 4 : 6;
    for (let i = 0; i < predatedCount - colorful; i++) {
      snails.push(
        <motion.div
          key={`dead-${i}`}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0.25, scale: 0.8 }}
          transition={{ delay: i * 0.1 }}
          className="relative"
        >
          <SnailIcon color="colorful" size={30} opacity={0.3} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-red-500 text-lg font-bold">✕</span>
          </div>
        </motion.div>
      );
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-4 min-h-[80px]">
      <AnimatePresence mode="popLayout">
        {snails}
      </AnimatePresence>
    </div>
  );
}

export default function NaturalSelectionSim({ data }) {
  const [activeStage, setActiveStage] = useState(0);
  const ns = data.naturalSelection;
  const stage = ns.stages[activeStage];

  return (
    <SectionWrapper
      id="natural-selection"
      title="نظرية الانتخاب الطبيعي"
      icon="🐚"
      accent="var(--accent-emerald)"
    >
      {/* Darwin's text panel */}
      <motion.div
        className="rounded-2xl p-5 md:p-7 mb-8 border"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-subtle)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">📜</span>
          <span className="text-xs font-bold" style={{ color: "var(--accent-cyan)" }}>
            نص داروين — الكتاب المدرسي
          </span>
        </div>
        <p className="text-sm leading-loose" style={{ color: "var(--text-secondary)" }}>
          {ns.darwinText}
        </p>
      </motion.div>

      {/* Interactive Simulator */}
      <motion.div
        className="rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "rgba(16, 185, 129, 0.2)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Figure title bar */}
        <div
          className="px-5 py-3 border-b flex items-center justify-between"
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.06)",
            borderColor: "rgba(16, 185, 129, 0.15)",
          }}
        >
          <span className="text-sm font-bold" style={{ color: "var(--accent-emerald)" }}>
            {ns.figureTitle}
          </span>
          <div className="flex items-center gap-1">
            <BirdIcon />
            <span className="text-[10px] opacity-50">الطيور المفترسة</span>
          </div>
        </div>

        {/* Stage content */}
        <div className="p-5 md:p-7">
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {ns.stages.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveStage(i)}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 stage-dot ${i === activeStage ? "active" : ""}`}
                  style={{
                    backgroundColor:
                      i === activeStage
                        ? "var(--accent-emerald)"
                        : i < activeStage
                        ? "rgba(16, 185, 129, 0.4)"
                        : "rgba(255,255,255,0.15)",
                    color: "var(--accent-emerald)",
                  }}
                />
                <span
                  className="text-[10px] transition-colors"
                  style={{ color: i === activeStage ? "var(--accent-emerald)" : "var(--text-secondary)" }}
                >
                  المرحلة {s.id}
                </span>
              </button>
            ))}
            {/* Connecting lines */}
          </div>

          {/* Active stage display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              {/* Stage title */}
              <h4
                className="text-base font-bold mb-3"
                style={{ color: "var(--accent-emerald)" }}
              >
                {stage.title}
              </h4>

              {/* Visual population */}
              <div
                className="rounded-xl p-4 mb-4 border"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.03)",
                  borderColor: "rgba(16, 185, 129, 0.1)",
                }}
              >
                <div className="flex items-center justify-between mb-2 px-2">
                  <div className="flex items-center gap-2">
                    <SnailIcon color="brown" size={18} />
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      بُني: <strong style={{ color: "var(--accent-emerald)" }}>{stage.brown}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SnailIcon color="colorful" size={18} />
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      زاهي: <strong style={{ color: "#e74c8b" }}>{stage.colorful}</strong>
                    </span>
                  </div>
                </div>
                <SnailPopulation
                  colorful={stage.colorful}
                  brown={stage.brown}
                  predated={stage.predated}
                  stage={activeStage + 1}
                />
              </div>

              {/* Stage text */}
              <p className="text-sm leading-loose" style={{ color: "var(--text-primary)" }}>
                {stage.text}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
            <button
              onClick={() => setActiveStage((p) => Math.max(0, p - 1))}
              disabled={activeStage === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-30"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                color: "var(--accent-emerald)",
              }}
            >
              ← السابق
            </button>
            <span className="text-xs opacity-50">
              {activeStage + 1} / {ns.stages.length}
            </span>
            <button
              onClick={() => setActiveStage((p) => Math.min(ns.stages.length - 1, p + 1))}
              disabled={activeStage === ns.stages.length - 1}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-30"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                color: "var(--accent-emerald)",
              }}
            >
              التالي →
            </button>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
