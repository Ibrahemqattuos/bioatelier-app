import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper.jsx";

/* ── Gradualism SVG Diagram ── */
function GradualismDiagram() {
  return (
    <svg viewBox="0 0 400 160" className="w-full max-w-md mx-auto my-4" style={{ filter: "drop-shadow(0 0 8px rgba(0,229,255,0.15))" }}>
      {/* Axis */}
      <line x1="40" y1="140" x2="380" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="40" y1="140" x2="40" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

      {/* Gradual curve */}
      <path
        d="M50 130 Q100 120, 130 110 Q160 100, 190 90 Q220 80, 250 70 Q280 60, 310 50 Q340 40, 370 30"
        stroke="var(--accent-cyan)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Dots on curve */}
      {[50, 130, 190, 250, 310, 370].map((x, i) => (
        <circle key={i} cx={x} cy={130 - i * 20} r="3.5" fill="var(--accent-cyan)" opacity={0.8} />
      ))}

      {/* Labels */}
      <text x="210" y="157" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="Cairo">الزمن →</text>
      <text x="25" y="80" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="Cairo" transform="rotate(-90, 25, 80)">التغير</text>
      <text x="210" y="16" textAnchor="middle" fill="var(--accent-cyan)" fontSize="11" fontFamily="Cairo">تغير بطيء ومستمر</text>
    </svg>
  );
}

/* ── Punctuated Equilibrium SVG Diagram ── */
function PunctuatedDiagram() {
  return (
    <svg viewBox="0 0 400 160" className="w-full max-w-md mx-auto my-4" style={{ filter: "drop-shadow(0 0 8px rgba(245,166,35,0.15))" }}>
      {/* Axis */}
      <line x1="40" y1="140" x2="380" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="40" y1="140" x2="40" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

      {/* Stasis + rapid change pattern */}
      <path
        d="M50 125 L120 125 L130 85 L200 85 L210 50 L280 50 L290 30 L370 30"
        stroke="var(--accent-amber)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rapid change highlights */}
      <line x1="120" y1="125" x2="130" y2="85" stroke="var(--accent-amber)" strokeWidth="3" opacity={0.6} strokeDasharray="4,2" />
      <line x1="200" y1="85" x2="210" y2="50" stroke="var(--accent-amber)" strokeWidth="3" opacity={0.6} strokeDasharray="4,2" />
      <line x1="280" y1="50" x2="290" y2="30" stroke="var(--accent-amber)" strokeWidth="3" opacity={0.6} strokeDasharray="4,2" />

      {/* Stasis labels */}
      <text x="85" y="138" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="Cairo">استقرار</text>
      <text x="165" y="98" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="Cairo">استقرار</text>
      <text x="245" y="63" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="Cairo">استقرار</text>

      {/* Jump labels */}
      <text x="125" y="100" textAnchor="middle" fill="var(--accent-amber)" fontSize="9" fontFamily="Cairo">قفزة</text>
      <text x="205" y="65" textAnchor="middle" fill="var(--accent-amber)" fontSize="9" fontFamily="Cairo">قفزة</text>

      <text x="210" y="157" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="Cairo">الزمن →</text>
      <text x="25" y="80" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="Cairo" transform="rotate(-90, 25, 80)">التغير</text>
    </svg>
  );
}

export default function EvolutionPatterns({ data }) {
  const [activeTab, setActiveTab] = useState("gradualism");
  const patterns = data.evolutionPatterns;

  const tabs = [
    { key: "gradualism", label: patterns.gradualism.title, color: "var(--accent-cyan)" },
    { key: "punctuated", label: patterns.punctuatedEquilibrium.title, color: "var(--accent-amber)" },
  ];

  return (
    <SectionWrapper
      id="evolution-patterns"
      title="أنماط التطور: التدرج مقابل التوازن المتقطع"
      icon="📊"
      accent="var(--accent-amber)"
    >
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 mb-6 rounded-xl p-1.5 border" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all relative"
            style={{
              backgroundColor: activeTab === tab.key ? `${tab.color}15` : "transparent",
              color: activeTab === tab.key ? tab.color : "var(--text-secondary)",
              border: activeTab === tab.key ? `1px solid ${tab.color}40` : "1px solid transparent",
            }}
          >
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full"
                style={{ backgroundColor: tab.color }}
                layoutId="tab-indicator"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "gradualism" ? (
          <motion.div
            key="gradualism"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-6 md:p-8 border"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "rgba(0, 229, 255, 0.15)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold" style={{ backgroundColor: "rgba(0, 229, 255, 0.12)", color: "var(--accent-cyan)" }}>
                {patterns.gradualism.titleEn}
              </span>
            </div>

            <GradualismDiagram />

            <p className="text-sm leading-loose mt-4" style={{ color: "var(--text-primary)" }}>
              {patterns.gradualism.text}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="punctuated"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-6 md:p-8 border"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "rgba(245, 166, 35, 0.15)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold" style={{ backgroundColor: "rgba(245, 166, 35, 0.12)", color: "var(--accent-amber)" }}>
                {patterns.punctuatedEquilibrium.titleEn}
              </span>
            </div>

            {/* Developers credit */}
            <p className="text-xs mb-4 font-semibold" style={{ color: "var(--accent-amber)", opacity: 0.8 }}>
              {patterns.punctuatedEquilibrium.developers}
            </p>

            <PunctuatedDiagram />

            <p className="text-sm leading-loose mt-4" style={{ color: "var(--text-primary)" }}>
              {patterns.punctuatedEquilibrium.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
