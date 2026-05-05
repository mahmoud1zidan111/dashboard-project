import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function TransactionActivityChart({ data, onRangeClick, rangeLabel = "Last Year" }) {
  return (
    <section className="dashboard-card chart-card transaction-card">
      <div className="widget-heading">
        <h2>Transaction Activity</h2>
        <button type="button" onClick={onRangeClick}>{rangeLabel}</button>
      </div>
      <div className="chart-frame">
        <ResponsiveContainer width="100%" height={190}>
          <LineChart data={data}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11} />
            <YAxis axisLine={false} tickLine={false} fontSize={11} width={32} />
            <Tooltip />
            <Line type="monotone" dataKey="transfer" stroke="#2f80ed" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="success" stroke="#88c8ff" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
