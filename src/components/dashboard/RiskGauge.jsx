export default function RiskGauge({ score = 0 }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(score, 100) / 100) * circumference;

  return (
    <section className="panel p-5">
      <p className="section-title">Exposure risk index</p>
      <div className="mt-4 flex items-center gap-5">
        <svg className="h-36 w-36 -rotate-90" viewBox="0 0 140 140" aria-label="Risk score gauge">
          <circle cx="70" cy="70" r={radius} stroke="currentColor" strokeWidth="14" fill="none" className="text-slate-200 dark:text-slate-800" />
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="currentColor"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={score >= 70 ? "text-red-600" : score >= 45 ? "text-orange-500" : "text-teal-600"}
          />
        </svg>
        <div>
          <p className="text-4xl font-black">{score}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Composite score from AQI, PM2.5, PM10, and gases.</p>
        </div>
      </div>
    </section>
  );
}
