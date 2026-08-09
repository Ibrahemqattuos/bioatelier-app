import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper.jsx";

/* ── MCQ Interactive Question ── */
function MCQCard({ item }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (idx) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
  };

  return (
    <div
      className="rounded-xl border p-4 mb-4"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <p className="text-xs md:text-sm font-semibold mb-3 leading-relaxed" style={{ color: "var(--text-primary)" }}>
        {item.question}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {item.options.map((opt, idx) => {
          const isCorrect = idx === item.correctIndex;
          const isSelected = idx === selected;

          let bg = "rgba(255,255,255,0.03)";
          let border = "var(--border-subtle)";
          let color = "var(--text-secondary)";

          if (revealed) {
            if (isCorrect) {
              bg = "rgba(16, 185, 129, 0.12)";
              border = "rgba(16, 185, 129, 0.4)";
              color = "var(--accent-emerald)";
            } else if (isSelected && !isCorrect) {
              bg = "rgba(239, 68, 68, 0.12)";
              border = "rgba(239, 68, 68, 0.4)";
              color = "#ef4444";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className="text-right p-3 rounded-lg border text-xs transition-all cursor-pointer"
              style={{ backgroundColor: bg, borderColor: border, color }}
            >
              {opt}
              {revealed && isCorrect && <span className="mr-2 font-bold">✓ (صحيح)</span>}
              {revealed && isSelected && !isCorrect && <span className="mr-2 font-bold">✕ (خطأ)</span>}
            </button>
          );
        })}
      </div>

      {revealed && (
        <motion.div
          className="mt-3 p-2.5 rounded-lg border text-xs"
          style={{ backgroundColor: "rgba(16, 185, 129, 0.06)", borderColor: "rgba(16, 185, 129, 0.2)" }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="font-bold" style={{ color: "var(--accent-emerald)" }}>
            الإجابة الصحيحة: {item.correctOption}
          </span>
          <p className="mt-1 opacity-80" style={{ color: "var(--text-secondary)" }}>
            {item.explanation}
          </p>
        </motion.div>
      )}
    </div>
  );
}

/* ── Subjective Question with Reveal ── */
function SubjectiveCard({ number, question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border overflow-hidden transition-all mb-3.5"
      style={{
        backgroundColor: open ? "rgba(245, 166, 35, 0.04)" : "var(--bg-surface)",
        borderColor: open ? "rgba(245, 166, 35, 0.25)" : "var(--border-subtle)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-right p-4 flex items-start gap-3 hover:bg-white/3 cursor-pointer"
      >
        <span
          className="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold"
          style={{ backgroundColor: "rgba(245, 166, 35, 0.15)", color: "var(--accent-amber)" }}
        >
          {number}
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
            <div className="px-4 pb-4 pt-1.5 border-t" style={{ borderColor: "rgba(245, 166, 35, 0.15)" }}>
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

/* ── Illustrated Beetle Study (Question 6) ── */
function BeetleStudyComponent({ beetleData }) {
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  return (
    <div
      className="rounded-2xl border p-5 md:p-6 mb-6"
      style={{ backgroundColor: "rgba(16, 185, 129, 0.04)", borderColor: "rgba(16, 185, 129, 0.2)" }}
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="text-xs md:text-sm font-bold" style={{ color: "var(--accent-emerald)" }}>
          {beetleData.number}
        </span>
      </div>

      <p className="text-xs md:text-sm leading-loose mb-4" style={{ color: "var(--text-secondary)" }}>
        {beetleData.intro}
      </p>

      {/* 4 Stages Stepper (أ، ب، ج، د) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {beetleData.stages.map((stg, i) => (
          <button
            key={i}
            onClick={() => setActiveStageIdx(i)}
            className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
              activeStageIdx === i
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            <span className="text-xs font-bold block mb-0.5">{stg.label}</span>
            <span className="text-[10px] line-clamp-2 opacity-70">{stg.desc}</span>
          </button>
        ))}
      </div>

      {/* Visual Simulation of Selected Beetle Stage */}
      <div
        className="rounded-xl p-4 mb-5 border text-center"
        style={{ backgroundColor: "rgba(0, 50, 20, 0.3)", borderColor: "rgba(16, 185, 129, 0.2)" }}
      >
        <p className="text-xs font-bold mb-3" style={{ color: "var(--accent-emerald)" }}>
          {beetleData.stages[activeStageIdx].label}: {beetleData.stages[activeStageIdx].desc}
        </p>

        {/* Beetle Icons Population */}
        <div className="flex items-center justify-center gap-3 py-2 flex-wrap min-h-[60px]">
          {activeStageIdx === 0 && (
            <>
              {[1, 2, 3, 4].map((i) => (
                <span key={`g-${i}`} className="text-2xl" title="خنفساء خضراء">🪲 🟢</span>
              ))}
              {[1, 2, 3, 4].map((i) => (
                <span key={`r-${i}`} className="text-2xl" title="خنفساء حمراء">🪲 🔴</span>
              ))}
            </>
          )}

          {activeStageIdx === 1 && (
            <>
              {[1, 2, 3, 4].map((i) => (
                <span key={`g-${i}`} className="text-2xl" title="خنفساء خضراء متخفية">🪲 🟢</span>
              ))}
              {[1, 2].map((i) => (
                <span key={`r-${i}`} className="text-2xl" title="خنفساء حمراء مفترسة">🪲 🔴</span>
              ))}
              {[1, 2].map((i) => (
                <span key={`dead-${i}`} className="text-xl opacity-30 relative" title="افتُرست">🪲 ❌</span>
              ))}
            </>
          )}

          {activeStageIdx === 2 && (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={`g-${i}`} className="text-2xl" title="خنفساء خضراء تتكاثر">🪲 🟢</span>
              ))}
              <span className="text-2xl" title="آخر خنفساء حمراء">🪲 🔴</span>
              {[1, 2, 3].map((i) => (
                <span key={`dead-${i}`} className="text-xl opacity-30" title="افتُرست">🪲 ❌</span>
              ))}
            </>
          )}

          {activeStageIdx === 3 && (
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <span key={`g-${i}`} className="text-2xl" title="جميع الخنافس خضراء (100%)">🪲 🟢</span>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Sub-questions for Beetle study */}
      <div className="space-y-3">
        <p className="text-xs font-bold mb-2" style={{ color: "var(--accent-emerald)" }}>
          فروع السؤال السادس:
        </p>
        {beetleData.subQuestions.map((sq) => (
          <SubjectiveCard key={sq.id} number={sq.branch} question={sq.question} answer={sq.answer} />
        ))}
      </div>
    </div>
  );
}

export default function Unit1Review({ data }) {
  const s5 = data.section5;

  return (
    <SectionWrapper
      id="section5"
      title="5. مراجعة الوحدة الأولى (نظرية التطور)"
      icon="🏆"
      accent="var(--accent-cyan)"
    >
      <div className="mb-6">
        <span
          className="px-3 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: "rgba(0, 229, 255, 0.12)", color: "var(--accent-cyan)" }}
        >
          أسئلة {s5.page} الشاملة
        </span>
      </div>

      {/* MCQ Section */}
      <div className="mb-8">
        <h4 className="text-xs md:text-sm font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>
          {s5.mcqSection.title}
        </h4>
        {s5.mcqSection.questions.map((q) => (
          <MCQCard key={q.id} item={q} />
        ))}
      </div>

      {/* Subjective Questions (2, 3, 4, 5) */}
      <div className="mb-8">
        <h4 className="text-xs md:text-sm font-bold mb-4" style={{ color: "var(--accent-amber)" }}>
          الأسئلة التحليلية والمقالية (الأسئلة 2 - 5):
        </h4>
        {s5.subjectiveQuestions.map((q) => (
          <SubjectiveCard key={q.id} number={q.number} question={q.question} answer={q.answer} />
        ))}
      </div>

      {/* Question 6: Beetle Study */}
      {s5.beetleStudy && <BeetleStudyComponent beetleData={s5.beetleStudy} />}
    </SectionWrapper>
  );
}
