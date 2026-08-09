import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "../ui/SectionWrapper.jsx";

/* ─── Model Data with Reference Numbers (Interactive Key & Translation Legend) ─── */
const MODELS = [
  {
    id: "bacteriophage",
    tab: "آكل البكتيريا",
    icon: "🦠",
    color: "#10b981",
    embedUrl:
      "https://sketchfab.com/models/58841771f45548edac19534921b07188/embed?autostart=1&ui_controls=1&ui_infos=0",
    title: "الفيروس آكل البكتيريا (Bacteriophage)",
    scientificCategory: "شكل ذيلي مركب (Complex / Tailed Shape)",
    description:
      "فيروس ذيلي معقد يهاجم البكتيريا حصراً. يتكون من محفظة بروتينية علوية تحيط بالمادة الوراثية (DNA)، وغمد أسطواني قابل للانقباض، وألياف ذيلية للالتصاق بالخلية البكتيرية العائل.",
    keyLegend: [
      {
        refNum: 1,
        nameAr: "المحفظة البروتينية الرأسية",
        nameEn: "Capsid Head",
        role: "رأس هندسي عشريني السطوح (Icosahedral) يحمي المادة الوراثية (DNA) بداخله، ويتكون من وحدات بروتينية متكررة تسمى كابسوميرات (Capsomeres).",
        icon: "🔷",
        badgeColor: "#10b981",
      },
      {
        refNum: 2,
        nameAr: "المادة الوراثية",
        nameEn: "Viral Genome - DNA",
        role: "حمض نووي رايبوزي منقوص الأكسجين (DNA) مزدوج الشريط، يحمل كافة الجينات المشفرة لبناء الأنزيمات والبروتينات الفيروسية داخل العائل.",
        icon: "🧬",
        badgeColor: "#06b6d4",
      },
      {
        refNum: 3,
        nameAr: "العنق والطوق",
        nameEn: "Collar & Neck",
        role: "حلقة وصل بروتينية دقيقة تربط بين قاعدة المحفظة الرأسية وأعلى الغمد الأسطواني، وتعمل كممر لانتقال الحمض النووي أثناء عملية الحقن.",
        icon: "💍",
        badgeColor: "#8b5cf6",
      },
      {
        refNum: 4,
        nameAr: "الغمد الأسطواني القابل للانقباض",
        nameEn: "Contractile Tail Sheath",
        role: "أنبوب أسطواني حلزوني ينقبض دافعاً الأنبوب المركزي الداخلي لاختراق جدار الخلية البكتيرية وحقن الـ DNA داخل السيتوبلازم.",
        icon: "🔽",
        badgeColor: "#f59e0b",
      },
      {
        refNum: 5,
        nameAr: "الصفيحة القاعدية",
        nameEn: "Baseplate",
        role: "قرص سداسي بروتيني في نهاية الذيل يحتوي على إنزيمات محللة (Lysozymes) لتثقيب جدار الخلية البكتيرية وتثبيت الفيروس.",
        icon: "⬡",
        badgeColor: "#ec4899",
      },
      {
        refNum: 6,
        nameAr: "ألياف الذيل",
        nameEn: "Tail Fibers",
        role: "زوائد بروتينية مفصلية مرنة تتعرف بنوعية عالية على المستقبلات البروتينية أو السكرية على سطح جدار البكتيريا (كالمفتاح والقفل).",
        icon: "🕸️",
        badgeColor: "#10b981",
      },
      {
        refNum: 7,
        nameAr: "الدبابيس المركزية للتثبيت",
        nameEn: "Short Tail Pins",
        role: "أشواك بروتينية قصيرة أسفل الصفيحة القاعدية تنغرس بقوة في الغشاء الخارجي للبكتيريا لتثبيت زاوية الحقن بدقة.",
        icon: "📌",
        badgeColor: "#ef4444",
      },
    ],
  },
  {
    id: "tmv",
    tab: "تبرقش التبغ",
    icon: "🌿",
    color: "#f59e0b",
    embedUrl:
      "https://sketchfab.com/models/c6ee1c95ef4a4fd6a059732fe7e85a12/embed?autostart=1&ui_controls=1&ui_infos=0",
    title: "فيروس تبرقش التبغ (TMV)",
    scientificCategory: "شكل أسطواني / حلزوني (Helical / Cylindrical Shape)",
    description:
      "أول فيروس تم اكتشافه وبلورته ورؤيته بالمجهر الإلكتروني (عام 1935م بواسطة ويندل ستانلي). يمتاز بهيكل أسطواني حلزوني متطاول من وحدات بروتينية متطابقة تلتف حول شريط من الحمض النووي (RNA).",
    keyLegend: [
      {
        refNum: 1,
        nameAr: "الوحدات البروتينية للمحفظة",
        nameEn: "Capsomeres / Coat Proteins",
        role: "حوالي 2,130 وحدة بروتينية متطابقة تماماً (كل وحدة تتكون من 158 حمضاً أمينياً)، مرتبة بشكل حلزوني منتظم حول المحور المركزي لحماية المادة الوراثية.",
        icon: "🧱",
        badgeColor: "#f59e0b",
      },
      {
        refNum: 2,
        nameAr: "شريط المادة الوراثية الحلزوني",
        nameEn: "Helical Single-Stranded RNA",
        role: "حمض نووي رايبوزي (RNA) مفرد موجب الاتجاه بطول 6,400 نيوكليوتيد، يلتف بشكل لولبي محكم في أخدود داخلي محمي بين وحدات البروتين.",
        icon: "🧬",
        badgeColor: "#ef4444",
      },
      {
        refNum: 3,
        nameAr: "القناة الأسطوانية المركزية",
        nameEn: "Central Hollow Cavity",
        role: "فجوة أنبوبية مجوفة تمتد على طول محور الفيروس بقطر يبلغ نحو 4 نانومتر، ناتجة عن الترتيب الهندسي للبروتينات وتمنح الفيروس مرونة وصلابة ميكانيكية.",
        icon: "⭕",
        badgeColor: "#06b6d4",
      },
    ],
  },
  {
    id: "coronavirus",
    tab: "الكروي (كورونا)",
    icon: "👑",
    color: "#8b5cf6",
    embedUrl:
      "https://sketchfab.com/models/1533d2519b084a1580ddba0d3c5a3aff/embed?autostart=1&ui_controls=1&ui_infos=0",
    title: "الفيروس الكروي (SARS-CoV-2 / Influenza)",
    scientificCategory: "شكل كروي مغلف (Enveloped Spherical Shape)",
    description:
      "فيروس كروي مغلف بغشاء دهني ثنائي الطبقة مشتق من الغشاء البلازمي للخلية العائل، وتبرز منه بروتينات شوكية تعطي شكل التاج (Corona)، وهي المسؤولة عن الارتباط بمستقبلات الخلايا التنفسية.",
    keyLegend: [
      {
        refNum: 1,
        nameAr: "البروتينات الشوكية التاجية",
        nameEn: "Spike Glycoproteins - S",
        role: "بروتينات سكرية ثلاثية الوحدات تبرز كالأشواك وتمنح الفيروس شكل التاج. ترتبط نوعياً بمستقبلات ACE2 على أسطح الخلايا البشرية لتسهيل الاندماج والدخول.",
        icon: "👑",
        badgeColor: "#ef4444",
      },
      {
        refNum: 2,
        nameAr: "الغلاف الغشائي الدهني",
        nameEn: "Lipid Bilayer Envelope",
        role: "غلاف دهني ثنائي الطبقة يكتسبه الفيروس أثناء تبرعمه وخروجه من الخلية العائل، ويجعله حساساً للصابون والمعقمات الكحولية التي تذيب الدهون.",
        icon: "🫧",
        badgeColor: "#8b5cf6",
      },
      {
        refNum: 3,
        nameAr: "بروتين الغشاء البنائي",
        nameEn: "Membrane Protein - M",
        role: "البروتين الأكثر وفرة في الغشاء، يحدد الشكل الكروي للفيروس ويربط الغلاف بالمحفظة النووية الداخلية لتثبيت الهيكل.",
        icon: "🔗",
        badgeColor: "#06b6d4",
      },
      {
        refNum: 4,
        nameAr: "بروتين الغلاف الثانوي",
        nameEn: "Envelope Protein - E",
        role: "بروتين صغير يلعب دوراً هاماً في تجميع الجسيمات الفيروسية وإفرازها وإحداث ثقوب أيونية في أغشية الخلية المصابة.",
        icon: "🛡️",
        badgeColor: "#f59e0b",
      },
      {
        refNum: 5,
        nameAr: "المادة الوراثية - حمض نووي",
        nameEn: "Single-Stranded (+) RNA",
        role: "حمض نووي رايبوزي مفرد موجب الاتجاه بطول يقارب 30,000 نيوكليوتيد، وهو من أضخم جينومات الـ RNA الفيروسية المعروفة.",
        icon: "🧬",
        badgeColor: "#10b981",
      },
      {
        refNum: 6,
        nameAr: "البروتين النووي المحفظي",
        nameEn: "Nucleocapsid Protein - N",
        role: "بروتينات ترتبط مباشرة بشريط الـ RNA وتلتف حوله لتكوين معقد محفظي نووي حلزوني يحميه من التحلل الإنزيمي داخل الخلية.",
        icon: "📦",
        badgeColor: "#ec4899",
      },
    ],
  },
  {
    id: "adenovirus",
    tab: "متعدد السطوح",
    icon: "💎",
    color: "#06b6d4",
    embedUrl:
      "https://sketchfab.com/models/5dae071a7ba749fab51d5b98d42864fb/embed?autostart=1&ui_controls=1&ui_infos=0",
    title: "الفيروس متعدد السطوح (Adenovirus)",
    scientificCategory: "شكل عشريني السطوح غير مغلف (Non-Enveloped Icosahedral)",
    description:
      "فيروس يمتاز بهيكل هندسي متناظر عشريني السطوح (20 وجهاً مثلثاً متطابقاً) خالٍ من الغلاف الدهني، وتبرز من زواياه ألياف بروتينية تنتهي بعقد كروية تلتصق بالخلايا الطلائية للجهاز التنفسي والعين.",
    keyLegend: [
      {
        refNum: 1,
        nameAr: "المحفظة عشرينية السطوح",
        nameEn: "Icosahedral Capsid Shell",
        role: "هيكل بلوري منتظم يتألف من 20 وجهاً مثلثاً متطابقاً و12 رأساً، يوفر أعلى درجات الحماية الكيميائية والفيزيائية للمادة الوراثية.",
        icon: "💎",
        badgeColor: "#06b6d4",
      },
      {
        refNum: 2,
        nameAr: "كابسوميرات الهيكسون",
        nameEn: "Hexon Capsomeres",
        role: "240 وحدة بروتينية سداسية التنسيق تشكل الأسطح المثلثية المسطحة للمحفظة وتمنحها قوتها الهيكلية.",
        icon: "🔷",
        badgeColor: "#3b82f6",
      },
      {
        refNum: 3,
        nameAr: "قواعد البنتون الرأسية",
        nameEn: "Penton Bases",
        role: "12 وحدة بروتينية خماسية التنسيق تقع عند كل رأس من رؤوس المحفظة العشرينية، وتعمل كقاعدة ترتكز عليها الألياف الممتدة.",
        icon: "⬟",
        badgeColor: "#8b5cf6",
      },
      {
        refNum: 4,
        nameAr: "الألياف البروتينية المعلقة",
        nameEn: "Fiber Shaft Proteins",
        role: "زوائد بروتينية رفيعة وقوية تبرز من قواعد البنتون نحو الخارج لزيادة مساحة الاشتباك مع الخلية العائل.",
        icon: "📌",
        badgeColor: "#f59e0b",
      },
      {
        refNum: 5,
        nameAr: "العقد الكروية للالتصاق",
        nameEn: "Fiber Knobs / Receptor Binding",
        role: "انتفاخات كروية في طرف كل ليف بروتيني ترتبط بمستقبلات CAR (Coxsackie-Adenovirus Receptor) على سطح خلايا الإنسان.",
        icon: "🔘",
        badgeColor: "#ec4899",
      },
      {
        refNum: 6,
        nameAr: "الحمض النووي مزدوج الشريط",
        nameEn: "Linear Double-Stranded DNA",
        role: "جينوم خطي من DNA مزدوج الشريط بطول يتراوح بين 26 إلى 48 ألف زوج من القواعد النيتروجينية، محمي ببروتينات قاعدية داخل التجويف.",
        icon: "🧬",
        badgeColor: "#10b981",
      },
    ],
  },
];

/* ─── Component ─── */
export default function Viewer3D({ data }) {
  if (!data) return null;
  const { viewer3d } = data;
  const [activeId, setActiveId] = useState("bacteriophage");
  const [selectedRefNum, setSelectedRefNum] = useState(1);

  const model = MODELS.find((m) => m.id === activeId) || MODELS[0];
  const activePart =
    model.keyLegend.find((p) => p.refNum === selectedRefNum) ||
    model.keyLegend[0];

  const handleModelChange = (id) => {
    setActiveId(id);
    setSelectedRefNum(1);
  };

  return (
    <SectionWrapper
      id="viewer3d"
      title={viewer3d?.title || "معمل الفحص ثلاثي الأبعاد والتشريح العلمي"}
      icon="🔬"
      accent="#06b6d4"
    >
      {/* ── Tabs Bar (شريط التبويبات العلوي) ── */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
        {MODELS.map((m) => {
          const active = m.id === activeId;
          return (
            <motion.button
              key={m.id}
              onClick={() => handleModelChange(m.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                active
                  ? "shadow-lg"
                  : "bg-white/5 dark:bg-white/5 bg-gray-100 border-white/10 dark:border-white/10 border-gray-200 text-gray-400 dark:text-gray-400 text-gray-600 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-gray-200"
              }`}
              style={
                active
                  ? {
                      backgroundColor: m.color + "22",
                      borderColor: m.color + "66",
                      color: m.color,
                      boxShadow: `0 4px 25px ${m.color}35`,
                    }
                  : {}
              }
              whileTap={{ scale: 0.96 }}
            >
              <span className="text-lg">{m.icon}</span>
              <span>{m.tab}</span>
            </motion.button>
          );
        })}
      </div>

      {/* ── Main Layout: 3D iFrame Viewer (Left) + Inspector Panel & Legend (Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── 3D Viewport with Glowing Neon Edge (Col 1-7) ── */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div
            className="relative rounded-3xl overflow-hidden border bg-[#070b14] shadow-2xl transition-all"
            style={{
              borderColor: model.color + "44",
              boxShadow: `0 0 50px ${model.color}18, inset 0 0 30px ${model.color}0a`,
            }}
          >
            {/* Glowing Accent Top Bar */}
            <div
              className="h-1.5 w-full"
              style={{
                background: `linear-gradient(to right, transparent, ${model.color}, transparent)`,
              }}
            />

            {/* Header Badge on 3D View */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: model.color }} />
                <span className="text-xs font-bold text-gray-200">
                  {model.title}
                </span>
              </div>
              <span
                className="text-[11px] font-mono px-2.5 py-1 rounded-md border"
                style={{
                  backgroundColor: model.color + "15",
                  borderColor: model.color + "33",
                  color: model.color,
                }}
              >
                {model.scientificCategory}
              </span>
            </div>

            {/* iFrame Container */}
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-[#050811]">
              <iframe
                title={model.title}
                src={model.embedUrl}
                className="w-full h-full block"
                frameBorder="0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
                loading="lazy"
              />

              {/* Touch/Mouse Navigation Instructions Pill */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 text-[11px] font-medium text-gray-300 bg-black/75 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full shadow-lg pointer-events-none select-none flex items-center gap-2">
                <span>🖱️ اسحب للتدوير 360°</span>
                <span className="text-gray-500">•</span>
                <span>عجلة الماوس للتكبير</span>
                <span className="text-gray-500">•</span>
                <span>نقر مزدوج لملء الشاشة</span>
              </div>
            </div>
          </div>

          {/* Quick interactive number selector pills */}
          <div className="p-3.5 rounded-2xl border border-white/10 dark:border-white/10 border-gray-200 bg-white/5 dark:bg-white/5 bg-white/60 backdrop-blur-md flex items-center justify-between gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-400 text-gray-600 shrink-0 flex items-center gap-1.5">
              <span>🎯</span>
              <span>اختر جزءاً للتشريح:</span>
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {model.keyLegend.map((item) => {
                const isSelected = selectedRefNum === item.refNum;
                return (
                  <button
                    key={item.refNum}
                    onClick={() => setSelectedRefNum(item.refNum)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? "shadow-md scale-105"
                        : "bg-white/5 dark:bg-white/5 bg-gray-100 border-white/10 text-gray-400 hover:bg-white/10"
                    }`}
                    style={
                      isSelected
                        ? {
                            backgroundColor: item.badgeColor + "25",
                            borderColor: item.badgeColor,
                            color: item.badgeColor,
                          }
                        : {}
                    }
                  >
                    <span>[{item.refNum}]</span>
                    <span className="hidden sm:inline">{item.nameAr.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Inspector Panel & Translation Key (Col 8-12) ── */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Active Part Spotlight Card (بطاقة التركيب المختار) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeId}-${activePart.refNum}`}
              className="p-5 rounded-3xl border backdrop-blur-xl relative overflow-hidden shadow-xl"
              style={{
                borderColor: activePart.badgeColor + "55",
                backgroundColor: activePart.badgeColor + "10",
                boxShadow: `0 8px 30px ${activePart.badgeColor}15`,
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* Reference Badge & Scientific Name */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-md"
                    style={{ backgroundColor: activePart.badgeColor }}
                  >
                    {activePart.refNum}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-white dark:text-white text-gray-900 leading-tight">
                      {activePart.nameAr}
                    </h4>
                    <p className="text-xs font-mono font-medium opacity-75" style={{ color: activePart.badgeColor }}>
                      ({activePart.nameEn})
                    </p>
                  </div>
                </div>
                <span className="text-2xl">{activePart.icon}</span>
              </div>

              {/* Anatomical role / curriculum explanation */}
              <div className="mt-3 pt-3 border-t border-white/10 dark:border-white/10 border-gray-200">
                <p className="text-xs font-bold text-gray-400 dark:text-gray-400 text-gray-500 mb-1 flex items-center gap-1">
                  <span>📖</span> الوظيفة الحيوية بالمنهاج المدرسي:
                </p>
                <p className="text-xs text-gray-200 dark:text-gray-200 text-gray-800 leading-relaxed">
                  {activePart.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Translation & Key Legend (دليل المفاتيح والترجمة لكامل الهيكل) */}
          <div className="p-5 rounded-3xl border border-white/10 dark:border-white/10 border-gray-200 bg-white/5 dark:bg-white/5 bg-white/70 backdrop-blur-xl shadow-xl flex-1">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white dark:text-white text-gray-900 flex items-center gap-2">
                <span>📑</span>
                <span>دليل الأرقام والمصطلحات التشريحية:</span>
              </h4>
              <span className="text-[11px] text-gray-400 dark:text-gray-400 text-gray-500">
                ({model.keyLegend.length} أجزاء رئيسية)
              </span>
            </div>

            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
              {model.keyLegend.map((item) => {
                const isSelected = selectedRefNum === item.refNum;
                return (
                  <motion.button
                    key={item.refNum}
                    onClick={() => setSelectedRefNum(item.refNum)}
                    className={`w-full text-right p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                      isSelected
                        ? "border-white/20 bg-white/10 dark:bg-white/10 bg-gray-100 shadow-md"
                        : "border-white/5 dark:border-white/5 border-gray-100 bg-white/[0.02] dark:bg-white/[0.02] bg-gray-50/50 hover:bg-white/5 dark:hover:bg-white/5 hover:bg-gray-100"
                    }`}
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Number Badge */}
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5"
                      style={{
                        backgroundColor: item.badgeColor + (isSelected ? "ff" : "25"),
                        color: isSelected ? "#ffffff" : item.badgeColor,
                        border: `1px solid ${item.badgeColor}55`,
                      }}
                    >
                      {item.refNum}
                    </span>

                    {/* Term info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-xs font-bold truncate ${
                            isSelected
                              ? "text-white dark:text-white text-gray-900"
                              : "text-gray-300 dark:text-gray-300 text-gray-700"
                          }`}
                        >
                          {item.nameAr}
                        </span>
                        <span className="text-sm shrink-0">{item.icon}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 dark:text-gray-400 text-gray-500 font-mono block truncate">
                        ({item.nameEn})
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Summary note */}
            <div className="mt-4 pt-3 border-t border-white/10 dark:border-white/10 border-gray-200 flex items-center gap-2 text-[11px] text-gray-400 dark:text-gray-400 text-gray-500">
              <span>💡</span>
              <span>انقر على أي رقم أو جزء لاستعراض الشرح الوظيفي المعتمد في الاختبارات.</span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
