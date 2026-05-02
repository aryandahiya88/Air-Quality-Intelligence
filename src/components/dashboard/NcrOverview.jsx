import { AQI_HEX_COLORS } from "../../utils/constants";
import { getAqiLabel } from "../../utils/aqiUtils";

export default function NcrOverview({ cities = [] }) {
  return (
    <section className="panel p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-title">Regional scan</p>
          <h2 className="text-lg font-bold">Delhi NCR monitoring grid</h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{cities.length} active city nodes</p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cities.slice(0, 9).map((city) => (
          <article key={city.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{city.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{city.zone || city.state || "NCR node"}</p>
              </div>
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: AQI_HEX_COLORS[city.aqi] || "#64748b" }} />
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full" style={{ width: `${city.aqi * 20}%`, backgroundColor: AQI_HEX_COLORS[city.aqi] || "#64748b" }} />
            </div>
            <p className="mt-2 text-xs font-medium">{getAqiLabel(city.aqi)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
