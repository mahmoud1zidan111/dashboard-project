export default function SchedulePanel({ items, onSeeAll }) {
  return (
    <section className="dashboard-card schedule-card">
      <div className="widget-heading">
        <h2>Schedule</h2>
        <button type="button" onClick={onSeeAll}>See All</button>
      </div>
      <p className="schedule-date">January 2025</p>
      <div className="schedule-list">
        {items.map((item) => (
          <article className="schedule-item" key={item.id}>
            <div className={`schedule-tag ${item.color}`}>{item.type}</div>
            <h3>{item.title}</h3>
            <p>{item.time}</p>
            <div className="avatar-stack">
              {item.people.map((person, index) => (
                <span key={`${person}-${index}`}>{person}</span>
              ))}
              <small>+{item.extra}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
