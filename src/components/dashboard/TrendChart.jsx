import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function TrendChart({ trend = [] }) {
  return (
    <section className="panel p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-title">Short-term trend</p>
          <h2 className="text-lg font-bold">PM movement forecast</h2>
        </div>
        <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          Demo forecast
        </span>
      </div>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="pm25" name="PM2.5" stroke="#0d9488" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="pm10" name="PM10" stroke="#f97316" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
