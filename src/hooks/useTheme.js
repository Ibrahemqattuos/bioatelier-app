import { useState, useEffect, useCallback } from "react";

export default function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("bioatelier-theme");
      if (saved) return saved === "dark";
    } catch {}
    return true; // default dark
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("bioatelier-theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  const toggle = useCallback(() => setDark((d) => !d), []);

  return { dark, toggle };
}
