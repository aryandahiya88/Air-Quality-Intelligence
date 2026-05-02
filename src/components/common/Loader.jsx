export default function Loader({ label = "Loading air quality data..." }) {
  return (
    <div className="card p-6">
      <div className="h-4 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-28 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-500">{label}</p>
    </div>
  );
}
