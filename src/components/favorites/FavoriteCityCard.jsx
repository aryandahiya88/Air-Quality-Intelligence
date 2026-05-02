import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFavoriteCity, updateFavoriteCity } from "../../features/favorites/favoritesSlice";

export default function FavoriteCityCard({ city }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(city.notes || "");
  const [priority, setPriority] = useState(city.priority || "medium");

  function saveChanges() {
    dispatch(updateFavoriteCity({ id: city.id, updates: { notes, priority } }));
    setIsEditing(false);
  }

  return (
    <article className="panel p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">{city.name}</h3>
          <p className="text-sm text-slate-500">
            {city.state || city.zone || "Delhi NCR"}, {city.country}
          </p>
        </div>
        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold capitalize dark:bg-slate-800">{city.priority || "medium"}</span>
      </div>

      {isEditing ? (
        <div className="mt-4 grid gap-3">
          <label className="text-sm font-medium">
            Priority
            <select className="input mt-2" value={priority} onChange={(event) => setPriority(event.target.value)}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label className="text-sm font-medium">
            Monitoring note
            <textarea className="input mt-2 min-h-24" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Example: Track before morning commute" />
          </label>
          <div className="flex gap-2">
            <button className="btn-primary" onClick={saveChanges}>Save</button>
            <button className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-4 min-h-10 text-sm text-slate-600 dark:text-slate-300">{city.notes || "No monitoring note added yet."}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn-secondary" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn-secondary" onClick={() => dispatch(removeFavoriteCity(city.id))}>Remove</button>
          </div>
        </>
      )}
    </article>
  );
}
