import { useNavigate } from "react-router-dom";
import {
  ShieldPlus,
  Ambulance,
  Shield,
  Flame,
  MapPin,
  ArrowRight,
  Navigation,
  Clock,
  PhoneCall,
} from "lucide-react";

const services = [
  { icon: Ambulance, label: "Ambulance", color: "text-medical", bg: "bg-medical/10" },
  { icon: Shield, label: "Police", color: "text-police", bg: "bg-police/10" },
  { icon: Flame, label: "Fire", color: "text-fire", bg: "bg-fire/10" },
];

const features = [
  {
    icon: Navigation,
    title: "Instant routing",
    desc: "Live turn-by-turn directions to the nearest help, the moment you need it.",
  },
  {
    icon: Clock,
    title: "Real-time ETA",
    desc: "See distance and estimated arrival time for every service around you.",
  },
  {
    icon: PhoneCall,
    title: "One-tap calling",
    desc: "Dial local emergency numbers directly from the results list.",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-svh bg-background">
      {/* Top bar */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShieldPlus className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold text-foreground">
            Emergency<span className="text-primary">Finder</span>
          </span>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="rounded-full border border-border bg-surface px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
        >
          Sign in
        </button>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Help when seconds count
            </span>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Find nearby help{" "}
              <span className="text-primary">instantly</span>
            </h1>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Locate the closest hospitals, police stations, and fire services
              in seconds. Live location, real-time routing, and one-tap calling
              when every moment matters.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="tel:112"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
              >
                <PhoneCall className="h-4 w-4 text-primary" />
                Call 112 now
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {services.map(({ icon: Icon, label, color, bg }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2"
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full ${bg}`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                  </span>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="rounded-3xl border border-border bg-surface p-6 shadow-xl shadow-foreground/5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Nearby right now</p>
                <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Live
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  { name: "City General Hospital", dist: "0.8 km", eta: "2 min", Icon: Ambulance, color: "text-medical", bg: "bg-medical/10" },
                  { name: "Central Police Station", dist: "1.2 km", eta: "3 min", Icon: Shield, color: "text-police", bg: "bg-police/10" },
                  { name: "District Fire Station", dist: "2.1 km", eta: "5 min", Icon: Flame, color: "text-fire", bg: "bg-fire/10" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-background p-3"
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg}`}>
                      <item.Icon className={`h-5 w-5 ${item.color}`} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="flex items-center gap-1 text-xs text-muted">
                        <MapPin className="h-3 w-3" />
                        {item.dist} away
                      </p>
                    </div>
                    <span className="rounded-lg bg-surface-muted px-2.5 py-1 text-xs font-semibold text-foreground">
                      {item.eta}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -right-3 -top-3 hidden h-20 w-20 animate-pulse-ring rounded-full bg-primary/5 sm:block" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border bg-surface p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft">
                <Icon className="h-5 w-5 text-primary" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto w-full max-w-6xl px-4 py-8 text-center text-sm text-muted sm:px-6">
        Emergency Finder — built to help you reach safety faster.
      </footer>
    </div>
  );
}

export default Home;
