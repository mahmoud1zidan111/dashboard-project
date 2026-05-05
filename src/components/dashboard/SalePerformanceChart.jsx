import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function SalePerformanceChart({ data, value, delta, onRangeClick, rangeLabel = "Last Year" }) {
  return (
    <section className="dashboard-card chart-card sales-card">
      <div className="widget-heading">
        <div>
          <h2>Sale Performance</h2>
          <p><strong>{value}</strong> <span className="trend-badge positive">+{delta}%</span></p>
        </div>
        <button type="button" onClick={onRangeClick}>{rangeLabel}</button>
      </div>
      <div className="chart-frame">
        <ResponsiveContainer width="100%" height={190}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="saleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2f80ed" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#2f80ed" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#edf2f7" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11} />
            <YAxis axisLine={false} tickLine={false} fontSize={11} width={30} />
            <Tooltip />
            <Area type="stepAfter" dataKey="sales" stroke="#2f80ed" fill="url(#saleGradient)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
