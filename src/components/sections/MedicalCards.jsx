import { motion } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper.jsx";

export default function MedicalCards({ data }) {
  if (!data) return null;
  const { diseasesTable, benefitsAndMedicine } = data;

  return (
    <SectionWrapper
      id="medical"
      title="جدول الأمراض الفيروسية والصحة (صفحة 27)"
      accent="#ef4444"
    >
      {/* ── Official Academic Data Table (No Emojis/Icons) ── */}
      <div className="rounded-3xl border border-white/10 dark:border-white/10 border-gray-200 bg-white/[0.02] dark:bg-white/[0.02] bg-white backdrop-blur-xl shadow-2xl overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-white/5 dark:bg-white/5 bg-gray-100/80 border-b border-white/10 dark:border-white/10 border-gray-200">
                {diseasesTable.columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="p-4 font-bold text-emerald-300 dark:text-emerald-300 text-emerald-800 whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 dark:divide-white/5 divide-gray-100">
              {diseasesTable.rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-white/[0.03] dark:hover:bg-white/[0.03] hover:bg-gray-50/80 transition-colors"
                >
                  {/* Disease Name */}
                  <td className="p-4 font-bold text-white dark:text-white text-gray-900 whitespace-nowrap">
                    {row.diseaseName}
                  </td>
                  {/* Pathogen */}
                  <td className="p-4 text-cyan-300 dark:text-cyan-300 text-cyan-800 font-medium whitespace-nowrap">
                    {row.pathogen}
                  </td>
                  {/* Transmission */}
                  <td className="p-4 text-gray-300 dark:text-gray-300 text-gray-700">
                    {row.transmission}
                  </td>
                  {/* Incubation */}
                  <td className="p-4 text-amber-300 dark:text-amber-300 text-amber-800 whitespace-nowrap font-mono">
                    {row.incubation}
                  </td>
                  {/* Symptoms */}
                  <td className="p-4 text-gray-300 dark:text-gray-300 text-gray-700 min-w-[200px]">
                    {row.symptoms}
                  </td>
                  {/* Prevention */}
                  <td className="p-4 text-gray-300 dark:text-gray-300 text-gray-700 min-w-[220px]">
                    {row.prevention}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnotes from textbook */}
        <div className="p-4 border-t border-white/10 dark:border-white/10 border-gray-200 bg-black/20 space-y-1 text-xs text-gray-400 dark:text-gray-400 text-gray-600">
          {diseasesTable.footnotes.map((fn, idx) => (
            <p key={idx} className="font-mono">
              {fn}
            </p>
          ))}
        </div>
      </div>

      {/* ── Benefits & Medicine Connection (صفحة 28 بالحرف) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        {/* Benefits Card */}
        <motion.div
          className="p-6 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              فوائد الفيروسات
            </span>
            <h4 className="text-sm font-bold text-white dark:text-white text-gray-900">
              الربط بالبيئة والمناعة (صفحة 28)
            </h4>
          </div>
          <p className="text-xs md:text-sm text-gray-200 dark:text-gray-200 text-gray-800 leading-relaxed font-normal">
            {benefitsAndMedicine.benefitsText}
          </p>
        </motion.div>

        {/* Cancer Therapy Connection Card */}
        <motion.div
          className="p-6 rounded-3xl border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              الربط بالطب
            </span>
            <h4 className="text-sm font-bold text-white dark:text-white text-gray-900">
              علاج الأورام السرطانية (صفحة 28)
            </h4>
          </div>
          <p className="text-xs md:text-sm text-gray-200 dark:text-gray-200 text-gray-800 leading-relaxed font-normal">
            {benefitsAndMedicine.cancerResearchText}
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
