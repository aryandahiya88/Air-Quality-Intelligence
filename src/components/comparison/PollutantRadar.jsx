import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

const keys = ["pm2_5", "pm10", "no2", "so2", "o3"];

export default function PollutantRadar({ cities = [] }) {
  const topCities = [...cities].sort((a, b) => b.aqi - a.aqi).slice(0, 3);
  const data = keys.map((key) => {
    const row = { pollutant: key.toUpperCase() };
    topCities.forEach((city) => {
      row[city.name] = Number(city.components?.[key] || 0);
    });
    return row;
  });

  return (
    <section className="panel p-5">
      <p className="section-title">Pollutant fingerprint</p>
      <h2 className="text-lg font-bold">Top-risk city radar</h2>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="pollutant" />
            <PolarRadiusAxis />
            <Tooltip />
            {topCities.map((city, index) => (
              <Radar
                key={city.id}
                name={city.name}
                dataKey={city.name}
                stroke={["#0d9488", "#f97316", "#dc2626"][index]}
                fill={["#0d9488", "#f97316", "#dc2626"][index]}
                fillOpacity={0.18}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
