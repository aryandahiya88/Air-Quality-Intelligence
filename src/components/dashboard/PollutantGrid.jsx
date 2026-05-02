import { formatPollutant } from "../../utils/formatters";

const labels = {
  co: "Carbon Monoxide",
  no: "Nitrogen Monoxide",
  no2: "Nitrogen Dioxide",
  o3: "Ozone",
  so2: "Sulphur Dioxide",
  pm2_5: "PM2.5",
  pm10: "PM10",
  nh3: "Ammonia"
};

export default function PollutantGrid({ components = {} }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Object.entries(labels).map(([key, label]) => (
        <article key={key} className="panel p-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-bold">{formatPollutant(components[key])}</p>
        </article>
      ))}
    </section>
  );
}
