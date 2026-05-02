export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="card border-red-200 bg-red-50 p-5 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100">
      <h2 className="font-semibold">Unable to load data</h2>
      <p className="mt-1 text-sm">{message}</p>
      {onRetry && (
        <button className="btn-primary mt-4" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
