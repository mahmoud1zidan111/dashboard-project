import { useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import BannerCard from "../../components/dashboard/BannerCard";
import ConversionRatePanel from "../../components/dashboard/ConversionRatePanel";
import DashboardGrid from "../../components/dashboard/DashboardGrid";
import OrdersByTimeHeatmap from "../../components/dashboard/OrdersByTimeHeatmap";
import ProductListTable from "../../components/dashboard/ProductListTable";
import ProductStaticsChart from "../../components/dashboard/ProductStaticsChart";
import SalePerformanceChart from "../../components/dashboard/SalePerformanceChart";
import SchedulePanel from "../../components/dashboard/SchedulePanel";
import StatCardsRow from "../../components/dashboard/StatCardsRow";
import TransactionActivityChart from "../../components/dashboard/TransactionActivityChart";
import WelcomeHeader from "../../components/dashboard/WelcomeHeader";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";
import Loader from "../../components/ui/Loader";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import {
  getSchedule,
  getStats,
  getTopProducts,
  getTransactions,
} from "../../services/resources/dashboard.service";
import { updateProduct } from "../../services/resources/products.service";
import { exportRowsToCsv } from "../../utils/exportCsv";
import "./dashboard.css";

const rangeLabels = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  year: "This Year",
};

const rangeOrder = ["7d", "30d", "year"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const scheduleTypes = ["Product Design", "Marketing Research", "Development Sprint"];
const scheduleColors = ["blue", "green", "orange"];

async function getDashboardData() {
  const [stats, transactions, schedule, products] = await Promise.all([
    getStats(),
    getTransactions(),
    getSchedule(),
    getTopProducts(),
  ]);

  return { products, schedule, stats, transactions };
}

function formatCurrency(value) {
  return `$${Number(value || 0).toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`;
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString();
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function filterByRange(transactions, range) {
  if (range === "year") return transactions;

  const days = range === "7d" ? 7 : 30;
  const dates = transactions.map((item) => new Date(item.date).getTime()).filter(Boolean);
  const maxDate = dates.length ? Math.max(...dates) : Date.now();
  const fromDate = maxDate - days * 24 * 60 * 60 * 1000;

  return transactions.filter((item) => new Date(item.date).getTime() >= fromDate);
}

function mapStats(stats) {
  return stats.map((stat) => ({
    ...stat,
    value: stat.title.toLowerCase().includes("revenue")
      ? formatCurrency(stat.value)
      : formatNumber(stat.value),
  }));
}

function mapTransactions(transactions) {
  const grouped = new Map();

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = monthNames[date.getMonth()] || transaction.date;
    const current = grouped.get(month) || { month, success: 0, transfer: 0 };
    const amount = Number(transaction.amount || 0);

    if (transaction.type === "refund") current.transfer += amount;
    else current.success += amount;
    current.transfer += Math.round(amount * 0.35);
    grouped.set(month, current);
  });

  return Array.from(grouped.values());
}

function mapSalePerformance(transactions) {
  return mapTransactions(transactions).map((item) => ({
    month: item.month,
    sales: Math.max(10, Math.round((item.success + item.transfer) / 20)),
  }));
}

function mapProducts(products) {
  return products.map((product) => {
    const sales = product.sales ?? Math.max(1, Math.round(Number(product.revenue || 0) / Number(product.price || 1)));

    return {
      ...product,
      active: product.active ?? true,
      category: product.category || "In Stock",
      conversion: product.conversion || `${Math.min(9.99, Number(product.views || 0) / 180).toFixed(2)}%`,
      initials: product.initials || getInitials(product.name),
      revenue: formatCurrency(product.revenue || product.price),
      sales: formatNumber(sales),
      views: formatNumber(product.views),
    };
  });
}

function mapProductStatics(products) {
  return products.map((product, index) => ({
    current: Number(product.revenue || 0),
    month: monthNames[index] || product.name,
    previous: Math.round(Number(product.views || 0) * 2.5),
  }));
}

function mapSchedule(schedule) {
  return schedule.map((item, index) => ({
    id: item.id,
    color: scheduleColors[index % scheduleColors.length],
    extra: index + 1,
    people: [getInitials(item.assignee || item.title).slice(0, 1), "M", "S"].filter(Boolean),
    time: item.time,
    title: item.title,
    type: item.type || scheduleTypes[index % scheduleTypes.length],
  }));
}

function buildHeatmap(transactions) {
  const total = transactions.reduce((sum, item) => sum + Number(item.amount || 0), 0) || 1;

  return Array.from({ length: 7 }, (_, row) =>
    Array.from({ length: 10 }, (_, col) => {
      const wave = ((row + 1) * (col + 2) + total / 100) % 10;
      return Math.max(0.08, Math.min(1, wave / 10));
    }),
  );
}

function buildConversions(products) {
  const totals = products.reduce(
    (acc, product) => ({
      revenue: acc.revenue + Number(product.revenue || 0),
      views: acc.views + Number(product.views || 0),
    }),
    { revenue: 0, views: 0 },
  );

  return [
    { label: "January 2025", value: "6.82%" },
    { label: "Product Views", value: `${Math.max(1, totals.views / 1000).toFixed(2)}%` },
    { label: "Add to Cart", value: `${Math.max(2, totals.revenue / 1200).toFixed(2)}%` },
    { label: "Checkout Initiated", value: "8.31%" },
    { label: "Completed Purchase", value: "4.23%" },
    { label: "Completed Purchase", value: "6.87%" },
  ];
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { exportRequestId, searchQuery, selectedRange, setSelectedRange } = useOutletContext();
  const { data, loading, error, refetch } = useFetch(getDashboardData);
  const [products, setProducts] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (data?.products) setProducts(data.products);
  }, [data?.products]);

  const filteredTransactions = useMemo(
    () => filterByRange(data?.transactions || [], selectedRange),
    [data?.transactions, selectedRange],
  );

  const mappedProducts = useMemo(() => mapProducts(products), [products]);
  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return mappedProducts;
    return mappedProducts.filter((product) => product.name.toLowerCase().includes(query));
  }, [mappedProducts, searchQuery]);

  const scheduleItems = useMemo(() => mapSchedule(data?.schedule || []), [data?.schedule]);

  useEffect(() => {
    if (!exportRequestId || !visibleProducts.length) return;

    exportRowsToCsv("dashboard-products.csv", visibleProducts, [
      { key: "name", label: "Product Name" },
      { key: "revenue", label: "Revenue" },
      { key: "sales", label: "Sales" },
      { key: "conversion", label: "Conversion" },
      { key: "views", label: "Views" },
      { key: "active", label: "Active" },
    ]);
  }, [exportRequestId, visibleProducts]);

  const cycleRange = () => {
    const currentIndex = rangeOrder.indexOf(selectedRange);
    setSelectedRange(rangeOrder[(currentIndex + 1) % rangeOrder.length]);
  };

  const handleToggleProduct = async (id, active) => {
    const previousProducts = products;
    setProducts((current) =>
      current.map((product) => (product.id === id ? { ...product, active } : product)),
    );

    try {
      await updateProduct(id, { active });
    } catch {
      setProducts(previousProducts);
    }
  };

  const name = user?.fullName || "Ameerah Howard";
  const rangeLabel = rangeLabels[selectedRange];

  if (loading) {
    return (
      <DashboardGrid>
        <WelcomeHeader name={name} notifications={2} />
        <section className="dashboard-card dashboard-state-card">
          <Loader label="Loading dashboard..." />
        </section>
      </DashboardGrid>
    );
  }

  if (error) {
    return (
      <DashboardGrid>
        <WelcomeHeader name={name} notifications={2} />
        <section className="dashboard-card dashboard-state-card">
          <ErrorState message={error.message || "Failed to load dashboard"} onRetry={refetch} />
        </section>
      </DashboardGrid>
    );
  }

  if (!data) {
    return (
      <DashboardGrid>
        <WelcomeHeader name={name} notifications={2} />
        <section className="dashboard-card dashboard-state-card">
          <EmptyState title="No dashboard data found" />
        </section>
      </DashboardGrid>
    );
  }

  return (
    <>
      <DashboardGrid>
        <WelcomeHeader name={name} notifications={2} />
        <BannerCard />
        <StatCardsRow stats={mapStats(data.stats || [])} />
        <TransactionActivityChart
          data={mapTransactions(filteredTransactions)}
          onRangeClick={cycleRange}
          rangeLabel={rangeLabel}
        />
        <SalePerformanceChart
          data={mapSalePerformance(filteredTransactions)}
          delta={4.38}
          onRangeClick={cycleRange}
          rangeLabel={rangeLabel}
          value="91.72%"
        />
        <SchedulePanel items={scheduleItems} onSeeAll={() => setShowScheduleModal(true)} />
        <OrdersByTimeHeatmap matrix={buildHeatmap(filteredTransactions)} />
        <ProductStaticsChart
          data={mapProductStatics(products)}
          onRangeClick={cycleRange}
          rangeLabel={rangeLabel}
        />
        <ProductListTable
          onSeeMore={() => navigate("/list")}
          onToggleProduct={handleToggleProduct}
          products={visibleProducts}
        />
        <ConversionRatePanel items={buildConversions(products)} />
      </DashboardGrid>

      {showScheduleModal ? (
        <div className="dashboard-modal" role="dialog" aria-modal="true">
          <div className="dashboard-modal-card">
            <div className="widget-heading">
              <h2>All Schedule</h2>
              <button type="button" onClick={() => setShowScheduleModal(false)}>Close</button>
            </div>
            <div className="schedule-list">
              {scheduleItems.map((item) => (
                <article className="schedule-item" key={item.id}>
                  <div className={`schedule-tag ${item.color}`}>{item.type}</div>
                  <h3>{item.title}</h3>
                  <p>{item.time}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
