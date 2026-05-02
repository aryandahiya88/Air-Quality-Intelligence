import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card p-8 text-center">
      <h2 className="text-2xl font-bold">Page not found</h2>
      <Link className="btn-primary mt-4" to="/">Go to dashboard</Link>
    </div>
  );
}
