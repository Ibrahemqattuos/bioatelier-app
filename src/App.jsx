import { useState } from "react";
import Layout from "./components/layout/Layout.jsx";
import { getLessonById } from "./data/lessons/index.js";
import useTheme from "./hooks/useTheme.js";
import { motion } from "framer-motion";

/* ── Evolution modules (Unit 1 — Sequential Pages 10–18) ── */
import EvolutionSection1 from "./components/sections/EvolutionSection1.jsx";
import EvolutionEvidences from "./components/sections/EvolutionEvidences.jsx";
import EvolutionMechanisms from "./components/sections/EvolutionMechanisms.jsx";
import Lesson1Review from "./components/sections/Lesson1Review.jsx";
import Unit1Review from "./components/sections/Unit1Review.jsx";

/* ── Virus modules (Unit 2 — 100% PRESERVED) ── */
import DiscoveryTimeline from "./components/sections/DiscoveryTimeline.jsx";
import Characteristics from "./components/sections/Characteristics.jsx";
import Viewer3D from "./components/sections/Viewer3D.jsx";
import VideoGallery from "./components/sections/VideoGallery.jsx";
import MedicalCards from "./components/sections/MedicalCards.jsx";
import QuizCenter from "./components/sections/QuizCenter.jsx";

/* ── Sequential Quick-Nav Pills ── */
const navPills = {
  evolution: [
    { label: "1. مقدمة ونظريات (ص 10-11)", href: "#section1" },
    { label: "2. أدلة التطور (ص 12-14)", href: "#section2" },
    { label: "3. آليات التطور (ص 15-16)", href: "#section3" },
    { label: "4. مراجعة الدرس الأول (ص 16)", href: "#section4" },
    { label: "5. مراجعة الوحدة الأولى (ص 18)", href: "#section5" },
  ],
  viruses: [
    { label: "محطة الاكتشاف التاريخي", href: "#timeline" },
    { label: "الخصائص العامة", href: "#characteristics" },
    { label: "عارض الأشكال ثلاثي الأبعاد", href: "#viewer3d" },
    { label: "دورات التكاثر (فيديو + خطوات)", href: "#videos" },
    { label: "جدول الأمراض والصحة", href: "#medical" },
    { label: "مركز المراجعة والاختبار", href: "#quiz" },
  ],
};

/* ── Lesson labels ── */
const lessonLabels = {
  evolution: "الدرس الأول",
  viruses: "الدرس الأول",
};

export default function App() {
  const { dark, toggle } = useTheme();
  const [activeLesson, setActiveLesson] = useState("evolution"); // Default to Unit 1
  const lesson = getLessonById(activeLesson);

  if (!lesson) {
    return (
      <Layout dark={dark} onToggleTheme={toggle} activeLesson={activeLesson} onSelectLesson={setActiveLesson}>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500 text-xl">لم يتم العثور على الدرس</p>
        </div>
      </Layout>
    );
  }

  const pills = navPills[activeLesson] || [];

  return (
    <Layout dark={dark} onToggleTheme={toggle} activeLesson={activeLesson} onSelectLesson={setActiveLesson}>
      {/* Hero section */}
      <motion.div
        key={activeLesson}
        className="text-center mb-16 pt-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono mb-3 border"
          style={{
            backgroundColor: "rgba(0, 229, 255, 0.06)",
            color: "var(--accent-cyan)",
            borderColor: "rgba(0, 229, 255, 0.2)",
          }}
        >
          <span>{lesson.unit}</span>
        </div>
        <h1
          className="text-3xl md:text-5xl font-black mb-3"
          style={{
            background: "linear-gradient(to left, var(--accent-emerald), var(--accent-cyan), var(--accent-amber))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {lessonLabels[activeLesson] || "الدرس"}: {lesson.title}
        </h1>
        <p className="text-sm md:text-base font-normal" style={{ color: "var(--text-secondary)" }}>
          {lesson.subtitle}
        </p>

        {/* Sequential Navigation Pills */}
        {pills.length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
            {pills.map((nav, i) => (
              <motion.a
                key={i}
                href={nav.href}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-secondary)",
                }}
                whileHover={{
                  y: -2,
                  backgroundColor: "rgba(0, 229, 255, 0.08)",
                  borderColor: "rgba(0, 229, 255, 0.3)",
                  color: "var(--accent-cyan)",
                }}
                whileTap={{ scale: 0.96 }}
              >
                {nav.label}
              </motion.a>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Lesson Content ── */}
      {activeLesson === "evolution" && (
        <>
          {/* Section 1: مقدمة ونظريات التطور (ص 10 - 11) */}
          <EvolutionSection1 data={lesson} />

          {/* Section 2: أدلة حدوث التطور (ص 12 - 14) */}
          <EvolutionEvidences data={lesson} />

          {/* Section 3: آليات تطور الكائنات الحية (ص 15 - 16) */}
          <EvolutionMechanisms data={lesson} />

          {/* Section 4: مراجعة الدرس الأول (ص 16) */}
          <Lesson1Review data={lesson} />

          {/* Section 5: مراجعة الوحدة الأولى (ص 18) */}
          <Unit1Review data={lesson} />
        </>
      )}

      {activeLesson === "viruses" && (
        <>
          <DiscoveryTimeline data={lesson} />
          <Characteristics data={lesson} />
          <Viewer3D data={lesson} />
          <VideoGallery data={lesson} />
          <MedicalCards data={lesson} />
          <QuizCenter data={lesson} />
        </>
      )}

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t text-center pb-8" style={{ borderColor: "var(--border-subtle)" }}>
        <p className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
          أكاديمية الأحياء التفاعلية — BioAtelier ✦
        </p>
        <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
          مطابق 100% للنصوص والشروحات الرسمية في كتاب الأحياء المدرسي المعتمد للصف العاشر الأساسي (الصفحات 10 – 18)
        </p>
      </footer>
    </Layout>
  );
}
