import { motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "../ui/SectionWrapper.jsx";

/* ─── Academic Vector Diagrams for Shapes ─── */
function BacteriophageDiagram() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-28 mx-auto" fill="none">
      <polygon points="60,10 90,32 90,62 60,82 30,62 30,32" fill="#10b98122" stroke="#10b981" strokeWidth="2"/>
      <line x1="60" y1="10" x2="60" y2="32" stroke="#10b98155" strokeWidth="1"/>
      <line x1="30" y1="32" x2="90" y2="32" stroke="#10b98155" strokeWidth="1"/>
      <line x1="30" y1="62" x2="90" y2="62" stroke="#10b98155" strokeWidth="1"/>
      <path d="M52,32 Q60,45 52,58 Q44,70 52,32" stroke="#06b6d4" strokeWidth="1.5" fill="none"/>
      <path d="M68,32 Q60,45 68,58 Q76,70 68,32" stroke="#06b6d4" strokeWidth="1.5" fill="none"/>
      <rect x="57" y="82" width="6" height="36" fill="#10b98144" stroke="#10b981" strokeWidth="1.5" rx="1"/>
      <polygon points="46,118 74,118 78,126 42,126" fill="#10b98133" stroke="#10b981" strokeWidth="1.5"/>
      <path d="M46,122 Q32,135 22,150" stroke="#10b981" strokeWidth="1.5" fill="none"/>
      <path d="M50,124 Q42,138 34,150" stroke="#10b981" strokeWidth="1.5" fill="none"/>
      <path d="M74,122 Q88,135 98,150" stroke="#10b981" strokeWidth="1.5" fill="none"/>
      <path d="M70,124 Q78,138 86,150" stroke="#10b981" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function TMVDiagram() {
  return (
    <svg viewBox="0 0 100 160" className="w-full h-28 mx-auto" fill="none">
      <rect x="30" y="15" width="40" height="130" rx="6" fill="#f59e0b20" stroke="#f59e0b" strokeWidth="2"/>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const y = 22 + i * 14;
        return (
          <ellipse key={i} cx="50" cy={y} rx="18" ry="4.5" fill="none" stroke="#f59e0b" strokeWidth="1.2" opacity="0.6"/>
        );
      })}
      <path d="M50,20 Q54,35 46,50 Q54,65 46,80 Q54,95 46,110 Q54,125 48,140" stroke="#ef4444" strokeWidth="2" fill="none"/>
    </svg>
  );
}

function CoronaDiagram() {
  return (
    <svg viewBox="0 0 140 140" className="w-full h-28 mx-auto" fill="none">
      <circle cx="70" cy="70" r="50" fill="#8b5cf620" stroke="#8b5cf6" strokeWidth="2"/>
      <circle cx="70" cy="70" r="35" fill="#8b5cf615" stroke="#8b5cf666" strokeWidth="1.5" strokeDasharray="3 3"/>
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 70 + 50 * Math.cos(rad);
        const y1 = 70 + 50 * Math.sin(rad);
        const x2 = 70 + 62 * Math.cos(rad);
        const y2 = 70 + 62 * Math.sin(rad);
        return (
          <g key={angle}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ef4444" strokeWidth="2"/>
            <circle cx={x2} cy={y2} r="2.5" fill="#ef4444"/>
          </g>
        );
      })}
      <path d="M58,58 Q70,48 82,58 Q88,70 82,82 Q70,90 58,82 Q52,70 58,58" stroke="#06b6d4" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function AdenoDiagram() {
  return (
    <svg viewBox="0 0 140 140" className="w-full h-28 mx-auto" fill="none">
      <polygon points="70,18 110,42 110,88 70,112 30,88 30,42" fill="#06b6d420" stroke="#06b6d4" strokeWidth="2"/>
      <line x1="70" y1="18" x2="30" y2="88" stroke="#06b6d455" strokeWidth="1"/>
      <line x1="70" y1="18" x2="110" y2="88" stroke="#06b6d455" strokeWidth="1"/>
      <line x1="30" y1="42" x2="110" y2="88" stroke="#06b6d455" strokeWidth="1"/>
      <line x1="110" y1="42" x2="30" y2="88" stroke="#06b6d455" strokeWidth="1"/>
      <line x1="70" y1="112" x2="30" y2="42" stroke="#06b6d455" strokeWidth="1"/>
      <line x1="70" y1="112" x2="110" y2="42" stroke="#06b6d455" strokeWidth="1"/>
      {/* Fiber spikes */}
      {[
        [70, 18, 70, 5],
        [110, 42, 122, 35],
        [110, 88, 122, 95],
        [70, 112, 70, 125],
        [30, 88, 18, 95],
        [30, 42, 18, 35],
      ].map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#06b6d4" strokeWidth="1.5"/>
          <circle cx={x2} cy={y2} r="2" fill="#06b6d4"/>
        </g>
      ))}
    </svg>
  );
}

const diagrams = {
  bacteriophage: BacteriophageDiagram,
  tmv: TMVDiagram,
  coronavirus: CoronaDiagram,
  adenovirus: AdenoDiagram,
};

export default function Characteristics({ data }) {
  if (!data) return null;
  const { generalCharacteristics, shapes } = data;
  const [activeShapeId, setActiveShapeId] = useState("bacteriophage");

  return (
    <SectionWrapper
      id="characteristics"
      title="الخصائص العامة للفيروسات"
      accent="#8b5cf6"
    >
      {/* ── Three Formal Core Characteristic Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {/* Card 1: Connection between living and non-living */}
        <div className="p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] bg-white border border-white/10 dark:border-white/10 border-gray-200 backdrop-blur-sm shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold font-mono px-3 py-1 rounded-lg bg-violet-500/20 text-violet-300 border border-violet-500/30 inline-block mb-3">
              الخاصية الأولى
            </span>
            <h3 className="text-base font-bold text-white dark:text-white text-gray-900 mb-3 leading-snug">
              حلقة الوصل بين الأحياء والجمادات
            </h3>
            <p className="text-sm text-gray-300 dark:text-gray-300 text-gray-700 leading-relaxed font-normal">
              {generalCharacteristics.connectionText}
            </p>
          </div>
        </div>

        {/* Card 2: Obligate intracellular parasites */}
        <div className="p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] bg-white border border-white/10 dark:border-white/10 border-gray-200 backdrop-blur-sm shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold font-mono px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block mb-3">
              الخاصية الثانية
            </span>
            <h3 className="text-base font-bold text-white dark:text-white text-gray-900 mb-3 leading-snug">
              طفيليات داخلية إجبارية
            </h3>
            <p className="text-sm text-gray-300 dark:text-gray-300 text-gray-700 leading-relaxed font-normal">
              {generalCharacteristics.parasiteText}
            </p>
          </div>
        </div>

        {/* Card 3: Basic Structure */}
        <div className="p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] bg-white border border-white/10 dark:border-white/10 border-gray-200 backdrop-blur-sm shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold font-mono px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 inline-block mb-3">
              الخاصية الثالثة
            </span>
            <h3 className="text-base font-bold text-white dark:text-white text-gray-900 mb-3 leading-snug">
              التركيب الأساسي
            </h3>
            <p className="text-sm text-gray-300 dark:text-gray-300 text-gray-700 leading-relaxed font-normal">
              {generalCharacteristics.structureText}
            </p>
          </div>
        </div>
      </div>

      {/* ── Shapes of Viruses Overview ── */}
      <h3 className="text-lg font-bold text-white dark:text-white text-gray-900 mb-5 flex items-center gap-2">
        <span>الأشكال الرئيسية للفيروسات الواردة في المنهاج:</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {shapes.map((shape) => {
          const Diagram = diagrams[shape.id];
          const isSelected = activeShapeId === shape.id;

          return (
            <button
              key={shape.id}
              onClick={() => setActiveShapeId(shape.id)}
              className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-white/[0.08] dark:bg-white/[0.08] bg-gray-100 border-emerald-500/60 shadow-xl"
                  : "bg-white/[0.02] dark:bg-white/[0.02] bg-white border-white/10 dark:border-white/10 border-gray-200 hover:border-white/20"
              }`}
            >
              <div>
                <div className="py-2 mb-2 bg-black/20 rounded-xl">
                  {Diagram && <Diagram />}
                </div>
                <span className="text-[11px] font-mono text-emerald-400 block mb-1">
                  [{shape.shapeType}]
                </span>
                <h4 className="text-sm font-bold text-white dark:text-white text-gray-900 mb-2">
                  {shape.name}
                </h4>
                <p className="text-xs text-gray-400 dark:text-gray-400 text-gray-600 leading-relaxed">
                  {shape.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
