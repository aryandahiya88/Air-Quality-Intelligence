import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function AQIChart({ data }) {
  const chartData = Object.entries(data?.components || {}).map(([name, value]) => ({
    name: name.toUpperCase(),
    value: Number(value.toFixed(1))
  }));

  return (
    <section className="panel p-5">
      <p className="section-title">Pollutant concentration</p>
      <h2 className="text-lg font-bold">Component analysis</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0d9488" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
