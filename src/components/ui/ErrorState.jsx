export default function ErrorState({ message = "Something went wrong", onRetry }) {
  return (
    <div className="alert alert-danger mb-0 d-flex align-items-center justify-content-between gap-3">
      <span>{message}</span>
      {onRetry ? (
        <button className="btn btn-sm btn-outline-danger" type="button" onClick={onRetry}>
          Retry
        </button>
      ) : null}
    </div>
  );
}
