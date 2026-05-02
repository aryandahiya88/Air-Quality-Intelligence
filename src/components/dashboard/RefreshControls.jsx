import { useDispatch, useSelector } from "react-redux";
import { fetchCityAirQuality } from "../../features/airQuality/airQualityThunks";

export default function RefreshControls() {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.airQuality.selectedCity);
  const loading = useSelector((state) => state.airQuality.loading);

  return (
    <button className="btn-primary" disabled={loading} onClick={() => dispatch(fetchCityAirQuality(selectedCity))}>
      {loading ? "Refreshing..." : "Refresh data"}
    </button>
  );
}
