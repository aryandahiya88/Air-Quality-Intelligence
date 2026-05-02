import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteCityCard from "../components/favorites/FavoriteCityCard";
import { setPage } from "../features/ui/uiSlice";

const PAGE_SIZE = 6;

export default function Favorites() {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.favorites.cities);
  const page = useSelector((state) => state.ui.page);
  const totalPages = Math.max(1, Math.ceil(cities.length / PAGE_SIZE));

  const pageCities = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return cities.slice(start, start + PAGE_SIZE);
  }, [cities, page]);

  return (
    <div className="grid gap-5">
      <div>
        <p className="section-title">Saved monitoring watchlist</p>
        <h2 className="text-3xl font-black">Favorite Cities</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">CRUD demonstration with editable priority and monitoring notes for each city.</p>
      </div>
      {!cities.length && <div className="panel p-6 text-slate-500">No favorite cities saved yet. Add cities from the dashboard to create your watchlist.</div>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pageCities.map((city) => <FavoriteCityCard key={city.id} city={city} />)}
      </div>
      {!!cities.length && (
        <div className="flex items-center justify-between">
          <button className="btn-secondary" disabled={page === 1} onClick={() => dispatch(setPage(page - 1))}>Previous</button>
          <span className="text-sm">Page {page} of {totalPages}</span>
          <button className="btn-secondary" disabled={page === totalPages} onClick={() => dispatch(setPage(page + 1))}>Next</button>
        </div>
      )}
    </div>
  );
}
