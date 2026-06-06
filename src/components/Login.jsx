import React,{useState} from "react";
import "./Login.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { countries } from "./countries";
const Login = ({onLogin}) => {
const [countryCode, setCountryCode] = useState("+91");
  const [nameError , setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
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

    onLogin({username, phone});
    localStorage.setItem("user", JSON.stringify({username, phone}));
  };

  return (
    <div className="login-container">
      <div className="welcome-panel">
        <h1>Welcome Back!</h1>
        <p> Emergency Finder helps you quickly locate nearby hospitals,
        police stations and fire stations.</p>
      </div>
      <div className="login-box">
        <h2>Emergency Finder 👋</h2>
        <p>Find nearby emergency services instantly</p>

        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {nameError && <p style={{ color: "red" }}>{nameError}</p>}

      <div className="phone-container">

  <div className="country-box">
    <select
      value={countryCode}
      onChange={(e) => setCountryCode(e.target.value)}
    >
      {countries.map((c, index) => (
        <option key={index} value={c.code}>
          {c.flag} {c.code}
        </option>
      ))}
    </select>
  </div>

  <input
    className="phone-input"
    type="text"
    placeholder="Enter phone number"
    value={phone}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, "");
      if (value.length <= 10) {
        setPhone(value);
      }
    }}
  />

</div>

        {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}

        <button onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Login;