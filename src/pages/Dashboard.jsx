import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Ambulance,
  Shield,
  Flame,
  Sparkles,
  MapPin,
  Map,
  ArrowUpRight,
  PhoneCall,
} from "lucide-react";

const services = [
  {
    icon: Ambulance,
    title: "Ambulance",
    desc: "Nearby hospitals",
    to: "/map?type=hospital",
    color: "text-medical",
    bg: "bg-medical/10",
  },
  {
    icon: Shield,
    title: "Police",
    desc: "Police stations",
    to: "/map?type=police",
    color: "text-police",
    bg: "bg-police/10",
  },
  {
    icon: Flame,
    title: "Fire",
    desc: "Fire stations",
    to: "/map?type=fire",
    color: "text-fire",
    bg: "bg-fire/10",
  },
  {
    icon: Sparkles,
    title: "AI Analyzer",
    desc: "Analyze emergencies",
    to: "/analyzer",
    color: "text-primary",
    bg: "bg-primary-soft",
  },
  {
    icon: MapPin,
    title: "Nearby",
    desc: "All services around you",
    to: "/nearby",
    color: "text-medical",
    bg: "bg-medical/10",
  },
  {
    icon: Map,
    title: "Live Map",
    desc: "Track your location",
    to: "/map",
    color: "text-police",
    bg: "bg-police/10",
  },
];

const hotlines = [
  { label: "Ambulance", number: "102" },
  { label: "Police", number: "100" },
  { label: "Fire", number: "101" },
];

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const name = user?.username || "there";

  return (
    <div className="space-y-6">
      {/* Welcome + search */}
      <section className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Welcome back, {name}
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          Always ready, anytime and anywhere. What do you need help with?
        </p>

        <div className="relative mt-6">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate("/nearby");
            }}
            placeholder="Search for emergency services..."
            className="w-full rounded-2xl border border-border bg-background py-3.5 pl-12 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
          />
        </div>
      </section>

      {/* Service grid */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
          Quick access
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc, to, color, bg }) => (
            <button
              key={title}
              onClick={() => navigate(to)}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-5 text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-foreground/5"
            >
              <div className="flex w-full items-center justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted transition-colors group-hover:text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Hotlines */}
      <section className="rounded-3xl border border-border bg-surface p-6">
        <div className="flex items-center gap-2">
          <PhoneCall className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Emergency hotlines</h2>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {hotlines.map(({ label, number }) => (
            <a
              key={label}
              href={`tel:${number}`}
              className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 transition-colors hover:border-primary/40"
            >
              <span className="text-sm font-medium text-foreground">{label}</span>
              <span className="rounded-lg bg-primary-soft px-3 py-1 text-sm font-bold text-primary">
                {number}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
