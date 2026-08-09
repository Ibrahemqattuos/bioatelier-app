import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "../ui/SectionWrapper.jsx";
import { FiCheckCircle, FiXCircle, FiAward } from "react-icons/fi";

export default function QuizCenter({ data }) {
  if (!data) return null;
  const { quiz } = data;
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState({});

  const question = quiz[currentQ];
  const totalQuestions = quiz.length;

  const handleAnswer = (qId, optIndex) => {
    if (submitted[qId]) return;
    setAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmit = () => {
    setSubmitted((prev) => ({ ...prev, [question.id]: true }));
  };

  const handleNext = () => {
    if (currentQ < totalQuestions - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setAnswers({});
    setSubmitted({});
    setShowResult(false);
  };

  const score = quiz.reduce(
    (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
    0
  );
  const percentage = Math.round((score / totalQuestions) * 100);

  const getMessage = () => {
    if (percentage === 100) return { text: "ممتاز! 🌟 أداء مثالي! أنت عالم أحياء حقيقي!", color: "#10b981" };
    if (percentage >= 75) return { text: "أحسنت! 👏 أداء رائع جداً!", color: "#06b6d4" };
    if (percentage >= 50) return { text: "جيد! 💪 حاول مراجعة الدرس مرة أخرى.", color: "#f59e0b" };
    return { text: "لا بأس! 📚 راجع الدرس وحاول مرة أخرى.", color: "#ef4444" };
  };

  if (showResult) {
    const msg = getMessage();
    return (
      <SectionWrapper
        id="quiz"
        title="مركز الاختبار والمراجعة"
        icon="✅"
        accent="#10b981"
      >
        <motion.div
          className="max-w-lg mx-auto text-center p-8 rounded-3xl bg-white/5 dark:bg-white/5 bg-white border border-white/10 dark:border-white/10 border-gray-200 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: msg.color + "22", border: `3px solid ${msg.color}` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <FiAward className="w-10 h-10" style={{ color: msg.color }} />
          </motion.div>

          <h3 className="text-2xl font-bold text-white dark:text-white text-gray-800 mb-2">
            نتيجتك
          </h3>
          <motion.p
            className="text-5xl font-black mb-4"
            style={{ color: msg.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {percentage}%
          </motion.p>
          <p className="text-sm text-gray-400 dark:text-gray-400 text-gray-600 mb-2">
            {score} من {totalQuestions} إجابات صحيحة
          </p>
          <p className="text-base font-semibold mb-6" style={{ color: msg.color }}>
            {msg.text}
          </p>

          {/* Answer review */}
          <div className="space-y-3 text-right mb-6">
            {quiz.map((q, i) => {
              const userAns = answers[q.id];
              const correct = userAns === q.correctIndex;
              return (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-sm ${
                    correct
                      ? "border-emerald-500/30 bg-emerald-500/10"
                      : "border-red-500/30 bg-red-500/10"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {correct ? (
                      <FiCheckCircle className="text-emerald-400 shrink-0" />
                    ) : (
                      <FiXCircle className="text-red-400 shrink-0" />
                    )}
                    <span className="font-semibold text-gray-200 dark:text-gray-200 text-gray-700">
                      س{i + 1}: {q.question}
                    </span>
                  </div>
                  {!correct && (
                    <p className="text-xs text-gray-400 dark:text-gray-400 text-gray-500 mr-6">
                      الإجابة الصحيحة: {q.options[q.correctIndex]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleReset}
            className="px-8 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500/30 transition-all border border-emerald-500/30"
          >
            إعادة الاختبار 🔄
          </button>
        </motion.div>
      </SectionWrapper>
    );
  }

  const isAnswered = answers[question.id] !== undefined;
  const isSubmitted = submitted[question.id];
  const userAnswer = answers[question.id];
  const isCorrect = userAnswer === question.correctIndex;

  return (
    <SectionWrapper
      id="quiz"
      title="مركز الاختبار والمراجعة"
      icon="✅"
      accent="#10b981"
    >
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6 max-w-lg mx-auto">
        {quiz.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/10 dark:bg-white/10 bg-gray-200">
            <motion.div
              className="h-full rounded-full bg-emerald-500"
              initial={{ width: "0%" }}
              animate={{ width: i <= currentQ ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-500 mb-6">
        السؤال {currentQ + 1} من {totalQuestions}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          className="max-w-2xl mx-auto p-6 rounded-2xl bg-white/5 dark:bg-white/5 bg-white border border-white/10 dark:border-white/10 border-gray-200 backdrop-blur-sm"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          {/* Question */}
          <h4 className="text-base font-bold text-white dark:text-white text-gray-800 mb-5 leading-relaxed">
            {question.question}
          </h4>

          {/* Options */}
          <div className="space-y-3 mb-5">
            {question.options.map((opt, i) => {
              let classes =
                "w-full text-right p-4 rounded-xl border text-sm transition-all ";
              if (isSubmitted) {
                if (i === question.correctIndex) {
                  classes +=
                    "border-emerald-500/50 bg-emerald-500/15 text-emerald-300 dark:text-emerald-300 text-emerald-700";
                } else if (i === userAnswer && !isCorrect) {
                  classes +=
                    "border-red-500/50 bg-red-500/15 text-red-300 dark:text-red-300 text-red-600";
                } else {
                  classes +=
                    "border-white/5 bg-white/[0.02] text-gray-500 opacity-50";
                }
              } else if (userAnswer === i) {
                classes +=
                  "border-violet-500/50 bg-violet-500/15 text-violet-300 dark:text-violet-300 text-violet-700 shadow-lg";
              } else {
                classes +=
                  "border-white/10 dark:border-white/10 border-gray-200 bg-white/[0.02] dark:bg-white/[0.02] bg-gray-50 text-gray-300 dark:text-gray-300 text-gray-600 hover:bg-white/5 dark:hover:bg-white/5 hover:bg-gray-100 hover:border-white/20 dark:hover:border-white/20 hover:border-gray-300";
              }

              return (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(question.id, i)}
                  className={classes}
                  disabled={isSubmitted}
                  whileTap={!isSubmitted ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                      {["أ", "ب", "ج", "د"][i]}
                    </span>
                    <span>{opt}</span>
                    {isSubmitted && i === question.correctIndex && (
                      <FiCheckCircle className="mr-auto text-emerald-400" />
                    )}
                    {isSubmitted && i === userAnswer && !isCorrect && i !== question.correctIndex && (
                      <FiXCircle className="mr-auto text-red-400" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                className={`p-4 rounded-xl border mb-4 ${
                  isCorrect
                    ? "border-emerald-500/30 bg-emerald-500/10"
                    : "border-red-500/30 bg-red-500/10"
                }`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <>
                      <FiCheckCircle className="text-emerald-400" />
                      <span className="text-sm font-bold text-emerald-400">
                        إجابة صحيحة! 🎉
                      </span>
                    </>
                  ) : (
                    <>
                      <FiXCircle className="text-red-400" />
                      <span className="text-sm font-bold text-red-400">
                        إجابة خاطئة
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-300 dark:text-gray-300 text-gray-600 leading-relaxed">
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3">
            {!isSubmitted && (
              <button
                onClick={handleSubmit}
                disabled={!isAnswered}
                className="px-6 py-2.5 rounded-xl bg-violet-500/20 text-violet-400 font-bold hover:bg-violet-500/30 transition-all border border-violet-500/30 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                تحقق ✓
              </button>
            )}
            {isSubmitted && (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500/30 transition-all border border-emerald-500/30"
              >
                {currentQ < totalQuestions - 1 ? "السؤال التالي ←" : "عرض النتيجة 🏆"}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
