export default function Loader({ label = "Loading..." }) {
  return (
    <div className="loader-state">
      <span className="spinner-border spinner-border-sm" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
