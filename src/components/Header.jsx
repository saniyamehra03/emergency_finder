import { Menu, Radio } from "lucide-react";

const Header = ({ user, onMenuClick }) => {
  const name = user?.username || "there";
  const initial = name.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-surface/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted hover:bg-surface-muted lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-xs text-muted">Welcome back</p>
          <p className="text-sm font-semibold text-foreground">{name}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-1.5 rounded-full bg-success/10 px-3 py-1.5 text-xs font-medium text-success sm:flex">
          <Radio className="h-3.5 w-3.5" />
          Live tracking ready
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {initial}
        </span>
      </div>
    </header>
  );
};

export default Header;
