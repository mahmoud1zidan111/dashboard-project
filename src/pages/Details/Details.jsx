import { useParams } from "react-router-dom";
import useDetails from "../../hooks/useDetails";
import Loader from "../../components/ui/Loader";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";
import { getProductById } from "../../services/resources/products.service";

export default function Details() {
  const { id } = useParams();
  const { data: product, loading, error, refetch } = useDetails(getProductById, id);

  if (loading) return <Loader label="Loading product details..." />;

  if (error) {
    return (
      <ErrorState
        message={error.message || "Failed to load product details"}
        onRetry={refetch}
      />
    );
  }

  if (!product) return <EmptyState title="Product not found" />;

  return (
    <section className="content-panel">
      <h2>Details skeleton</h2>
      <pre className="mt-3">{JSON.stringify(product, null, 2)}</pre>
    </section>
  );
}
