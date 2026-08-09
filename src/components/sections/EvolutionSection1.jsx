import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper.jsx";

/* ── Snail SVG Icon ── */
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
      <path d="M16 18 Q20 14, 18 10 Q16 7, 14 10 Q12 14, 16 18" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

/* ── Bird predator icon ── */
function BirdIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <path d="M4 16 Q10 8, 16 14 Q22 8, 28 16" stroke="var(--accent-amber)" strokeWidth="2" fill="none" />
      <circle cx="24" cy="14" r="1.5" fill="var(--accent-amber)" />
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
        transition={{ delay: i * 0.05, type: "spring" }}
        className="relative"
      >
        <SnailIcon color="brown" size={30} />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-700/40" />
      </motion.div>
    );
  }

  // Colorful snails
  for (let i = 0; i < colorful; i++) {
    snails.push(
      <motion.div
        key={`colorful-${i}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: (brown + i) * 0.05, type: "spring" }}
        className="relative"
      >
        <SnailIcon color="colorful" size={30} />
      </motion.div>
    );
  }

  // Predated dead snails
  if (predated === "colorful" && stage > 1) {
    const deadCount = stage === 2 ? 4 : 6;
    for (let i = 0; i < deadCount - colorful; i++) {
      snails.push(
        <motion.div
          key={`dead-${i}`}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0.2, scale: 0.8 }}
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
    <div className="flex flex-wrap items-center justify-center gap-3 py-4 min-h-[85px]">
      <AnimatePresence mode="popLayout">{snails}</AnimatePresence>
    </div>
  );
}

/* ── Answer Reveal Card ── */
function QuestionCard({ badge, page, question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border overflow-hidden transition-all mb-4"
      style={{
        backgroundColor: open ? "rgba(245, 166, 35, 0.05)" : "var(--bg-surface)",
        borderColor: open ? "rgba(245, 166, 35, 0.3)" : "var(--border-subtle)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-right p-4 flex items-start gap-3 transition-colors hover:bg-white/3"
      >
        <span
          className="flex-shrink-0 mt-0.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold"
          style={{
            backgroundColor: badge === "أفكر" ? "rgba(0, 229, 255, 0.15)" : "rgba(245, 166, 35, 0.15)",
            color: badge === "أفكر" ? "var(--accent-cyan)" : "var(--accent-amber)",
          }}
        >
          {badge} (صفحة {page})
        </span>
        <p className="flex-1 text-sm font-semibold leading-relaxed" style={{ color: "var(--text-primary)" }}>
          {question}
        </p>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          className="flex-shrink-0 text-gray-500 text-sm mt-1"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pb-4 pt-2 border-t" style={{ borderColor: "rgba(245, 166, 35, 0.15)" }}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-xs font-bold" style={{ color: "var(--accent-emerald)" }}>
                  ✓ الإجابة النموذجية
                </span>
              </div>
              <p className="text-xs md:text-sm leading-loose whitespace-pre-line" style={{ color: "var(--accent-emerald)" }}>
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EvolutionSection1({ data }) {
  const s1 = data.section1;
  const [activeStage, setActiveStage] = useState(0);
  const [patternTab, setPatternTab] = useState("gradualism");

  const stage = s1.figure1.stages[activeStage];

  return (
    <SectionWrapper
      id="section1"
      title="1. مقدمة الدرس وآراء ونظريات في تطور الكائنات الحية"
      icon="📖"
      accent="var(--accent-cyan)"
    >
      {/* 1. Header Banner & Key Idea */}
      <motion.div
        className="relative rounded-2xl p-6 md:p-8 mb-8 border overflow-hidden animate-glow-border"
        style={{
          backgroundColor: "rgba(0, 229, 255, 0.04)",
          borderColor: "rgba(0, 229, 255, 0.25)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: "rgba(0, 229, 255, 0.15)", color: "var(--accent-cyan)" }}
          >
            الفكرة الرئيسة — {s1.pageRange}
          </span>
        </div>

        <p className="text-base md:text-lg leading-relaxed font-semibold mb-5" style={{ color: "var(--text-primary)" }}>
          {s1.mainIdea}
        </p>

        {/* Key Concepts Badges */}
        <div className="border-t pt-4" style={{ borderColor: "rgba(0, 229, 255, 0.15)" }}>
          <p className="text-xs font-bold mb-2.5 opacity-80" style={{ color: "var(--accent-cyan)" }}>
            المفاهيم والمصطلحات الرئيسة (Key Concepts):
          </p>
          <div className="flex flex-wrap gap-2">
            {s1.keyConcepts.map((c) => (
              <span
                key={c.nameEn}
                className="px-2.5 py-1 rounded-lg text-xs font-medium border"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
              >
                {c.name} <span className="text-[10px] font-mono opacity-50">({c.nameEn})</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 2. Introduction Paragraph */}
      <motion.div
        className="rounded-2xl p-5 md:p-7 mb-8 border"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-subtle)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🧬</span>
          <h3 className="text-base font-bold" style={{ color: "var(--accent-emerald)" }}>
            مفهوم التطور ونظريات تفسيره
          </h3>
        </div>
        <p className="text-sm md:text-base leading-loose" style={{ color: "var(--text-secondary)" }}>
          {s1.introduction}
        </p>
      </motion.div>

      {/* 3. Theory 1: Natural Selection Theory */}
      <motion.div
        className="rounded-2xl p-5 md:p-7 mb-8 border"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "rgba(16, 185, 129, 0.2)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs" style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", color: "var(--accent-emerald)" }}>
              1
            </span>
            <h3 className="text-base md:text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              {s1.theory1.title} <span className="text-xs font-mono opacity-60">({s1.theory1.titleEn})</span>
            </h3>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 opacity-70">
            {s1.theory1.scientist}
          </span>
        </div>

        <p className="text-sm md:text-base leading-loose mb-6" style={{ color: "var(--text-secondary)" }}>
          {s1.theory1.text}
        </p>

        {/* 4. Interactive Figure 1: Snail Natural Selection Simulator */}
        <div
          className="rounded-xl border overflow-hidden"
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.03)",
            borderColor: "rgba(16, 185, 129, 0.2)",
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 border-b flex items-center justify-between flex-wrap gap-2"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.08)",
              borderColor: "rgba(16, 185, 129, 0.15)",
            }}
          >
            <span className="text-xs md:text-sm font-bold" style={{ color: "var(--accent-emerald)" }}>
              {s1.figure1.title}
            </span>
            <div className="flex items-center gap-1">
              <BirdIcon />
              <span className="text-[11px] opacity-60">{s1.figure1.caption}</span>
            </div>
          </div>

          <div className="p-4 md:p-6">
            {/* Step progress dots */}
            <div className="flex items-center justify-center gap-4 mb-5">
              {s1.figure1.stages.map((stg, i) => (
                <button
                  key={stg.id}
                  onClick={() => setActiveStage(i)}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <div
                    className={`w-4 h-4 rounded-full transition-all duration-300 stage-dot ${i === activeStage ? "active" : ""}`}
                    style={{
                      backgroundColor:
                        i === activeStage
                          ? "var(--accent-emerald)"
                          : i < activeStage
                          ? "rgba(16, 185, 129, 0.5)"
                          : "rgba(255,255,255,0.15)",
                    }}
                  />
                  <span
                    className="text-[10px] font-semibold transition-colors"
                    style={{ color: i === activeStage ? "var(--accent-emerald)" : "var(--text-secondary)" }}
                  >
                    المرحلة {stg.id}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Stage Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h4 className="text-sm font-bold mb-2" style={{ color: "var(--accent-emerald)" }}>
                  {stage.title}
                </h4>

                {/* Visual Snail Population */}
                <div
                  className="rounded-lg p-3 mb-3 border"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderColor: "rgba(16, 185, 129, 0.1)",
                  }}
                >
                  <div className="flex items-center justify-between mb-1 px-2 text-xs">
                    <span style={{ color: "var(--text-secondary)" }}>
                      بُني اللون (متكيف مع البيئة): <strong style={{ color: "var(--accent-emerald)" }}>{stage.brownCount}</strong>
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      زاهي الألوان (واضح للمفترسات): <strong style={{ color: "#e74c8b" }}>{stage.colorfulCount}</strong>
                    </span>
                  </div>
                  <SnailPopulation
                    colorful={stage.colorfulCount}
                    brown={stage.brownCount}
                    predated={stage.predatedTarget}
                    stage={activeStage + 1}
                  />
                </div>

                <p className="text-xs md:text-sm leading-loose" style={{ color: "var(--text-primary)" }}>
                  {stage.text}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-5 pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
              <button
                onClick={() => setActiveStage((p) => Math.max(0, p - 1))}
                disabled={activeStage === 0}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-30 cursor-pointer"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  color: "var(--accent-emerald)",
                }}
              >
                ← المرحلة السابقة
              </button>
              <span className="text-xs opacity-50 font-mono">
                {activeStage + 1} / {s1.figure1.stages.length}
              </span>
              <button
                onClick={() => setActiveStage((p) => Math.min(s1.figure1.stages.length - 1, p + 1))}
                disabled={activeStage === s1.figure1.stages.length - 1}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-30 cursor-pointer"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  color: "var(--accent-emerald)",
                }}
              >
                المرحلة التالية →
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 5. Theory 2: Punctuated Equilibrium Theory */}
      <motion.div
        className="rounded-2xl p-5 md:p-7 mb-8 border"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "rgba(245, 166, 35, 0.2)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs" style={{ backgroundColor: "rgba(245, 166, 35, 0.15)", color: "var(--accent-amber)" }}>
              2
            </span>
            <h3 className="text-base md:text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              {s1.theory2.title} <span className="text-xs font-mono opacity-60">({s1.theory2.titleEn})</span>
            </h3>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 opacity-70">
            {s1.theory2.scientists}
          </span>
        </div>

        <p className="text-sm md:text-base leading-loose mb-6" style={{ color: "var(--text-secondary)" }}>
          {s1.theory2.text}
        </p>

        {/* Pattern Comparison (Figure 2) */}
        <div
          className="rounded-xl border overflow-hidden p-4 md:p-6"
          style={{
            backgroundColor: "rgba(245, 166, 35, 0.03)",
            borderColor: "rgba(245, 166, 35, 0.2)",
          }}
        >
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="text-xs md:text-sm font-bold" style={{ color: "var(--accent-amber)" }}>
              {s1.patternsComparison.title}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPatternTab("gradualism")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  patternTab === "gradualism"
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                التدرج (داروين)
              </button>
              <button
                onClick={() => setPatternTab("punctuated")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  patternTab === "punctuated"
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                التوازن المتقطع (إلدرج وقولد)
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {patternTab === "gradualism" ? (
              <motion.div
                key="gradualism"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: "var(--accent-cyan)" }}>
                    {s1.patternsComparison.gradualism.title} ({s1.patternsComparison.gradualism.titleEn}):
                  </span>
                </div>
                <p className="text-xs md:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {s1.patternsComparison.gradualism.description}
                </p>
                {/* SVG Curve for Gradualism */}
                <svg viewBox="0 0 400 110" className="w-full max-w-sm mx-auto my-2" style={{ filter: "drop-shadow(0 0 8px rgba(0,229,255,0.15))" }}>
                  <line x1="40" y1="95" x2="380" y2="95" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="40" y1="95" x2="40" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <path d="M50 90 Q120 80, 180 65 Q240 50, 310 35 Q340 25, 370 20" stroke="var(--accent-cyan)" strokeWidth="2.5" fill="none" />
                  {[50, 130, 210, 290, 370].map((x, i) => (
                    <circle key={i} cx={x} cy={90 - i * 17.5} r="3" fill="var(--accent-cyan)" />
                  ))}
                  <text x="210" y="107" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Cairo">الزمن →</text>
                  <text x="25" y="55" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Cairo" transform="rotate(-90, 25, 55)">التغير</text>
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="punctuated"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: "var(--accent-amber)" }}>
                    {s1.patternsComparison.punctuated.title} ({s1.patternsComparison.punctuated.titleEn}):
                  </span>
                </div>
                <p className="text-xs md:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {s1.patternsComparison.punctuated.description}
                </p>
                {/* SVG Curve for Punctuated */}
                <svg viewBox="0 0 400 110" className="w-full max-w-sm mx-auto my-2" style={{ filter: "drop-shadow(0 0 8px rgba(245,166,35,0.15))" }}>
                  <line x1="40" y1="95" x2="380" y2="95" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="40" y1="95" x2="40" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <path d="M50 90 L130 90 L140 55 L240 55 L250 20 L370 20" stroke="var(--accent-amber)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="90" y="85" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="Cairo">استقرار</text>
                  <text x="190" y="50" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="Cairo">استقرار</text>
                  <text x="135" y="65" textAnchor="middle" fill="var(--accent-amber)" fontSize="9" fontFamily="Cairo">قفزة</text>
                  <text x="245" y="32" textAnchor="middle" fill="var(--accent-amber)" fontSize="9" fontFamily="Cairo">قفزة</text>
                  <text x="210" y="107" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Cairo">الزمن →</text>
                  <text x="25" y="55" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Cairo" transform="rotate(-90, 25, 55)">التغير</text>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 6. Embedded In-Text Questions (أفكر ص11, أتحقق ص11) */}
      <div className="mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 opacity-80" style={{ color: "var(--accent-amber)" }}>
          <span>❓</span> أسئلة الدرس التفاعلية (صفحة 11):
        </h4>
        {s1.inTextQuestions.map((q) => (
          <QuestionCard
            key={q.id}
            badge={q.badge}
            page={q.page}
            question={q.question}
            answer={q.answer}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
