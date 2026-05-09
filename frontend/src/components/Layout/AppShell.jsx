import Header from './Header';
import Sidebar from './Sidebar';

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
      <Header />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
        <Sidebar />
        <main className="w-full rounded-3xl bg-white p-6 shadow-panel lg:order-last lg:w-4/5">
          {children}
        </main>
      </div>
    </div>
  );
}
