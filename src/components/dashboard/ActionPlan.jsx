import { getActionPlan } from "../../utils/aqiUtils";

export default function ActionPlan({ aqi }) {
  return (
    <section className="panel p-5">
      <p className="section-title">Action plan</p>
      <h2 className="text-lg font-bold">Recommended next steps</h2>
      <div className="mt-4 grid gap-3">
        {getActionPlan(aqi).map((item, index) => (
          <div key={item} className="flex gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-teal-600 text-sm font-bold text-white">{index + 1}</span>
            <p className="text-sm font-medium">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
