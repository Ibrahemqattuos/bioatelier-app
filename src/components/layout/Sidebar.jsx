import { motion, AnimatePresence } from "framer-motion";
import { getCurriculumTree } from "../../data/lessons/index.js";
import { FiChevronDown, FiBookOpen, FiX, FiLock } from "react-icons/fi";
import { useState } from "react";

export default function Sidebar({ open, activeLesson, onSelectLesson, onClose }) {
  const units = getCurriculumTree();

  // Expand all units that have the active lesson, or first unit by default
  const [expandedUnits, setExpandedUnits] = useState(() => {
    const initial = {};
    units.forEach((u) => {
      const hasActive = u.lessons.some((l) => l.id === activeLesson);
      initial[u.id] = hasActive || u.id === 1;
    });
    return initial;
  });

  const toggleUnit = (unitId) =>
    setExpandedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-16 right-0 bottom-0 z-40 w-72 backdrop-blur-xl border-l overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "translate-x-full"
        } lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]`}
        style={{
          backgroundColor: "rgba(18, 12, 10, 0.95)",
          borderColor: "var(--border-subtle)",
        }}
      >
        {/* Close button (mobile) */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-3 left-3 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="إغلاق القائمة"
        >
          <FiX className="w-5 h-5 text-gray-400" />
        </button>

        <div className="p-5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-2">
            <FiBookOpen className="w-4 h-4" style={{ color: "var(--accent-cyan)" }} />
            <span>شجرة المنهاج المدرسي</span>
          </h3>

          {units.map((unit) => {
            const isUnitActive = unit.lessons.some((l) => l.id === activeLesson);
            const isFuture = unit.lessons.length === 0;

            return (
              <div key={unit.id} className="mb-4">
                {/* Unit header */}
                <button
                  onClick={() => !isFuture && toggleUnit(unit.id)}
                  className={`flex items-center justify-between w-full p-2.5 rounded-xl transition-colors text-xs font-bold ${
                    isFuture
                      ? "opacity-40 cursor-default"
                      : "hover:bg-white/8 cursor-pointer"
                  }`}
                  style={{
                    backgroundColor: isUnitActive ? "rgba(0, 229, 255, 0.08)" : "rgba(255,255,255,0.04)",
                    color: isUnitActive ? "var(--accent-cyan)" : "var(--text-secondary)",
                    borderLeft: isUnitActive ? "2px solid var(--accent-cyan)" : "2px solid transparent",
                  }}
                  disabled={isFuture}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{unit.icon}</span>
                    <span className="text-right leading-tight">{unit.title}</span>
                  </span>
                  {isFuture ? (
                    <FiLock className="w-3.5 h-3.5 opacity-50" />
                  ) : (
                    <motion.span
                      animate={{ rotate: expandedUnits[unit.id] ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiChevronDown className="w-4 h-4" />
                    </motion.span>
                  )}
                </button>

                {/* Lessons list */}
                <AnimatePresence>
                  {expandedUnits[unit.id] && !isFuture && (
                    <motion.ul
                      className="mt-2 space-y-1 pr-3"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {unit.lessons.map((lesson, idx) => {
                        const isActive = lesson.id === activeLesson;
                        const isAvailable = lesson.available;

                        return (
                          <motion.li key={lesson.id} whileTap={isAvailable ? { scale: 0.97 } : {}}>
                            <button
                              onClick={() => {
                                if (isAvailable) {
                                  onSelectLesson(lesson.id);
                                  onClose();
                                }
                              }}
                              disabled={!isAvailable}
                              className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs transition-all ${
                                isActive
                                  ? "font-bold shadow-lg"
                                  : isAvailable
                                  ? "hover:bg-white/5"
                                  : "opacity-40 cursor-default"
                              }`}
                              style={
                                isActive
                                  ? {
                                      backgroundColor: "rgba(16, 185, 129, 0.12)",
                                      color: "var(--accent-emerald)",
                                      border: "1px solid rgba(16, 185, 129, 0.3)",
                                      boxShadow: "0 4px 15px rgba(16, 185, 129, 0.1)",
                                    }
                                  : { color: isAvailable ? "var(--text-secondary)" : "var(--text-secondary)" }
                              }
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{
                                  backgroundColor: isActive
                                    ? "var(--accent-emerald)"
                                    : isAvailable
                                    ? "var(--accent-cyan)"
                                    : "#555",
                                }}
                              />
                              <span>
                                الدرس {idx + 1 === 1 ? "الأول" : "الثاني"}: {lesson.title}
                              </span>
                              {!isAvailable && (
                                <span className="mr-auto text-[10px] opacity-60 font-normal">(قريباً)</span>
                              )}
                            </button>
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Future placeholder */}
          <div className="mt-2 p-2.5 rounded-xl text-xs opacity-30 flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
            <FiLock className="w-3.5 h-3.5" />
            <span>الوحدة الثالثة: تصنيف الكائنات الحية (قريباً)</span>
          </div>
        </div>

        {/* Bottom branding */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t text-center" style={{ borderColor: "var(--border-subtle)", backgroundColor: "rgba(0,0,0,0.2)" }}>
          <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
            أكاديمية الأحياء التفاعلية
            <br />
            <span className="font-mono" style={{ color: "var(--accent-cyan)", opacity: 0.8 }}>BioAtelier ✦ الصف العاشر</span>
          </p>
        </div>
      </motion.aside>
    </>
  );
}
