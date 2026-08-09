import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "../ui/SectionWrapper.jsx";

export default function VideoGallery({ data }) {
  if (!data || !data.videos || data.videos.length === 0) return null;
  const { videos, reproduction } = data;
  const [activeVideoId, setActiveVideoId] = useState(videos[0].id);

  const activeVideo = videos.find((v) => v.id === activeVideoId) || videos[0];

  // Map active video to its corresponding textbook steps
  const isLytic = activeVideo.id === "video-1";
  const cycleData = isLytic ? reproduction.lytic : reproduction.lysogenic;
  const themeColor = isLytic ? "#ef4444" : "#f59e0b";

  return (
    <SectionWrapper
      id="videos"
      title="محاكاة دورات التكاثر — الفيديوهات التوضيحية والخطوات العلمية"
      accent={themeColor}
    >
      {/* ── Mode Selection Buttons ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10 dark:border-white/10 border-gray-200">
        <div className="inline-flex rounded-2xl bg-white/5 dark:bg-white/5 bg-gray-100 p-1.5 border border-white/10 dark:border-white/10 border-gray-200">
          {videos.map((vid) => {
            const isSelected = activeVideoId === vid.id;
            return (
              <button
                key={vid.id}
                onClick={() => setActiveVideoId(vid.id)}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? isLytic
                      ? "bg-red-500/25 text-red-400 border border-red-500/40 shadow-lg"
                      : "bg-amber-500/25 text-amber-400 border border-amber-500/40 shadow-lg"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {vid.title}
              </button>
            );
          })}
        </div>

        {/* Badge Indicator */}
        <span
          className="px-4 py-1.5 rounded-full text-xs font-bold border font-mono flex items-center gap-2"
          style={{
            color: themeColor,
            borderColor: themeColor + "55",
            backgroundColor: themeColor + "15",
          }}
        >
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: themeColor }} />
          {cycleData.name}
        </span>
      </div>

      {/* Cycle Definition / Badge Ribbon from Textbook */}
      {cycleData.badge && (
        <div
          className="p-4 rounded-2xl border mb-6 text-xs sm:text-sm leading-relaxed backdrop-blur-sm"
          style={{
            borderColor: themeColor + "33",
            backgroundColor: themeColor + "0a",
            color: isLytic ? "#fca5a5" : "#fde68a",
          }}
        >
          <strong>نص كتاب الأحياء (الصف العاشر):</strong> {cycleData.badge}
        </div>
      )}

      {/* ── Main Layout: Video Player (Left) + Literal Textbook Steps (Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── Video Player Viewport (Col 1-7) ── */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div
            className="relative rounded-3xl overflow-hidden border bg-[#070b14] shadow-2xl transition-all"
            style={{
              borderColor: themeColor + "44",
              boxShadow: `0 0 50px ${themeColor}18, inset 0 0 30px ${themeColor}0a`,
            }}
          >
            {/* Glowing Accent Top Bar */}
            <div
              className="h-1.5 w-full"
              style={{
                background: `linear-gradient(to right, transparent, ${themeColor}, transparent)`,
              }}
            />

            {/* Header Badge */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
                <span className="text-xs font-bold text-gray-200 truncate max-w-xs md:max-w-md">
                  {activeVideo.title}
                </span>
              </div>
              <span
                className="text-[11px] font-mono px-2.5 py-1 rounded-md border shrink-0"
                style={{
                  backgroundColor: themeColor + "15",
                  borderColor: themeColor + "33",
                  color: themeColor,
                }}
              >
                {activeVideo.badge || "فيديو توضيحي"}
              </span>
            </div>

            {/* Video Player Container */}
            <div className="relative w-full aspect-video bg-[#050811]">
              {activeVideo.embedUrl.endsWith(".mp4") ? (
                <video
                  controls
                  src={activeVideo.embedUrl}
                  className="w-full h-full block object-contain"
                />
              ) : (
                <iframe
                  title={activeVideo.title}
                  src={activeVideo.embedUrl}
                  className="w-full h-full block"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </div>

          {/* Video Description Note */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white">ملخص المقطع التعليمي:</strong> {activeVideo.description}
            </p>
          </div>
        </div>

        {/* ── Literal Textbook Steps (Col 8-12) ── */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-5 rounded-3xl border border-white/10 dark:border-white/10 border-gray-200 bg-white/5 dark:bg-white/5 bg-white/70 backdrop-blur-xl shadow-xl">
            <h4 className="text-xs font-bold text-gray-300 dark:text-gray-300 text-gray-800 mb-4 flex items-center justify-between">
              <span>الخطوات الحرفية للدورة من كتاب الأحياء:</span>
              <span className="font-mono text-[10px] text-gray-500">({cycleData.steps.length} خطوات كاملة)</span>
            </h4>

            <div className="space-y-3">
              {cycleData.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-3 hover:border-white/15 transition-all shadow-inner"
                >
                  <span
                    className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 text-white shadow"
                    style={{
                      backgroundColor: themeColor,
                    }}
                  >
                    {step.stepNumber}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-white mb-1.5">{step.title}</h5>
                    <p className="text-xs text-gray-300 dark:text-gray-300 text-gray-700 leading-relaxed font-normal">
                      "{step.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
