export default function StatCard({ title, value, delta, trend }) {
  const positive = trend === "up";

  return (
    <article className="metric-card dashboard-card">
      <div className="metric-topline">
        <span>{title}</span>
        <span className={`trend-badge ${positive ? "positive" : "negative"}`}>
          {positive ? "+" : "-"}{Math.abs(delta)}%
        </span>
      </div>
      <strong>{value}</strong>
      <p>From last month</p>
    </article>
  );
}
