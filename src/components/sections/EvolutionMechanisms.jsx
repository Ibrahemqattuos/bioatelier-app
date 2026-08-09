import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper.jsx";

/* ── Figure 5: Geographic Isolation Mechanism Stepper ── */
function FlowerIsolationStepper() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "1. جماعة متصلة متجانسة",
      desc: "نوع واحد من الأزهار يتوزع في مساحة بيئية متصلة ومفتوحة، حيث يحدث التزاوج والتدفق الجيني بحرية تامة.",
      color: "#10b981",
    },
    {
      id: 2,
      title: "2. ارتفاع مستوى البحر (حاجز جغرافي)",
      desc: "ارتفاع مستوى مياه البحر يفصل اليابسة إلى جزيرتين منعزلتين، ما يمنع التزاوج وانتقال حبوب اللقاح بين الجماعتين.",
      color: "#00e5ff",
    },
    {
      id: 3,
      title: "3. تراكم التغيرات الجينية ونشوء نوعين",
      desc: "بعد ملايين السنين من الانعزال وتراكم الطفرات والانتخاب الطبيعي المستقل، تمايزت الأزهار إلى نوعين مختلفين لا يمكنهما التزاوج.",
      color: "#f5a623",
    },
  ];

  const current = steps[step];

  return (
    <div className="p-4 rounded-xl border mb-4" style={{ backgroundColor: "rgba(0,0,0,0.25)", borderColor: "var(--border-subtle)" }}>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <span className="text-xs font-bold" style={{ color: "var(--accent-cyan)" }}>
          الشكل (5): آلية حدوث الانعزال الجغرافي (توزّع الأزهار وانقسامها عبر الزمن)
        </span>
        <div className="flex items-center gap-1.5">
          {steps.map((st, i) => (
            <button
              key={st.id}
              onClick={() => setStep(i)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                step === i
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              الخطوة {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Map Representation */}
      <svg viewBox="0 0 400 130" className="w-full max-w-md mx-auto my-2">
        {step === 0 ? (
          /* Single continuous green island */
          <g>
            <path d="M30 65 Q100 20, 200 25 Q300 20, 370 65 Q300 110, 200 105 Q100 110, 30 65 Z" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="2" />
            {/* Flowers */}
            {[70, 120, 160, 200, 240, 280, 330].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy={50 + (i % 3) * 15} r="5" fill="#f43f5e" />
                <circle cx={x} cy={50 + (i % 3) * 15} r="2" fill="#fbbf24" />
              </g>
            ))}
            <text x="200" y="125" textAnchor="middle" fill="var(--accent-emerald)" fontSize="9" fontFamily="Cairo">مساحة بيئية متصلة — نوع زهور واحد (وردي)</text>
          </g>
        ) : step === 1 ? (
          /* Sea level rises in middle */
          <g>
            {/* Left Island */}
            <path d="M30 65 Q80 25, 150 30 Q160 70, 140 100 Q80 105, 30 65 Z" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="1.5" />
            {/* Sea water channel */}
            <rect x="165" y="10" width="70" height="110" fill="rgba(0, 229, 255, 0.2)" rx="10" stroke="#00e5ff" strokeDasharray="3,3" />
            <text x="200" y="65" textAnchor="middle" fill="#00e5ff" fontSize="9" fontFamily="Cairo">ارتفاع البحر</text>
            {/* Right Island */}
            <path d="M250 30 Q320 25, 370 65 Q320 105, 260 100 Q240 70, 250 30 Z" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="1.5" />
            {/* Flowers on both sides */}
            {[60, 100, 130].map((x, i) => (
              <circle key={i} cx={x} cy={55 + (i % 2) * 15} r="5" fill="#f43f5e" />
            ))}
            {[270, 310, 340].map((x, i) => (
              <circle key={i} cx={x} cy={55 + (i % 2) * 15} r="5" fill="#f43f5e" />
            ))}
          </g>
        ) : (
          /* Speciation after millions of years */
          <g>
            {/* Left Island with Yellow Flowers */}
            <path d="M30 65 Q80 25, 150 30 Q160 70, 140 100 Q80 105, 30 65 Z" fill="rgba(245, 166, 35, 0.25)" stroke="#f5a623" strokeWidth="1.5" />
            {[60, 95, 130].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy={55 + (i % 2) * 15} r="6" fill="#fbbf24" />
                <circle cx={x} cy={55 + (i % 2) * 15} r="2" fill="#fff" />
              </g>
            ))}
            <text x="95" y="122" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="Cairo">نوع (أ) متمايز (أصفر)</text>

            {/* Sea water */}
            <rect x="165" y="10" width="70" height="110" fill="rgba(0, 229, 255, 0.15)" rx="10" />

            {/* Right Island with Blue/Purple Flowers */}
            <path d="M250 30 Q320 25, 370 65 Q320 105, 260 100 Q240 70, 250 30 Z" fill="rgba(168, 85, 247, 0.25)" stroke="#a855f7" strokeWidth="1.5" />
            {[270, 305, 340].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy={55 + (i % 2) * 15} r="6" fill="#a855f7" />
                <circle cx={x} cy={55 + (i % 2) * 15} r="2" fill="#fff" />
              </g>
            ))}
            <text x="305" y="122" textAnchor="middle" fill="#a855f7" fontSize="8" fontFamily="Cairo">نوع (ب) متمايز (بنفسجي)</text>
          </g>
        )}
      </svg>

      <div className="p-3 rounded-lg border" style={{ backgroundColor: "rgba(0,0,0,0.3)", borderColor: "var(--border-subtle)" }}>
        <h5 className="font-bold text-xs mb-1" style={{ color: current.color }}>
          {current.title}
        </h5>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {current.desc}
        </p>
      </div>
    </div>
  );
}

export default function EvolutionMechanisms({ data }) {
  const s3 = data.section3;
  const [openCheck, setOpenCheck] = useState(false);

  return (
    <SectionWrapper
      id="section3"
      title="3. آليات تطور الكائنات الحية"
      icon="⚙️"
      accent="var(--accent-cyan)"
    >
      <div className="mb-6">
        <span
          className="px-3 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: "rgba(0, 229, 255, 0.12)", color: "var(--accent-cyan)" }}
        >
          الآليات الثلاث الرئيسة — {s3.pageRange}
        </span>
      </div>

      {/* Mechanism 1: Isolation */}
      <motion.div
        className="rounded-2xl p-5 md:p-7 border mb-8"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "rgba(0, 229, 255, 0.2)" }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🏝️</span>
          <div>
            <h3 className="font-bold text-base md:text-lg" style={{ color: "var(--text-primary)" }}>
              {s3.mechanisms[0].title} <span className="text-xs font-mono opacity-60">({s3.mechanisms[0].titleEn})</span>
            </h3>
          </div>
        </div>

        <p className="text-sm leading-loose mb-5" style={{ color: "var(--text-secondary)" }}>
          {s3.mechanisms[0].text}
        </p>

        {/* Interactive Figure 5 Stepper */}
        <FlowerIsolationStepper />

        {/* 5 Isolation Types */}
        <div className="mt-4">
          <h5 className="text-xs font-bold mb-2.5" style={{ color: "var(--accent-cyan)" }}>
            أنواع الانعزال في الكائنات الحية:
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {s3.mechanisms[0].types.map((t) => (
              <div
                key={t.name}
                className="p-3 rounded-xl border"
                style={{ backgroundColor: "rgba(0, 229, 255, 0.03)", borderColor: "var(--border-subtle)" }}
              >
                <p className="text-xs font-bold mb-1" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                <p className="text-[11px] leading-relaxed opacity-70" style={{ color: "var(--text-secondary)" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mechanism 2: Genetic Flow */}
      <motion.div
        className="rounded-2xl p-5 md:p-7 border mb-8"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "rgba(16, 185, 129, 0.2)" }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🌬️</span>
          <h3 className="font-bold text-base md:text-lg" style={{ color: "var(--accent-emerald)" }}>
            {s3.mechanisms[1].title} <span className="text-xs font-mono opacity-60">({s3.mechanisms[1].titleEn})</span>
          </h3>
        </div>

        <p className="text-sm leading-loose mb-5" style={{ color: "var(--text-secondary)" }}>
          {s3.mechanisms[1].text}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {s3.mechanisms[1].examples.map((ex) => (
            <div
              key={ex.title}
              className="p-4 rounded-xl border"
              style={{ backgroundColor: "rgba(16, 185, 129, 0.04)", borderColor: "rgba(16, 185, 129, 0.15)" }}
            >
              <h5 className="font-bold text-xs mb-1.5" style={{ color: "var(--accent-emerald)" }}>
                {ex.title}
              </h5>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {ex.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mechanism 3: Mutations */}
      <motion.div
        className="rounded-2xl p-5 md:p-7 border mb-8"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "rgba(245, 166, 35, 0.2)" }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">⚡</span>
          <h3 className="font-bold text-base md:text-lg" style={{ color: "var(--accent-amber)" }}>
            {s3.mechanisms[2].title} <span className="text-xs font-mono opacity-60">({s3.mechanisms[2].titleEn})</span>
          </h3>
        </div>

        <p className="text-sm leading-loose mb-5" style={{ color: "var(--text-secondary)" }}>
          {s3.mechanisms[2].text}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {s3.mechanisms[2].impacts.map((imp) => (
            <div
              key={imp.type}
              className="p-4 rounded-xl border"
              style={{ backgroundColor: "rgba(245, 166, 35, 0.04)", borderColor: "rgba(245, 166, 35, 0.15)" }}
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <h5 className="font-bold text-xs" style={{ color: "var(--text-primary)" }}>
                  {imp.type}
                </h5>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: "rgba(245, 166, 35, 0.15)", color: "var(--accent-amber)" }}>
                  {imp.badge}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {imp.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Embedded Question: أتحقق (صفحة 16) */}
      <div
        className="rounded-xl border overflow-hidden transition-all"
        style={{
          backgroundColor: openCheck ? "rgba(0, 229, 255, 0.05)" : "var(--bg-surface)",
          borderColor: openCheck ? "rgba(0, 229, 255, 0.3)" : "var(--border-subtle)",
        }}
      >
        <button
          onClick={() => setOpenCheck(!openCheck)}
          className="w-full text-right p-4 flex items-start gap-3 hover:bg-white/3 cursor-pointer"
        >
          <span
            className="flex-shrink-0 px-2.5 py-0.5 rounded-md text-[10px] font-bold"
            style={{ backgroundColor: "rgba(0, 229, 255, 0.15)", color: "var(--accent-cyan)" }}
          >
            أتحقق (صفحة 16)
          </span>
          <p className="flex-1 text-sm font-semibold leading-relaxed" style={{ color: "var(--text-primary)" }}>
            {s3.inTextQuestions[0].question}
          </p>
          <motion.span animate={{ rotate: openCheck ? 180 : 0 }} className="text-gray-500 text-sm mt-1">
            ▾
          </motion.span>
        </button>

        <AnimatePresence>
          {openCheck && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="px-4 pb-4 pt-2 border-t" style={{ borderColor: "rgba(0, 229, 255, 0.15)" }}>
                <span className="text-xs font-bold block mb-1" style={{ color: "var(--accent-emerald)" }}>
                  ✓ الإجابة النموذجية:
                </span>
                <p className="text-xs md:text-sm leading-loose whitespace-pre-line" style={{ color: "var(--accent-emerald)" }}>
                  {s3.inTextQuestions[0].answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
