import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const THEME_KEY = "theme";

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  return "light";
}

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRange, setSelectedRange] = useState("year");
  const [exportRequestId, setExportRequestId] = useState(0);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const outletContext = useMemo(
    () => ({
      exportRequestId,
      searchQuery,
      selectedRange,
      setSelectedRange,
      setSearchQuery,
    }),
    [exportRequestId, searchQuery, selectedRange],
  );

  return (
    <div className={`app-shell ${sidebarOpen ? "sidebar-open" : ""}`}>
      <Sidebar onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Topbar
          onExport={() => setExportRequestId((value) => value + 1)}
          onMenuClick={() => setSidebarOpen((isOpen) => !isOpen)}
          onRangeChange={setSelectedRange}
          onSearchChange={setSearchQuery}
          onThemeToggle={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
          searchQuery={searchQuery}
          selectedRange={selectedRange}
          theme={theme}
        />
        <main className="app-content">
          <Outlet context={outletContext} />
        </main>
      </div>
    </div>
  );
}
