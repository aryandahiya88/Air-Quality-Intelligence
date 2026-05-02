import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const colors = ["#0d9488", "#f97316", "#2563eb", "#e11d48", "#7c3aed", "#16a34a"];
const keys = ["pm2_5", "pm10", "no2", "so2", "o3", "co"];

export default function PollutantMix({ components = {} }) {
  const data = keys.map((key) => ({ name: key.toUpperCase(), value: Number(components[key] || 0) }));

  return (
    <section className="panel p-5">
      <p className="section-title">Pollutant mix</p>
      <h2 className="text-lg font-bold">Concentration share</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={2}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
