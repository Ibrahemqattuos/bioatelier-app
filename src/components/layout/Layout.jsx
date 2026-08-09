import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import { useState } from "react";

export default function Layout({ dark, onToggleTheme, activeLesson, onSelectLesson, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Header
        dark={dark}
        onToggleTheme={onToggleTheme}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
      />

      <div className="flex flex-row-reverse">
        <Sidebar
          open={sidebarOpen}
          activeLesson={activeLesson}
          onSelectLesson={onSelectLesson}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 py-8 max-w-5xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
