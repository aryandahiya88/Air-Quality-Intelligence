import { getAqiLabel, getDominantPollutant } from "../../utils/aqiUtils";
import { formatPollutant } from "../../utils/formatters";

export default function StatStrip({ data }) {
  if (!data) return null;

  const metrics = [
    { label: "AQI category", value: getAqiLabel(data.aqi), detail: `Level ${data.aqi} of 5` },
    { label: "Risk score", value: `${data.riskScore}/100`, detail: data.riskScore >= 65 ? "High exposure risk" : "Manageable exposure" },
    { label: "Dominant pollutant", value: getDominantPollutant(data.components), detail: "Highest concentration" },
    { label: "PM2.5", value: formatPollutant(data.components.pm2_5), detail: "Fine particles" }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article key={metric.label} className="metric">
          <p className="section-title">{metric.label}</p>
          <p className="mt-2 text-2xl font-black">{metric.value}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{metric.detail}</p>
        </article>
      ))}
    </section>
  );
}
