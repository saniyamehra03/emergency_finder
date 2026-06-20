import "./Contacts.css";
const Contacts = () => {
  const copyNumbers =(number) =>{
    navigator.clipboard.writeText(number);
    alert(`${number} copied`);
  }
  return (
    <div className="contacts-page">
      <div className="page-card">
        <h2>Emergency Contacts</h2>
        <p>Quick access to important emergency helplines.</p>
        <div className="contact-actions">
 <div className="action-btn action-btn--red">
  <h3>🚨 Emergency</h3>
  <h2>112</h2>
  <a href="tel:112" className="call-now-btn">
    📞 Call Now
  </a>
</div>

 <div className="action-btn action-btn--blue">
  <h3>👮 Police</h3>
  <h2>100</h2>
  <a href="tel:100" className="call-now-btn">
    📞 Call Now
  </a>
</div>

  <div className="action-btn action-btn--amber">
  <h3>🔥 Fire Brigade</h3>
  <h2>101</h2>
  <a href="tel:101" className="call-now-btn">
    📞 Call Now
  </a>
</div>

<div className="action-btn action-btn--green">
  <h3>🚑 Ambulance</h3>
  <h2>102</h2>

  <a href="tel:102" className="call-now-btn">
    📞 Call Now
  </a>
</div>
  </div>
    <div className="important-contacts">
  <h3>Important Contacts</h3>
    <p className="section-subtitle">
   Other important helpline numbers
  </p>
  <div className="contact-list">

  <a href="tel:112" className="contact-item">
      <span>🚨 National Emergency</span>
      <div className="contact-actions-row">
    <strong>112</strong>
      <button
      className="copy-btn"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        copyNumbers("112");
      }}
    >
      📋
    </button>
    </div>
    </a>

<a href="tel:100" className="contact-item">
  <span>👮 Police</span>

  <div className="contact-actions-row">
    <strong>100</strong>
    <button
      className="copy-btn"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        copyNumbers("100");
      }}
    >
      📋
    </button>
  </div>
</a>

<a href="tel:101" className="contact-item">
  <span>🔥 Fire Brigade</span>

  <div className="contact-actions-row">
    <strong>101</strong>
    <button
      className="copy-btn"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        copyNumbers("101");
      }}
    >
      📋
    </button>
  </div>
</a>

<a href="tel:102" className="contact-item">
  <span>🚑 Ambulance</span>

  <div className="contact-actions-row">
    <strong>102</strong>
    <button
      className="copy-btn"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        copyNumbers("102");
      }}
    >
      📋
    </button>
  </div>
</a>

<a href="tel:1091" className="contact-item">
  <span>📞 Women Helpline</span>

  <div className="contact-actions-row">
    <strong>1091</strong>
    <button
      className="copy-btn"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        copyNumbers("1091");
      }}
    >
      📋
    </button>
  </div>
</a>

<a href="tel:1098" className="contact-item">
  <span>🧒 Child Helpline</span>

  <div className="contact-actions-row">
    <strong>1098</strong>
    <button
      className="copy-btn"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        copyNumbers("1098");
      }}
    >
      📋
    </button>
  </div>
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