import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchCityAirQuality } from "../../features/airQuality/airQualityThunks";
import { useDebounce } from "../../hooks/useDebounce";

export default function CitySearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 600);
  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedQuery.trim().length >= 3) {
      dispatch(searchCityAirQuality(debouncedQuery.trim()));
    }
  }, [debouncedQuery, dispatch]);

  return (
    <div className="panel p-4">
      <label htmlFor="city-search" className="text-sm font-semibold">
        Search monitoring location
      </label>
      <input
        id="city-search"
        className="input mt-2"
        value={query}
        placeholder="Try Delhi, Noida, Gurugram..."
        onChange={(event) => setQuery(event.target.value)}
      />
      <p className="mt-2 text-xs text-slate-500">Debounced search prevents unnecessary API requests while typing.</p>
    </div>
  );
}
