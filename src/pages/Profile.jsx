import "./Profile.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-avatar">
          {(user?.username || "G")[0].toUpperCase()}
        </div>

        <h2>{user?.username}</h2>

        <div className="profile-info">
          <div className="info-box">
            <label>Phone Number</label>
            <span>+{user?.phone}</span>
          </div>

          <div className="info-box">
            <label>Account Status</label>
            <span>Active</span>
          </div>

          <div className="info-box">
            <label>Location Access</label>
            <span>Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;