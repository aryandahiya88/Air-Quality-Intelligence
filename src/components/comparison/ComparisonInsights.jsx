import { getAqiLabel } from "../../utils/aqiUtils";

export default function ComparisonInsights({ cities = [] }) {
  if (!cities.length) return null;

  const sorted = [...cities].sort((a, b) => b.aqi - a.aqi);
  const worst = sorted[0];
  const best = sorted[sorted.length - 1];
  const average = (cities.reduce((sum, city) => sum + city.aqi, 0) / cities.length).toFixed(1);
  const severeCount = cities.filter((city) => city.aqi >= 4).length;

  const items = [
    { label: "Most polluted", value: worst.name, detail: `${getAqiLabel(worst.aqi)} AQI` },
    { label: "Cleanest node", value: best.name, detail: `${getAqiLabel(best.aqi)} AQI` },
    { label: "NCR average", value: average, detail: "OpenWeather 1-5 AQI scale" },
    { label: "High-risk cities", value: severeCount, detail: "Cities at Poor or worse" }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article key={item.label} className="metric">
          <p className="section-title">{item.label}</p>
          <p className="mt-2 text-2xl font-black">{item.value}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.detail}</p>
        </article>
      ))}
    </section>
  );
}
