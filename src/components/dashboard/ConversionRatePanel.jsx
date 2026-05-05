export default function ConversionRatePanel({ items }) {
  return (
    <section className="dashboard-card conversion-card">
      <div className="widget-heading">
        <h2>Conversion Rate</h2>
        <button type="button">Last Year</button>
      </div>
      <div className="conversion-list">
        {items.map((item) => (
          <div className="conversion-item" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
