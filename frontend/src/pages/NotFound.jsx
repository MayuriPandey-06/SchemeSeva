import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="rounded-3xl border border-white/10 bg-navy/95 p-10 text-center shadow-panel">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="mt-4 text-lg text-slate-300">Page not found.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-600">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
