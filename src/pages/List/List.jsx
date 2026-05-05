import { useEffect, useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import useList from "../../hooks/useList";
import Loader from "../../components/ui/Loader";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";
import { getProducts } from "../../services/resources/products.service";
import { exportRowsToCsv } from "../../utils/exportCsv";

export default function List() {
  const { exportRequestId, searchQuery } = useOutletContext();
  const { data: products, loading, error, refetch } = useList(getProducts);
  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return products || [];
    return (products || []).filter((product) => product.name.toLowerCase().includes(query));
  }, [products, searchQuery]);

  useEffect(() => {
    if (!exportRequestId || !visibleProducts.length) return;

    exportRowsToCsv("products.csv", visibleProducts, [
      { key: "name", label: "Product Name" },
      { key: "price", label: "Price" },
      { key: "revenue", label: "Revenue" },
      { key: "views", label: "Views" },
      { key: "active", label: "Active" },
    ]);
  }, [exportRequestId, visibleProducts]);

  if (loading) return <Loader label="Loading products..." />;

  if (error) {
    return (
      <ErrorState
        message={error.message || "Failed to load products"}
        onRetry={refetch}
      />
    );
  }

  if (!visibleProducts.length) return <EmptyState title="No products found" />;

  return (
    <section className="content-panel">
      <h2>Products list skeleton</h2>
      <ul className="list-group mt-3">
        {visibleProducts.map((product) => (
          <li
            key={product.id}
            className="list-group-item d-flex align-items-center justify-content-between"
          >
            <span>{product.name}</span>
            <Link to={`/details/${product.id}`}>Details</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
