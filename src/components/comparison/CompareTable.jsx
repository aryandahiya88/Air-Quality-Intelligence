import { getAqiLabel, getDominantPollutant } from "../../utils/aqiUtils";

export default function CompareTable({ cities }) {
  return (
    <section className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <tr>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">AQI</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Dominant Pollutant</th>
              <th className="px-4 py-3">Risk Score</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-3 font-medium">{city.name}</td>
                <td className="px-4 py-3">{city.aqi}</td>
                <td className="px-4 py-3">{getAqiLabel(city.aqi)}</td>
                <td className="px-4 py-3">{getDominantPollutant(city.components)}</td>
                <td className="px-4 py-3 font-semibold">{city.riskScore}/100</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
