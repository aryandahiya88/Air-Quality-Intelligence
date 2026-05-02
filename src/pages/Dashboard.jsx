import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AQICard from "../components/dashboard/AQICard";
import AQIChart from "../components/dashboard/AQIChart";
import ActionPlan from "../components/dashboard/ActionPlan";
import CitySearch from "../components/dashboard/CitySearch";
import HealthAdvice from "../components/dashboard/HealthAdvice";
import NcrOverview from "../components/dashboard/NcrOverview";
import PollutantMix from "../components/dashboard/PollutantMix";
import PollutantGrid from "../components/dashboard/PollutantGrid";
import RefreshControls from "../components/dashboard/RefreshControls";
import RiskGauge from "../components/dashboard/RiskGauge";
import StatStrip from "../components/dashboard/StatStrip";
import TrendChart from "../components/dashboard/TrendChart";
import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";
import { addFavoriteCity } from "../features/favorites/favoritesSlice";
import { fetchCityAirQuality, fetchComparisonCities } from "../features/airQuality/airQualityThunks";
import { NCR_CITIES } from "../utils/constants";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { current, comparison, loading, error, selectedCity } = useSelector((state) => state.airQuality);

  useEffect(() => {
    if (!current) dispatch(fetchCityAirQuality(NCR_CITIES[0]));
    if (!comparison.length) dispatch(fetchComparisonCities(NCR_CITIES));
  }, [comparison.length, current, dispatch]);

  const retry = useCallback(() => {
    dispatch(fetchCityAirQuality(selectedCity));
  }, [dispatch, selectedCity]);

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="section-title">Live environmental operations view</p>
          <h2 className="text-3xl font-black">Delhi NCR Air Quality Dashboard</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Real-time API mode when configured, realistic demo intelligence otherwise.</p>
        </div>
        <RefreshControls />
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <CitySearch />
        <HealthAdvice aqi={current?.aqi || 3} />
      </div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={retry} />}
      {current && !loading && (
        <>
          <AQICard data={current} />
          <StatStrip data={current} />
          <div className="flex">
            <button className="btn-secondary" onClick={() => dispatch(addFavoriteCity(current))}>
              Add to favorites
            </button>
          </div>
          <PollutantGrid components={current.components} />
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
            <TrendChart trend={current.trend} />
            <RiskGauge score={current.riskScore} />
          </div>
          <div className="grid gap-5 xl:grid-cols-2">
            <AQIChart data={current} />
            <PollutantMix components={current.components} />
          </div>
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
            <NcrOverview cities={comparison.length ? comparison : [current]} />
            <ActionPlan aqi={current.aqi} />
          </div>
        </>
      )}
    </div>
  );
}
