const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function OrdersByTimeHeatmap({ matrix }) {
  return (
    <section className="dashboard-card heatmap-card">
      <div className="widget-heading">
        <h2>Orders By Time</h2>
        <span>January 2025</span>
      </div>
      <div className="heatmap-grid">
        {matrix.map((row, rowIndex) => (
          <div className="heatmap-row" key={days[rowIndex]}>
            <span>{days[rowIndex]}</span>
            {row.map((value, colIndex) => (
              <i
                key={`${rowIndex}-${colIndex}`}
                style={{ "--heat": value }}
                title={`${days[rowIndex]} ${colIndex + 8}:00`}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
