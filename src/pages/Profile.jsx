import { useNavigate } from "react-router-dom";
import { User, Phone, MapPin, Bell, ShieldCheck, LogOut, ChevronRight } from "lucide-react";

const Profile = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const name = user?.username || "Guest User";
  const phone = user?.phone
    ? `${user.countryCode || ""} ${user.phone}`
    : "Not provided";
  const initial = name.charAt(0).toUpperCase();

  const settings = [
    { icon: Bell, label: "Notifications", desc: "Alerts and reminders" },
    { icon: MapPin, label: "Location sharing", desc: "Always on during emergencies" },
    { icon: ShieldCheck, label: "Privacy & safety", desc: "Manage your data" },
  ];

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-sm text-muted">Manage your account and preferences.</p>
      </div>

      {/* Profile card */}
      <section className="rounded-3xl border border-border bg-surface p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
            {initial}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-foreground">{name}</h2>
            <p className="flex items-center gap-1.5 text-sm text-muted">
              <Phone className="h-3.5 w-3.5" />
              {phone}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft">
              <User className="h-4.5 w-4.5 text-primary" />
            </span>
            <p className="mt-3 text-xs text-muted">Account type</p>
            <p className="text-sm font-semibold text-foreground">Personal</p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10">
              <ShieldCheck className="h-4.5 w-4.5 text-success" />
            </span>
            <p className="mt-3 text-xs text-muted">Status</p>
            <p className="text-sm font-semibold text-foreground">Verified</p>
          </div>
        </div>
      </section>

      {/* Settings */}
      <section className="rounded-3xl border border-border bg-surface p-2">
        {settings.map(({ icon: Icon, label, desc }) => (
          <button
            key={label}
            className="flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition-colors hover:bg-background"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-muted">
              <Icon className="h-5 w-5 text-muted" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-sm text-muted">{desc}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted" />
          </button>
        ))}
      </section>

      <button
        onClick={handleLogout}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
      >
        <LogOut className="h-4 w-4" />
        Log out
      </button>
    </div>
  );
};

export default Profile;
