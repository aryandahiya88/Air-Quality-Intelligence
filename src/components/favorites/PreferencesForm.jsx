import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePreferences } from "../../features/preferences/preferencesSlice";

export default function PreferencesForm() {
  const preferences = useSelector((state) => state.preferences);
  const [form, setForm] = useState(preferences);
  const dispatch = useDispatch();

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(updatePreferences(form));
  }

  return (
    <form className="panel grid gap-4 p-5 sm:grid-cols-2" onSubmit={handleSubmit}>
      <label className="text-sm font-medium">
        Default city
        <input className="input mt-2" value={form.defaultCity} onChange={(e) => updateField("defaultCity", e.target.value)} />
      </label>
      <label className="text-sm font-medium">
        Refresh interval
        <select className="input mt-2" value={form.refreshInterval} onChange={(e) => updateField("refreshInterval", Number(e.target.value))}>
          <option value={5}>5 minutes</option>
          <option value={10}>10 minutes</option>
          <option value={15}>15 minutes</option>
          <option value={30}>30 minutes</option>
        </select>
      </label>
      <label className="text-sm font-medium">
        User group
        <select className="input mt-2" value={form.userGroup} onChange={(e) => updateField("userGroup", e.target.value)}>
          <option value="general">General</option>
          <option value="asthma">Asthma patient</option>
          <option value="elderly">Elderly</option>
          <option value="children">Children</option>
          <option value="workers">Outdoor workers</option>
        </select>
      </label>
      <label className="text-sm font-medium">
        Theme
        <select className="input mt-2" value={form.theme} onChange={(e) => updateField("theme", e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <div className="sm:col-span-2">
        <button className="btn-primary" type="submit">Save preferences</button>
      </div>
    </form>
  );
}
