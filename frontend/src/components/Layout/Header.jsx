import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiBell, FiLogOut } from 'react-icons/fi';

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 lg:px-8">
        <Link to="/" className="text-xl font-semibold text-navy">
          SchemeSeva
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 md:flex">
            <FiBell className="text-slate-500" />
            <span>Citizen portal</span>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden flex-col items-end md:flex">
                <span className="text-sm font-semibold text-navy">{user.email?.split('@')[0]}</span>
                <span className="text-xs text-slate-500">{user.email}</span>
              </div>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 rounded-2xl bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-ocean shadow-md hover:shadow-lg"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
