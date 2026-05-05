import { useMemo, useState } from "react";

export default function ProductListTable({ onSeeMore, onToggleProduct, products }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const productIds = useMemo(() => products.map((product) => product.id), [products]);
  const allSelected = productIds.length > 0 && productIds.every((id) => selectedIds.includes(id));

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : productIds);
  };

  const toggleRow = (id) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <section className="dashboard-card product-list-card">
      <div className="widget-heading">
        <div>
          <h2>Product List</h2>
          <p><strong>{products.length * 820}</strong> items <span className="trend-badge positive">+4.8%</span></p>
        </div>
        <button type="button" onClick={onSeeMore}>See More</button>
      </div>
      <div className="product-table-wrap">
        <table className="product-table">
          <thead>
            <tr>
              <th>
                <input
                  aria-label="Select all products"
                  checked={allSelected}
                  onChange={toggleAll}
                  type="checkbox"
                />
              </th>
              <th>Product Name</th>
              <th>Revenue</th>
              <th>Sales</th>
              <th>Conversion</th>
              <th>Views</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {!products.length ? (
              <tr>
                <td colSpan="7">No products found</td>
              </tr>
            ) : null}
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <input
                    aria-label={`Select ${product.name}`}
                    checked={selectedIds.includes(product.id)}
                    onChange={() => toggleRow(product.id)}
                    type="checkbox"
                  />
                </td>
                <td>
                  <div className="product-cell">
                    <span>{product.initials}</span>
                    <div>
                      <strong>{product.name}</strong>
                      <small>{product.category}</small>
                    </div>
                  </div>
                </td>
                <td>{product.revenue}</td>
                <td>{product.sales}</td>
                <td>{product.conversion}</td>
                <td>{product.views}</td>
                <td>
                  <label className="table-switch">
                    <input
                      checked={product.active}
                      onChange={() => onToggleProduct?.(product.id, !product.active)}
                      type="checkbox"
                    />
                    <span />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
