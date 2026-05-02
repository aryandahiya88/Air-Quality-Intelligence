import PreferencesForm from "../components/favorites/PreferencesForm";

export default function Settings() {
  return (
    <div className="grid gap-5">
      <div>
        <p className="section-title">Personalization</p>
        <h2 className="text-3xl font-black">User Preferences</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Update operation for theme, default city, refresh interval, and health profile.</p>
      </div>
      <PreferencesForm />
    </div>
  );
}
