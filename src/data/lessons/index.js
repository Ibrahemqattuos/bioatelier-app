import virusesLesson from "./viruses.json";
import evolutionLesson from "./evolution.js";

const lessons = [evolutionLesson, virusesLesson];

/* ── Curriculum hierarchy (official textbook order) ── */
const curriculumUnits = [
  {
    id: 1,
    title: "الوحدة الأولى: نظرية التطور",
    icon: "🧬",
    lessons: [
      { id: "evolution", title: "تطور الكائنات الحية", available: true },
    ],
  },
  {
    id: 2,
    title: "الوحدة الثانية: الفيروسات والفيرويدات والبريونات",
    icon: "🦠",
    lessons: [
      { id: "viruses", title: "الفيروسات", available: true },
      { id: "viroids", title: "الفيرويدات والبريونات", available: false },
    ],
  },
  {
    id: 3,
    title: "الوحدة الثالثة: تصنيف الكائنات الحية",
    icon: "🔬",
    lessons: [],
  },
];

export function getAllLessons() {
  return lessons.map(({ id, title, unit, subtitle }) => ({
    id,
    title,
    unit,
    subtitle,
  }));
}

export function getLessonById(id) {
  return lessons.find((l) => l.id === id) || null;
}

export function getCurriculumTree() {
  return curriculumUnits;
}

export default lessons;
