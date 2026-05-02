import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/common/Navbar";
import ErrorBoundary from "./components/common/ErrorBoundary";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const theme = useSelector((state) => state.preferences.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-950 transition dark:bg-slate-950 dark:text-slate-50">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <AppRoutes />
        </main>
      </div>
    </ErrorBoundary>
  );
}
