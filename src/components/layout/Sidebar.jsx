import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "bi-grid-1x2-fill" },
  { to: "/list", label: "Products", icon: "bi-bag" },
];

export default function Sidebar({ onClose }) {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">S</span>
        <span>Sugarpanel</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className="sidebar-link" onClick={onClose}>
            <i className={`bi ${item.icon}`} aria-hidden="true" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-utility">
        <button className="sidebar-icon-button" type="button" aria-label="Settings">
          <i className="bi bi-gear" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
