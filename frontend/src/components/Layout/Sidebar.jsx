import { NavLink } from 'react-router-dom';
import { FiHome, FiUser, FiUsers, FiFileText, FiCamera, FiShield, FiClipboard, FiSettings } from 'react-icons/fi';

const nav = [
  { label: 'Dashboard', path: '/', icon: FiHome },
  { label: 'Profile', path: '/profile', icon: FiUser },
  { label: 'Family', path: '/family', icon: FiUsers },
  { label: 'Documents', path: '/documents', icon: FiFileText },
  { label: 'OCR', path: '/ocr', icon: FiCamera },
  { label: 'Schemes', path: '/schemes', icon: FiShield },
  { label: 'Applications', path: '/applications', icon: FiClipboard },
  { label: 'Admin', path: '/admin', icon: FiSettings },
];

export default function Sidebar() {
  return (
    <aside className="w-full rounded-3xl border border-slate-200 bg-slate-950/5 p-5 shadow-panel lg:w-1/5">
      <div className="space-y-4">
        <div className="rounded-3xl bg-gradient-to-br from-navy to-ocean p-5 text-white shadow-lg">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-200">Government Scheme Hub</p>
          <h2 className="mt-3 text-xl font-semibold">Citizen Control Panel</h2>
          <p className="mt-2 text-sm text-slate-200">One profile, all service forms filled automatically.</p>
        </div>
        <nav className="space-y-1">
          {nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-navy text-white shadow-lg' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
