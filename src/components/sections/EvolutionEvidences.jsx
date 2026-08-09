import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper.jsx";

/* ── Forelimb Limb SVG Diagram ── */
function ForelimbDiagram({ activeOrganism }) {
  const organisms = {
    bat: { name: "الخفاش", role: "طيران", color: "#00e5ff" },
    dolphin: { name: "الدلفين", role: "سباحة وتجديف", color: "#10b981" },
    cat: { name: "القط", role: "مشي وجري وصيد", color: "#f5a623" },
    human: { name: "الإنسان", role: "إمساك ومهام دقيقة", color: "#a855f7" },
  };

  const org = organisms[activeOrganism] || organisms.bat;

  return (
    <div className="p-4 rounded-xl border" style={{ backgroundColor: "rgba(0,0,0,0.2)", borderColor: "var(--border-subtle)" }}>
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="font-bold" style={{ color: org.color }}>
          الطرف الأمامي لـ: {org.name} ({org.role})
        </span>
        <span className="text-[10px] opacity-60">عظام متناظرة ذات أصل بنائي مشترك</span>
      </div>

      <svg viewBox="0 0 360 120" className="w-full max-w-sm mx-auto">
        {/* Humerus (عضد) */}
        <rect x="20" y="45" width="60" height="25" rx="8" fill="rgba(0, 229, 255, 0.4)" stroke="#00e5ff" strokeWidth="1.5" />
        <text x="50" y="61" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="Cairo">العضد</text>

        {/* Joint */}
        <circle cx="85" cy="57.5" r="4" fill="#fff" opacity="0.6" />

        {/* Radius & Ulna (ساعد) */}
        <rect x="95" y="40" width="70" height="15" rx="5" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" strokeWidth="1.5" />
        <rect x="95" y="60" width="70" height="15" rx="5" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" strokeWidth="1.5" />
        <text x="130" y="59" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="Cairo">الساعد (كعبرة وزند)</text>

        {/* Carpals (رسغ) */}
        <rect x="175" y="42" width="30" height="32" rx="4" fill="rgba(245, 166, 35, 0.4)" stroke="#f5a623" strokeWidth="1.5" />
        <text x="190" y="60" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="Cairo">الرسغ</text>

        {/* Metacarpals & Phalanges (أمشاط وأصابع) */}
        {activeOrganism === "bat" ? (
          /* Extended wing fingers */
          <g>
            <path d="M210 45 L340 25" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M210 52 L340 45" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M210 62 L340 70" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M210 70 L330 95" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" />
            <text x="280" y="110" textAnchor="middle" fill="var(--accent-cyan)" fontSize="8" fontFamily="Cairo">أصابع ممتدة تدعم الغشاء الجلدي</text>
          </g>
        ) : activeOrganism === "dolphin" ? (
          /* Paddle fin */
          <g>
            <path d="M210 42 C240 40, 270 50, 310 58 C270 66, 240 76, 210 74 Z" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="1.5" />
            <text x="260" y="95" textAnchor="middle" fill="var(--accent-emerald)" fontSize="8" fontFamily="Cairo">أصابع متقاربة بشكل مجداف للسباحة</text>
          </g>
        ) : (
          /* Cat or Human fingers */
          <g>
            <line x1="210" y1="46" x2="270" y2="40" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="210" y1="52" x2="275" y2="50" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="210" y1="60" x2="275" y2="62" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="210" y1="68" x2="270" y2="74" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round" />
            <text x="250" y="95" textAnchor="middle" fill="var(--accent-amber)" fontSize="8" fontFamily="Cairo">أمشاط وأصابع متمفصلة</text>
          </g>
        )}
      </svg>
    </div>
  );
}

export default function EvolutionEvidences({ data }) {
  const s2 = data.section2;
  const [activeEvidence, setActiveEvidence] = useState("comparative-anatomy");
  const [activeOrganism, setActiveOrganism] = useState("bat");
  const [openCheck, setOpenCheck] = useState(false);

  return (
    <SectionWrapper
      id="section2"
      title="2. أدلة على حدوث تطور للكائنات الحية"
      icon="🦴"
      accent="var(--accent-emerald)"
    >
      <div className="mb-6">
        <span
          className="px-3 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: "rgba(16, 185, 129, 0.12)", color: "var(--accent-emerald)" }}
        >
          الأدلة الثلاثة المقترحة — {s2.pageRange}
        </span>
      </div>

      {/* Tabs for 3 Evidences */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {s2.evidences.map((ev) => {
          const isActive = ev.id === activeEvidence;
          return (
            <button
              key={ev.id}
              onClick={() => setActiveEvidence(ev.id)}
              className="p-4 rounded-xl border text-right transition-all cursor-pointer"
              style={{
                backgroundColor: isActive ? "rgba(16, 185, 129, 0.12)" : "var(--bg-surface)",
                borderColor: isActive ? "var(--accent-emerald)" : "var(--border-subtle)",
                boxShadow: isActive ? "0 0 20px rgba(16, 185, 129, 0.15)" : "none",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{ev.icon}</span>
                <h4 className="font-bold text-sm" style={{ color: isActive ? "var(--accent-emerald)" : "var(--text-primary)" }}>
                  {ev.title}
                </h4>
              </div>
              <p className="text-[11px] font-mono opacity-60" style={{ color: "var(--accent-cyan)" }}>
                {ev.titleEn}
              </p>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <AnimatePresence mode="wait">
        {activeEvidence === "comparative-anatomy" && (
          <motion.div
            key="comp"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="rounded-2xl p-5 md:p-7 border mb-8"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "rgba(16, 185, 129, 0.2)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🦴</span>
              <h3 className="font-bold text-base" style={{ color: "var(--accent-emerald)" }}>
                علم التشريح المقارن (Comparative Anatomy)
              </h3>
            </div>
            <p className="text-sm leading-loose mb-6" style={{ color: "var(--text-secondary)" }}>
              {s2.evidences[0].text}
            </p>

            {/* Interactive Figure 3: Forelimb switch */}
            <div className="rounded-xl border p-4 mb-4" style={{ backgroundColor: "rgba(16, 185, 129, 0.04)", borderColor: "rgba(16, 185, 129, 0.15)" }}>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <span className="text-xs font-bold" style={{ color: "var(--accent-emerald)" }}>
                  {s2.evidences[0].figure}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: "bat", label: "الخفاش" },
                    { id: "dolphin", label: "الدلفين" },
                    { id: "cat", label: "القط" },
                    { id: "human", label: "الإنسان" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setActiveOrganism(btn.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeOrganism === btn.id
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-white/5 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              <ForelimbDiagram activeOrganism={activeOrganism} />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                {s2.evidences[0].examples.map((ex) => (
                  <div
                    key={ex.name}
                    className="p-2.5 rounded-lg border text-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.2)", borderColor: "var(--border-subtle)" }}
                  >
                    <p className="text-xs font-bold mb-1" style={{ color: "var(--text-primary)" }}>{ex.name}</p>
                    <p className="text-[10px] leading-tight opacity-70 mb-1" style={{ color: "var(--accent-cyan)" }}>{ex.function}</p>
                    <p className="text-[9px] opacity-50">{ex.bones}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeEvidence === "fossil-record" && (
          <motion.div
            key="fossil"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="rounded-2xl p-5 md:p-7 border mb-8"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "rgba(0, 229, 255, 0.2)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🪨</span>
              <h3 className="font-bold text-base" style={{ color: "var(--accent-cyan)" }}>
                السجل الأحفوري (Fossil Record)
              </h3>
            </div>
            <p className="text-sm leading-loose mb-6" style={{ color: "var(--text-secondary)" }}>
              {s2.evidences[1].text}
            </p>

            {/* Figure 4 visual cards */}
            <div className="rounded-xl border p-4" style={{ backgroundColor: "rgba(0, 229, 255, 0.04)", borderColor: "rgba(0, 229, 255, 0.15)" }}>
              <span className="text-xs font-bold block mb-3" style={{ color: "var(--accent-cyan)" }}>
                {s2.evidences[1].figure}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {s2.evidences[1].examples.map((item, idx) => (
                  <div
                    key={item.organism}
                    className="p-3.5 rounded-xl border text-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.3)", borderColor: "var(--border-subtle)" }}
                  >
                    <span className="text-2xl block mb-2">{idx === 0 ? "🦌" : idx === 1 ? "🐋" : "🐕"}</span>
                    <h5 className="font-bold text-xs mb-1" style={{ color: "var(--text-primary)" }}>
                      {item.organism}
                    </h5>
                    <p className="text-[11px] leading-relaxed opacity-80" style={{ color: "var(--accent-cyan)" }}>
                      {item.feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeEvidence === "molecular-biology" && (
          <motion.div
            key="molec"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="rounded-2xl p-5 md:p-7 border mb-8"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "rgba(245, 166, 35, 0.2)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🧬</span>
              <h3 className="font-bold text-base" style={{ color: "var(--accent-amber)" }}>
                البيولوجيا الجزيئية (Molecular Biology)
              </h3>
            </div>
            <p className="text-sm leading-loose mb-6" style={{ color: "var(--text-secondary)" }}>
              {s2.evidences[2].text}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {s2.evidences[2].details.map((d) => (
                <div
                  key={d.title}
                  className="p-4 rounded-xl border"
                  style={{ backgroundColor: "rgba(245, 166, 35, 0.04)", borderColor: "rgba(245, 166, 35, 0.15)" }}
                >
                  <h5 className="font-bold text-xs mb-2" style={{ color: "var(--accent-amber)" }}>
                    {d.title}
                  </h5>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded Question: أتحقق (صفحة 14) */}
      <div
        className="rounded-xl border overflow-hidden transition-all"
        style={{
          backgroundColor: openCheck ? "rgba(245, 166, 35, 0.05)" : "var(--bg-surface)",
          borderColor: openCheck ? "rgba(245, 166, 35, 0.3)" : "var(--border-subtle)",
        }}
      >
        <button
          onClick={() => setOpenCheck(!openCheck)}
          className="w-full text-right p-4 flex items-start gap-3 hover:bg-white/3 cursor-pointer"
        >
          <span
            className="flex-shrink-0 px-2.5 py-0.5 rounded-md text-[10px] font-bold"
            style={{ backgroundColor: "rgba(245, 166, 35, 0.15)", color: "var(--accent-amber)" }}
          >
            أتحقق (صفحة 14)
          </span>
          <p className="flex-1 text-sm font-semibold leading-relaxed" style={{ color: "var(--text-primary)" }}>
            {s2.inTextQuestions[0].question}
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
              <div className="px-4 pb-4 pt-2 border-t" style={{ borderColor: "rgba(245, 166, 35, 0.15)" }}>
                <span className="text-xs font-bold block mb-1" style={{ color: "var(--accent-emerald)" }}>
                  ✓ الإجابة النموذجية:
                </span>
                <p className="text-xs md:text-sm leading-loose whitespace-pre-line" style={{ color: "var(--accent-emerald)" }}>
                  {s2.inTextQuestions[0].answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
