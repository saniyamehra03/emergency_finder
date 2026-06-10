import { useNavigate } from "react-router-dom";
import { Ambulance, Shield, Flame, ArrowUpRight, PhoneCall } from "lucide-react";

const categories = [
  {
    icon: Ambulance,
    title: "Hospitals & Ambulance",
    desc: "Find the closest medical care and emergency transport.",
    number: "102",
    to: "/map?type=hospital",
    color: "text-medical",
    bg: "bg-medical/10",
  },
  {
    icon: Shield,
    title: "Police Stations",
    desc: "Report crime or get help from the nearest station.",
    number: "100",
    to: "/map?type=police",
    color: "text-police",
    bg: "bg-police/10",
  },
  {
    icon: Flame,
    title: "Fire Stations",
    desc: "Reach fire and rescue services in your area fast.",
    number: "101",
    to: "/map?type=fire",
    color: "text-fire",
    bg: "bg-fire/10",
  },
];

const NearbyServices = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Nearby Services</h1>
        <p className="text-sm text-muted">
          Pick a category to view live results on the map around you.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ icon: Icon, title, desc, number, to, color, bg }) => (
          <div
            key={title}
            className="flex flex-col rounded-3xl border border-border bg-surface p-6"
          >
            <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}>
              <Icon className={`h-6 w-6 ${color}`} />
            </span>
            <h2 className="mt-4 text-base font-semibold text-foreground">{title}</h2>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{desc}</p>

            <div className="mt-5 flex items-center gap-2">
              <button
                onClick={() => navigate(to)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
              >
                View on map
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <a
                href={`tel:${number}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary-soft px-4 py-2.5 text-sm font-semibold text-primary"
              >
                <PhoneCall className="h-4 w-4" />
                {number}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyServices;
