export default function StatCard({ label, value, icon, tone = "primary" }) {
  return (
    <article className="stat-card">
      {icon ? (
        <div className={`stat-icon text-bg-${tone}`}>
          <i className={`bi ${icon}`} aria-hidden="true" />
        </div>
      ) : null}
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
