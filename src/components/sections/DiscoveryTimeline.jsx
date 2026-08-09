import { motion } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper.jsx";

export default function DiscoveryTimeline({ data }) {
  if (!data) return null;
  const { timeline, timelineCheckCard } = data;

  return (
    <SectionWrapper
      id="timeline"
      title="محطة الاكتشاف التاريخي للفيروسات"
      accent="#10b981"
    >
      <div className="relative">
        {/* Glowing vertical line */}
        <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-violet-500 to-cyan-500 opacity-30 hidden md:block" />

        <div className="space-y-6 md:space-y-8">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              className="relative flex items-start gap-4 md:gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
            >
              {/* Year badge */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-base shadow-lg z-10 border border-emerald-500/40 bg-emerald-950/40 text-emerald-300"
                  style={{
                    boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
                  }}
                >
                  {item.year}
                </div>
              </div>

              {/* Card with literal textbook text */}
              <div className="flex-1 p-5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] bg-white border border-white/10 dark:border-white/10 border-gray-200 backdrop-blur-sm shadow-xl hover:border-emerald-500/40 transition-all">
                <div className="flex flex-wrap items-baseline gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white dark:text-white text-gray-900">
                    {item.scientist}
                  </h3>
                  <span className="text-xs font-mono text-emerald-400/80">
                    ({item.scientistEn})
                  </span>
                </div>
                <p className="text-sm text-gray-300 dark:text-gray-300 text-gray-700 leading-relaxed font-normal">
                  {item.event}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Literal verification card */}
        {timelineCheckCard && (
          <motion.div
            className="mt-8 p-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 backdrop-blur-sm flex items-center justify-between"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                بطاقة تحقق
              </span>
              <p className="text-amber-200 dark:text-amber-200 text-amber-900 font-semibold text-sm">
                {timelineCheckCard}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
