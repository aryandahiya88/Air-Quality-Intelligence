import { useSelector } from "react-redux";
import { getHealthAdvice } from "../../utils/aqiUtils";

export default function HealthAdvice({ aqi }) {
  const userGroup = useSelector((state) => state.preferences.userGroup);

  return (
    <section className="panel p-5">
      <p className="text-sm font-medium uppercase tracking-wide text-teal-600">Health recommendation</p>
      <p className="mt-2 text-lg font-semibold">{getHealthAdvice(aqi, userGroup)}</p>
    </section>
  );
}
