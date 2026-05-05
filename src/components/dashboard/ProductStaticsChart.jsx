import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import EmptyState from "../ui/EmptyState";

export default function ProductStaticsChart({ data, onRangeClick, rangeLabel = "Last Year" }) {
  return (
    <section className="dashboard-card chart-card product-statics-card">
      <div className="widget-heading">
        <h2>Product Statics</h2>
        <button type="button" onClick={onRangeClick}>{rangeLabel}</button>
      </div>
      <div className="chart-frame">
        {data.length ? (
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={data} barGap={6}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11} />
              <YAxis axisLine={false} tickLine={false} fontSize={11} width={32} />
              <Tooltip />
              <Bar dataKey="current" fill="#2f80ed" radius={[6, 6, 0, 0]} />
              <Bar dataKey="previous" fill="#dbeafe" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState title="No product stats found" />
        )}
      </div>
    </section>
  );
}
