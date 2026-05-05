import StatCard from "./StatCard";

export default function StatCardsRow({ stats }) {
  return (
    <section className="stat-cards-row">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </section>
  );
}
