import { AQI_COLORS, AQI_TEXT_COLORS } from "../../utils/constants";
import { formatDateTime } from "../../utils/formatters";
import { getAqiLabel } from "../../utils/aqiUtils";

export default function AQICard({ data }) {
  if (!data) return null;
  const color = AQI_COLORS[data.aqi] || "bg-slate-500";
  const textColor = AQI_TEXT_COLORS[data.aqi] || "text-slate-700";

  return (
    <section className="panel overflow-hidden">
      <div className={`${color} h-2`} />
      <div className="p-6 lg:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="section-title">Current monitoring node</p>
            <h2 className="mt-2 text-4xl font-black">{data.name}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Last updated {formatDateTime(data.timestamp)}
            </p>
            <div className="mt-5 grid max-w-xl gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
                <p className="text-xs text-slate-500">Latitude</p>
                <p className="font-bold">{Number(data.lat).toFixed(3)}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
                <p className="text-xs text-slate-500">Longitude</p>
                <p className="font-bold">{Number(data.lon).toFixed(3)}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
                <p className="text-xs text-slate-500">Region</p>
                <p className="font-bold">{data.zone || data.state || "India"}</p>
              </div>
            </div>
          </div>
          <div className="min-w-48 rounded-lg bg-slate-100 p-6 text-center dark:bg-slate-800">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">OpenWeather AQI</p>
            <p className={`text-6xl font-black ${textColor}`}>{data.aqi}</p>
            <p className="font-bold">{getAqiLabel(data.aqi)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
