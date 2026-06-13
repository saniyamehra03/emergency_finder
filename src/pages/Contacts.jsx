import "./Contacts.css";

const Contacts = () => {
  const contacts = [
    { name: "Emergency", number: "112", color: "#ef4444" },
    { name: "Police", number: "100", color: "#3b82f6" },
    { name: "Fire Brigade", number: "101", color: "#f59e0b" },
    { name: "Ambulance", number: "102", color: "#10b981" },
  ];

  return (
    <div className="contacts-page">
      <div className="page-card">
        <h2>Emergency Contacts</h2>
        <p>Quick access to important emergency helplines.</p>

        <div className="contact-grid">
          {contacts.map((item, index) => (
            <a
              key={index}
              href={`tel:${item.number}`}
              className="contact-card"
            >
              <div
                className="contact-icon"
                style={{ background: item.color }}
              >
                ☎
              </div>

              <div>
                <h3>{item.name}</h3>
                <span>{item.number}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;