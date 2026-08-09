import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper.jsx";

/* ── Peppered Moth Chart & Visualizer ── */
function PepperedMothStudy({ studyData }) {
  const [selectedYear, setSelectedYear] = useState("1802");

  const is1802 = selectedYear === "1802";
  const whitePct = is1802 ? 85 : 18;
  const blackPct = is1802 ? 15 : 82;

  return (
    <div
      className="rounded-2xl border p-5 md:p-6 mb-6"
      style={{ backgroundColor: "rgba(245, 166, 35, 0.04)", borderColor: "rgba(245, 166, 35, 0.2)" }}
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="text-xs md:text-sm font-bold" style={{ color: "var(--accent-amber)" }}>
          {studyData.label}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedYear("1802")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              is1802 ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            عام 1802 (قبل التلوث)
          </button>
          <button
            onClick={() => setSelectedYear("1902")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              !is1802 ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            عام 1902 (بعد التلوث والثورة الصناعية)
          </button>
        </div>
      </div>

      <p className="text-xs md:text-sm leading-loose mb-5" style={{ color: "var(--text-secondary)" }}>
        {studyData.intro}
      </p>

      {/* Simulated Tree Bark & Moth Camouflage */}
      <div
        className="rounded-xl p-4 mb-5 border text-center transition-all duration-500"
        style={{
          backgroundColor: is1802 ? "rgba(139, 115, 85, 0.25)" : "rgba(30, 25, 25, 0.75)",
          borderColor: is1802 ? "rgba(139, 115, 85, 0.5)" : "rgba(100, 100, 100, 0.4)",
        }}
      >
        <p className="text-xs font-bold mb-3" style={{ color: is1802 ? "#fbbf24" : "#9ca3af" }}>
          {is1802
            ? "🌲 جذوع أشجار فاتحة ونظيفة (العث الأبيض متخفٍّ والأسود بارز ومفترس)"
            : "🏭 جذوع أشجار مغطاة بالسخام الأسود (العث الأسود متخفٍّ والأبيض بارز ومفترس)"}
        </p>

        {/* Moth Population Display */}
        <div className="flex items-center justify-around flex-wrap gap-4 py-2">
          {/* White Moth Card */}
          <div className="p-3 rounded-lg bg-black/40 border border-white/10 min-w-[130px]">
            <div className="text-2xl mb-1">🦋 ⚪</div>
            <p className="text-xs font-bold text-gray-200">عث أبيض الجسم</p>
            <p className="text-sm font-mono font-bold mt-1" style={{ color: "var(--accent-cyan)" }}>
              {whitePct}%
            </p>
          </div>

          {/* Black Moth Card */}
          <div className="p-3 rounded-lg bg-black/40 border border-white/10 min-w-[130px]">
            <div className="text-2xl mb-1">🦋 ⚫</div>
            <p className="text-xs font-bold text-gray-200">عث أسود الجسم</p>
            <p className="text-sm font-mono font-bold mt-1" style={{ color: "var(--accent-amber)" }}>
              {blackPct}%
            </p>
          </div>
        </div>

        {/* Percentage Comparison Bars */}
        <div className="mt-4 max-w-md mx-auto space-y-2">
          <div>
            <div className="flex justify-between text-[11px] mb-1 font-semibold">
              <span>العث الأبيض</span>
              <span className="font-mono">{whitePct}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${whitePct}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1 font-semibold">
              <span>العث الأسود</span>
              <span className="font-mono">{blackPct}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-amber-400"
                initial={{ width: 0 }}
                animate={{ width: `${blackPct}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Sub-questions */}
      <div className="space-y-3">
        <p className="text-xs font-bold mb-2" style={{ color: "var(--accent-amber)" }}>
          فروع السؤال الرابع (أ، ب، ج، د):
        </p>
        {studyData.subQuestions.map((sq) => (
          <SubQuestionCard key={sq.id} branch={sq.branch} question={sq.question} answer={sq.answer} />
        ))}
      </div>
    </div>
  );
}

function SubQuestionCard({ branch, question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border overflow-hidden transition-all"
      style={{
        backgroundColor: open ? "rgba(245, 166, 35, 0.04)" : "var(--bg-surface)",
        borderColor: open ? "rgba(245, 166, 35, 0.25)" : "var(--border-subtle)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-right p-3.5 flex items-start gap-3 hover:bg-white/3 cursor-pointer"
      >
        <span
          className="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold"
          style={{ backgroundColor: "rgba(245, 166, 35, 0.15)", color: "var(--accent-amber)" }}
        >
          {branch}
        </span>
        <p className="flex-1 text-xs md:text-sm font-semibold leading-relaxed" style={{ color: "var(--text-primary)" }}>
          {question}
        </p>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-gray-500 text-xs mt-1">
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="px-4 pb-3.5 pt-1 border-t" style={{ borderColor: "rgba(245, 166, 35, 0.15)" }}>
              <span className="text-[11px] font-bold block mb-1" style={{ color: "var(--accent-emerald)" }}>
                ✓ الإجابة النموذجية:
              </span>
              <p className="text-xs leading-loose whitespace-pre-line" style={{ color: "var(--accent-emerald)" }}>
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReviewCard({ label, question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border overflow-hidden transition-all mb-3.5"
      style={{
        backgroundColor: open ? "rgba(0, 229, 255, 0.04)" : "var(--bg-surface)",
        borderColor: open ? "rgba(0, 229, 255, 0.25)" : "var(--border-subtle)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-right p-4 flex items-start gap-3 hover:bg-white/3 cursor-pointer"
      >
        <span
          className="flex-shrink-0 px-2.5 py-0.5 rounded text-[10px] font-bold"
          style={{ backgroundColor: "rgba(0, 229, 255, 0.12)", color: "var(--accent-cyan)" }}
        >
          {label}
        </span>
        <p className="flex-1 text-sm font-semibold leading-relaxed" style={{ color: "var(--text-primary)" }}>
          {question}
        </p>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-gray-500 text-sm mt-1">
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="px-4 pb-4 pt-1.5 border-t" style={{ borderColor: "rgba(0, 229, 255, 0.15)" }}>
              <span className="text-xs font-bold block mb-1" style={{ color: "var(--accent-emerald)" }}>
                ✓ الإجابة النموذجية:
              </span>
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

export default function Lesson1Review({ data }) {
  const s4 = data.section4;

  return (
    <SectionWrapper
      id="section4"
      title="4. مراجعة الدرس الأول (تطور الكائنات الحية)"
      icon="📝"
      accent="var(--accent-amber)"
    >
      <div className="mb-6">
        <span
          className="px-3 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: "rgba(245, 166, 35, 0.12)", color: "var(--accent-amber)" }}
        >
          أسئلة {s4.page} من الكتاب المدرسي
        </span>
      </div>

      {/* Questions 1, 2, 3 */}
      {s4.questions.slice(0, 3).map((q) => (
        <ReviewCard key={q.id} label={q.label} question={q.question} answer={q.answer} />
      ))}

      {/* Question 4: Peppered Moth Study */}
      {s4.questions[3] && <PepperedMothStudy studyData={s4.questions[3]} />}
    </SectionWrapper>
  );
}
