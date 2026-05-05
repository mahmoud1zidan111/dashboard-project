export default function WelcomeHeader({ name, notifications = 0 }) {
  return (
    <section className="welcome-header">
      <div>
        <h1>Welcome Back {name}</h1>
        <p>You have {notifications} unread notifications</p>
      </div>
      <button className="dashboard-icon-button" type="button" aria-label="More">
        <i className="bi bi-three-dots" aria-hidden="true" />
      </button>
    </section>
  );
}
