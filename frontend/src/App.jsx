import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile';
import Family from './pages/Family';
import Documents from './pages/Documents';
import OCRScan from './pages/OCR';
import Schemes from './pages/Schemes';
import ApplyScheme from './pages/ApplyScheme';
import Applications from './pages/Applications';
import AdminPanel from './pages/Admin';
import NotFound from './pages/NotFound';
import AppShell from './components/Layout/AppShell';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy text-white">
        <div className="rounded-3xl border border-white/10 bg-ocean/90 px-8 py-10 text-center shadow-panel">
          <p className="text-xl font-semibold">Loading your dashboard…</p>
          <p className="mt-2 text-sm text-slate-300">Securing your session for government services.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppShell>
                <Dashboard />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppShell>
                <Profile />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/family"
          element={
            <ProtectedRoute>
              <AppShell>
                <Family />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <AppShell>
                <Documents />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ocr"
          element={
            <ProtectedRoute>
              <AppShell>
                <OCRScan />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/schemes"
          element={
            <ProtectedRoute>
              <AppShell>
                <Schemes />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply/:schemeId"
          element={
            <ProtectedRoute>
              <AppShell>
                <ApplyScheme />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <AppShell>
                <Applications />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AppShell>
                <AdminPanel />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
