import "./Contacts.css";
const Contacts = () => {
  return (
    <div className="contacts-page">
      <div className="page-card">
        <h2>Emergency Contacts</h2>
        <p>Quick access to important emergency helplines.</p>
        <div className="contact-actions">
  <a href="tel:112" className="action-btn action-btn--red">
    🚨 Call Emergency
  </a>

  <a href="tel:100" className="action-btn action-btn--blue">
    👮 Call Police
  </a>

  <a href="tel:101" className="action-btn action-btn--amber">
    🔥 Call Fire Brigade
  </a>

  <a href="tel:102" className="action-btn action-btn--green">
    🚑 Call Ambulance
  </a>
  </div>
    <div className="important-contacts">
  <h3>Important Contacts</h3>
    <p className="section-subtitle">
   Other important helpline numbers
  </p>
  <div className="contact-list">
  <a href="tel:112" className="contact-item">
      <span>🚨 National Emergency</span>
      <strong>112</strong>
    </a>

     <a href="tel:100" className="contact-item">
      <span>👮 Police</span>
      <strong>100</strong>
    </a>

    <a href="tel:101" className="contact-item">
      <span>🔥 Fire Brigade</span>
      <strong>101</strong>
    </a>

    <a href="tel:102" className="contact-item">
      <span>🚑 Ambulance</span>
      <strong>102</strong>
    </a>
    <a href="tel:1091" className="contact-item">
      <span>📞 Women Helpline</span>
      <strong>1091</strong>
    </a>

    <a href="tel:1098" className="contact-item">
      <span>🧒 Child Helpline</span>
      <strong>1098</strong>
    </a>
  </div>
</div>
     <div className="emergency-guide">
  <h3>Emergency Instructions</h3>
  <p className="section-subtitle">
  Follow these steps during any emergency
</p>
  <ul>
    <li>Stay calm and assess the situation.</li>
    <li>Call the appropriate emergency service.</li>
    <li>Share your exact location.</li>
    <li>Follow instructions from the operator.</li>
    <li>Keep your phone available.</li>
  </ul>
</div>
<div className="safety-tips">
  <h3>Safety Tips</h3>
<p className="section-subtitle">
    Stay prepared for emergencies
  </p>
  <div className="tips-list">
    <div className="tip-item">🔋 Keep your phone charged</div>
    <div className="tip-item">📍 Enable location services</div>
    <div className="tip-item">👨‍👩‍👧 Share emergency contacts with family</div>
    <div className="tip-item">🚨 Save important helpline numbers</div>
  </div>
</div>
<div className="contacts-footer">
  <h4>❤️ Your Safety, Our Priority</h4>
  <p>
    Emergency help is just one tap away. Stay safe, stay protected.
  </p>
</div>
</div>
</div>
  )
}

export default Contacts;