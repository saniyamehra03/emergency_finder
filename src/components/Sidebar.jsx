import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Sparkles,
  MapPin,
  Phone,
  User,
  ShieldPlus,
  LogOut,
  X,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/map", label: "Live Map", icon: Map },
  { to: "/analyzer", label: "AI Analyzer", icon: Sparkles },
  { to: "/nearby", label: "Nearby", icon: MapPin },
  { to: "/contacts", label: "Contacts", icon: Phone },
  { to: "/profile", label: "Profile", icon: User },
];

const Sidebar = ({ mobileOpen, onClose, onLogout }) => {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-surface transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ShieldPlus className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-foreground">Emergency</p>
              <p className="text-sm font-bold text-primary">Finder</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted hover:bg-surface-muted lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-soft text-primary"
                    : "text-muted hover:bg-surface-muted hover:text-foreground"
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <div className="mb-3 rounded-xl bg-primary-soft p-3">
            <p className="text-xs font-semibold text-primary">Emergency hotline</p>
            <a
              href="tel:112"
              className="mt-1 block text-lg font-bold text-foreground"
            >
              Call 112
            </a>
          </div>
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
