import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldPlus,
  Ambulance,
  Shield,
  Flame,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { countries } from "./countries";

const highlights = [
  { icon: Ambulance, label: "Find nearby hospitals", color: "text-medical" },
  { icon: Shield, label: "Locate police stations", color: "text-police" },
  { icon: Flame, label: "Discover fire stations", color: "text-fire" },
  { icon: MapPin, label: "Live location tracking", color: "text-primary" },
];

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+91");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault();
    let valid = true;

    if (!username) {
      setNameError("Please enter your name");
      valid = false;
    } else {
      setNameError("");
    }

    if (!phone) {
      setPhoneError("Please enter phone number");
      valid = false;
    } else if (phone.length < 10) {
      setPhoneError("Phone must be 10 digits");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!valid) return;

    const userData = { username, phone, countryCode };
    if (onLogin) onLogin(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/dashboard");
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Brand / welcome panel */}
      <div className="relative hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 text-left"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/15">
            <ShieldPlus className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold">
            Emergency<span className="opacity-80">Finder</span>
          </span>
        </button>

        <div>
          <h1 className="text-balance text-4xl font-extrabold leading-tight">
            Welcome back!
          </h1>
          <p className="mt-4 max-w-sm text-pretty leading-relaxed text-primary-foreground/85">
            Emergency Finder helps you quickly locate nearby hospitals, police
            stations, and fire services when it matters most.
          </p>

          <ul className="mt-8 space-y-3">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/15">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm font-medium text-primary-foreground/90">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-primary-foreground/70">
          In a life-threatening emergency, always call your local hotline.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-background px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ShieldPlus className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold text-foreground">
              Emergency<span className="text-primary">Finder</span>
            </span>
          </div>

          <h2 className="text-2xl font-bold text-foreground">Let's get you set up</h2>
          <p className="mt-1.5 text-sm text-muted">
            Enter your details to find nearby emergency services instantly.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
              />
              {nameError && (
                <p className="mt-1.5 text-sm text-primary">{nameError}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Phone number
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="rounded-xl border border-border bg-surface px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  aria-label="Country code"
                >
                  {countries.map((c, index) => (
                    <option key={index} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) setPhone(value);
                  }}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
                />
              </div>
              {phoneError && (
                <p className="mt-1.5 text-sm text-primary">{phoneError}</p>
              )}
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted">
            By continuing you agree to share your location to find nearby help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
