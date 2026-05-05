import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const rangeOptions = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "year", label: "This Year" },
];

const notifications = [
  "New product report is ready",
  "Revenue crossed the monthly target",
  "Three products need review",
];

const messages = [
  "Arthur Bell sent a schedule update",
  "Leslie Perez shared product notes",
];

export default function Topbar({
  onExport,
  onMenuClick,
  onRangeChange,
  onSearchChange,
  onThemeToggle,
  searchQuery,
  selectedRange,
  theme,
}) {
  const { user, logout } = useAuth();
  const [openPanel, setOpenPanel] = useState(null);
  const selectedRangeLabel =
    rangeOptions.find((option) => option.value === selectedRange)?.label || "Date";

  const togglePanel = (panel) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  return (
    <header className="app-topbar">
      <button className="topbar-menu" type="button" onClick={onMenuClick} aria-label="Toggle menu">
        <i className="bi bi-list" aria-hidden="true" />
      </button>
      <div className="topbar-search">
        <i className="bi bi-search" aria-hidden="true" />
        <input
          aria-label="Search"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search..."
          value={searchQuery}
        />
      </div>
      <div className="topbar-actions">
        <div className="topbar-dropdown">
          <button className="topbar-pill" type="button" onClick={() => togglePanel("range")}>
            {selectedRangeLabel}
          </button>
          {openPanel === "range" ? (
            <div className="topbar-panel compact">
              {rangeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onRangeChange(option.value);
                    setOpenPanel(null);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <button className="topbar-pill" type="button" onClick={onExport}>
          Export Document
        </button>
        <div className="topbar-dropdown">
          <button className="topbar-icon" type="button" onClick={() => togglePanel("notifications")} aria-label="Notifications">
            <i className="bi bi-bell" aria-hidden="true" />
          </button>
          {openPanel === "notifications" ? (
            <div className="topbar-panel">
              <strong>Notifications</strong>
              {notifications.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="topbar-dropdown">
          <button className="topbar-icon" type="button" onClick={() => togglePanel("messages")} aria-label="Messages">
            <i className="bi bi-chat-dots" aria-hidden="true" />
          </button>
          {openPanel === "messages" ? (
            <div className="topbar-panel">
              <strong>Messages</strong>
              {messages.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : null}
        </div>
        <button className="topbar-icon" type="button" onClick={onThemeToggle} aria-label="Toggle theme">
          <i className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon"}`} aria-hidden="true" />
        </button>
        <div className="topbar-user" title={user?.fullName || "User"}>
          <span>{(user?.fullName || "U").slice(0, 1)}</span>
        </div>
        <button className="topbar-icon" type="button" onClick={logout} aria-label="Logout">
          <i className="bi bi-box-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
