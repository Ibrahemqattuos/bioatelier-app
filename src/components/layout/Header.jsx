import { FiSun, FiMoon, FiHelpCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Header({ dark, onToggleTheme, onToggleSidebar }) {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ backgroundColor: "rgba(18, 12, 10, 0.85)", borderColor: "var(--border-subtle)" }}>
        <div className="flex items-center justify-between px-4 md:px-6 h-16">
          {/* Left: hamburger + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors lg:hidden"
              aria-label="فتح القائمة"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>

            <motion.div
              className="flex items-center gap-2 select-none"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl">🧬</span>
              <h1 className="text-lg md:text-xl font-bold">
                <span style={{ color: "var(--accent-cyan)" }}>BioAtelier</span>{" "}
                <span style={{ color: "var(--accent-emerald)" }}>✦</span>
              </h1>
            </motion.div>
          </div>

          {/* Right: controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              onClick={onToggleTheme}
              className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              whileTap={{ scale: 0.9, rotate: 180 }}
              aria-label="تبديل الوضع"
            >
              <AnimatePresence mode="wait">
                {dark ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <FiSun className="w-5 h-5" style={{ color: "var(--accent-amber)" }} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <FiMoon className="w-5 h-5 text-violet-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Help */}
            <motion.button
              onClick={() => setHelpOpen(true)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              whileTap={{ scale: 0.9 }}
              aria-label="مساعدة"
            >
              <FiHelpCircle className="w-5 h-5 text-gray-400" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Help modal */}
      <AnimatePresence>
        {helpOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setHelpOpen(false)} />
            <motion.div
              className="relative rounded-2xl p-6 max-w-md w-full shadow-2xl border"
              style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-subtle)" }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: "var(--accent-cyan)" }}>
                <FiHelpCircle /> دليل الاستخدام
              </h3>
              <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <li>📚 <strong>تصفح الوحدات:</strong> استخدم القائمة الجانبية للتنقل بين الوحدات والدروس.</li>
                <li>🧬 <strong>الوحدة الأولى:</strong> نظرية التطور — محاكاة الانتخاب الطبيعي وأنماط التطور.</li>
                <li>🦠 <strong>الوحدة الثانية:</strong> الفيروسات — عارض ثلاثي الأبعاد ومحاكاة دورات التكاثر.</li>
                <li>❓ <strong>بنك الأسئلة:</strong> انقر على السؤال لإظهار الإجابة النموذجية.</li>
                <li>🎨 <strong>الوضع الداكن:</strong> استخدم زر الشمس/القمر للتبديل بين الأوضاع.</li>
              </ul>
              <button
                onClick={() => setHelpOpen(false)}
                className="mt-5 w-full py-2.5 rounded-xl font-semibold transition-colors"
                style={{ backgroundColor: "rgba(0, 229, 255, 0.15)", color: "var(--accent-cyan)" }}
              >
                فهمت ✓
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
