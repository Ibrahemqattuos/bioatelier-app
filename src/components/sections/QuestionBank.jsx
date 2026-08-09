import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper.jsx";

/* ── Answer Reveal Accordion ── */
function AnswerReveal({ question, answer, type, label }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border overflow-hidden mb-3 transition-all"
      style={{
        backgroundColor: open ? "rgba(245, 166, 35, 0.04)" : "var(--bg-surface)",
        borderColor: open ? "rgba(245, 166, 35, 0.25)" : "var(--border-subtle)",
      }}
    >
      {/* Question */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-right p-4 flex items-start gap-3 transition-colors hover:bg-white/3"
      >
        <span
          className="flex-shrink-0 mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-bold"
          style={{
            backgroundColor: type === "أفكر" ? "rgba(0, 229, 255, 0.12)" : "rgba(245, 166, 35, 0.12)",
            color: type === "أفكر" ? "var(--accent-cyan)" : "var(--accent-amber)",
          }}
        >
          {type || label || "سؤال"}
        </span>
        <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
          {question}
        </p>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          className="flex-shrink-0 mt-1 text-gray-500"
        >
          ▾
        </motion.span>
      </button>

      {/* Answer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="px-4 pb-4 pt-2 border-t"
              style={{ borderColor: "rgba(245, 166, 35, 0.15)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold" style={{ color: "var(--accent-emerald)" }}>
                  ✓ الإجابة النموذجية
                </span>
              </div>
              <p
                className="text-sm leading-loose whitespace-pre-line"
                style={{ color: "var(--accent-emerald)", opacity: 0.9 }}
              >
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── MCQ Question Component ── */
function MCQQuestion({ question, options, correctIndex, correctAnswer }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (idx) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
  };

  return (
    <div
      className="rounded-xl border p-4 mb-3"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <p className="text-sm leading-relaxed mb-3 font-semibold" style={{ color: "var(--text-primary)" }}>
        {question}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt, idx) => {
          const isCorrect = idx === correctIndex;
          const isSelected = idx === selected;

          let bg = "rgba(255,255,255,0.04)";
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
              className="text-right p-3 rounded-lg border text-xs transition-all"
              style={{ backgroundColor: bg, borderColor: border, color }}
            >
              {opt}
              {revealed && isCorrect && <span className="mr-2">✓</span>}
              {revealed && isSelected && !isCorrect && <span className="mr-2">✕</span>}
            </button>
          );
        })}
      </div>
      {revealed && (
        <motion.p
          className="mt-2 text-xs"
          style={{ color: "var(--accent-emerald)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          الإجابة الصحيحة: {correctAnswer}
        </motion.p>
      )}
    </div>
  );
}

/* ── Complex Question with Sub-questions ── */
function ComplexQuestion({ intro, subQuestions }) {
  return (
    <div
      className="rounded-xl border p-4 mb-3"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "rgba(245, 166, 35, 0.15)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="px-2 py-0.5 rounded-md text-[10px] font-bold"
          style={{ backgroundColor: "rgba(245, 166, 35, 0.12)", color: "var(--accent-amber)" }}
        >
          سؤال تحليلي
        </span>
      </div>
      <p className="text-sm leading-loose mb-4" style={{ color: "var(--text-primary)" }}>
        {intro}
      </p>
      <div className="space-y-2 pr-3 border-r-2" style={{ borderColor: "rgba(245, 166, 35, 0.2)" }}>
        {subQuestions.map((sq) => (
          <AnswerReveal key={sq.id} question={sq.question} answer={sq.answer} type="فرعي" />
        ))}
      </div>
    </div>
  );
}

/* ── Main QuestionBank Component ── */
export default function QuestionBank({ data }) {
  const qb = data.questionBank;

  return (
    <SectionWrapper
      id="question-bank"
      title="بنك الأسئلة التفاعلي"
      icon="❓"
      accent="var(--accent-amber)"
    >
      {/* Section A: In-lesson questions */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ backgroundColor: "rgba(0, 229, 255, 0.08)", color: "var(--accent-cyan)" }}
          >
            أسئلة أتحقق وأفكر أثناء الدرس
          </span>
        </div>
        {qb.inLesson.map((q) => (
          <AnswerReveal key={q.id} question={q.question} answer={q.answer} type={q.type} />
        ))}
      </div>

      {/* Section B: Lesson Review p16 */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ backgroundColor: "rgba(245, 166, 35, 0.08)", color: "var(--accent-amber)" }}
          >
            مراجعة الدرس: تطور الكائنات الحية (صفحة 16)
          </span>
        </div>
        {qb.lessonReview.map((q) =>
          q.isComplex ? (
            <ComplexQuestion key={q.id} intro={q.intro} subQuestions={q.subQuestions} />
          ) : (
            <AnswerReveal key={q.id} question={q.question} answer={q.answer} label={q.label} />
          )
        )}
      </div>

      {/* Section C: Unit Review p18 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ backgroundColor: "rgba(245, 166, 35, 0.12)", color: "var(--accent-amber)" }}
          >
            مراجعة الوحدة الأولى: نظرية التطور (صفحة 18)
          </span>
        </div>

        {/* MCQ */}
        <div className="mb-6">
          <p className="text-xs font-bold mb-3" style={{ color: "var(--text-secondary)" }}>
            السؤال الأول: لكلِّ فقرةٍ أربعُ إجاباتٍ، واحدةٌ فقطْ صحيحةٌ:
          </p>
          {qb.unitReview.mcq.map((q) => (
            <MCQQuestion
              key={q.id}
              question={q.question}
              options={q.options}
              correctIndex={q.correctIndex}
              correctAnswer={q.correctAnswer}
            />
          ))}
        </div>

        {/* Subjective */}
        <div className="mb-6">
          <p className="text-xs font-bold mb-3" style={{ color: "var(--text-secondary)" }}>
            أسئلة مقالية:
          </p>
          {qb.unitReview.subjective.map((q) => (
            <AnswerReveal key={q.id} question={q.question} answer={q.answer} label={q.number} />
          ))}
        </div>

        {/* Beetle analysis question */}
        <ComplexQuestion
          intro={qb.unitReview.beetleQuestion.intro}
          subQuestions={qb.unitReview.beetleQuestion.subQuestions}
        />
      </div>
    </SectionWrapper>
  );
}
