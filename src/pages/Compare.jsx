import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompareChart from "../components/comparison/CompareChart";
import CompareTable from "../components/comparison/CompareTable";
import ComparisonInsights from "../components/comparison/ComparisonInsights";
import PollutantRadar from "../components/comparison/PollutantRadar";
import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";
import { fetchComparisonCities } from "../features/airQuality/airQualityThunks";
import { setFilterCategory, setSortBy } from "../features/ui/uiSlice";
import { NCR_CITIES } from "../utils/constants";

export default function Compare() {
  const dispatch = useDispatch();
  const { comparison, comparisonLoading, error } = useSelector((state) => state.airQuality);
  const { sortBy, filterCategory } = useSelector((state) => state.ui);

  useEffect(() => {
    if (!comparison.length) dispatch(fetchComparisonCities(NCR_CITIES));
  }, [comparison.length, dispatch]);

  const visibleCities = useMemo(() => {
    let data = [...comparison];
    if (filterCategory !== "all") data = data.filter((city) => String(city.aqi) === filterCategory);
    return data.sort((a, b) => (sortBy === "aqi-asc" ? a.aqi - b.aqi : b.aqi - a.aqi));
  }, [comparison, filterCategory, sortBy]);

  return (
    <div className="grid gap-5">
      <div>
        <p className="section-title">Regional analytics</p>
        <h2 className="text-3xl font-black">Multi-city AQI Comparison</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Rank Delhi NCR cities, isolate pollution hotspots, and compare pollutant fingerprints.</p>
      </div>
      <div className="panel flex flex-col gap-3 p-4 sm:flex-row">
        <select className="input" value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
          <option value="aqi-desc">Highest AQI first</option>
          <option value="aqi-asc">Lowest AQI first</option>
        </select>
        <select className="input" value={filterCategory} onChange={(e) => dispatch(setFilterCategory(e.target.value))}>
          <option value="all">All AQI levels</option>
          <option value="1">Good</option>
          <option value="2">Fair</option>
          <option value="3">Moderate</option>
          <option value="4">Poor</option>
          <option value="5">Very Poor</option>
        </select>
        <button className="btn-primary" onClick={() => dispatch(fetchComparisonCities(NCR_CITIES))}>Refresh</button>
      </div>
      {comparisonLoading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={() => dispatch(fetchComparisonCities(NCR_CITIES))} />}
      {!!visibleCities.length && (
        <>
          <ComparisonInsights cities={visibleCities} />
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
            <CompareChart cities={visibleCities} />
            <PollutantRadar cities={visibleCities} />
          </div>
          <CompareTable cities={visibleCities} />
        </>
      )}
    </div>
  );
}
