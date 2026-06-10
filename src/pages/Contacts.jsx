import { useState } from "react";
import { Ambulance, Shield, Flame, Phone, Plus, Trash2, User, X } from "lucide-react";

const nationalNumbers = [
  { label: "Ambulance", number: "102", icon: Ambulance, color: "text-medical", bg: "bg-medical/10" },
  { label: "Police", number: "100", icon: Shield, color: "text-police", bg: "bg-police/10" },
  { label: "Fire", number: "101", icon: Flame, color: "text-fire", bg: "bg-fire/10" },
  { label: "Emergency", number: "112", icon: Phone, color: "text-primary", bg: "bg-primary-soft" },
];

const Contacts = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Family Member", phone: "+91 98765 43210" },
  ]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showForm, setShowForm] = useState(false);

  const addContact = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setContacts((prev) => [...prev, { id: Date.now(), name, phone }]);
    setName("");
    setPhone("");
    setShowForm(false);
  };

  const removeContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Contacts</h1>
        <p className="text-sm text-muted">
          Quick-dial national services and your personal emergency contacts.
        </p>
      </div>

      {/* National hotlines */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
          National hotlines
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {nationalNumbers.map(({ label, number, icon: Icon, color, bg }) => (
            <a
              key={label}
              href={`tel:${number}`}
              className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </span>
              <div>
                <p className="text-sm text-muted">{label}</p>
                <p className="text-xl font-bold text-foreground">{number}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Personal contacts */}
      <section className="rounded-3xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Personal contacts</h2>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-2 text-sm font-semibold text-primary"
          >
            {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showForm ? "Cancel" : "Add contact"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={addContact} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contact name"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Save
            </button>
          </form>
        )}

        <div className="mt-4 space-y-3">
          {contacts.length === 0 && (
            <p className="rounded-2xl border border-dashed border-border bg-background p-6 text-center text-sm text-muted">
              No personal contacts yet. Add someone you'd want notified.
            </p>
          )}
          {contacts.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted">
                <User className="h-5 w-5 text-muted" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{c.name}</p>
                <p className="truncate text-sm text-muted">{c.phone}</p>
              </div>
              <a
                href={`tel:${c.phone.replace(/\s/g, "")}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-primary"
                aria-label={`Call ${c.name}`}
              >
                <Phone className="h-4 w-4" />
              </a>
              <button
                onClick={() => removeContact(c.id)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-surface-muted hover:text-primary"
                aria-label={`Remove ${c.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contacts;
