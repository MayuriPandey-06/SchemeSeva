import { useEffect, useState } from 'react';
import api from '../services/api';
import ApplicationTimeline from '../components/notifications/ApplicationTimeline';
import toast from 'react-hot-toast';

const APPLICATIONS_STORAGE_KEY = 'gov-scheme-applications';

function loadLocalApplications() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.sessionStorage.getItem(APPLICATIONS_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        const response = await api.get('/applications');
        const remoteApps = response.data.applications || [];
        const localApps = loadLocalApplications();
        const merged = [...remoteApps];
        localApps.forEach((app) => {
          if (!merged.find((remote) => remote.id === app.id)) merged.unshift(app);
        });
        setApplications(merged);
      } catch (error) {
        console.error(error);
        const localApps = loadLocalApplications();
        setApplications(localApps);
        toast.error('Unable to load applications; showing saved entries.');
      } finally {
        setLoading(false);
      }
    };
    loadApplications();
  }, []);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-navy to-ocean p-6 text-white shadow-panel">
        <h1 className="text-2xl font-semibold">Application Tracking</h1>
        <p className="mt-2 text-slate-200">View the status of every scheme application you submitted.</p>
      </div>
      <div className="grid gap-6">
        {loading ? (
          <div className="rounded-3xl bg-white p-6 text-slate-600 shadow-panel">Loading applications…</div>
        ) : applications.length ? (
          applications.map((application) => (
            <ApplicationTimeline key={application.id} application={application} />
          ))
        ) : (
          <div className="rounded-3xl bg-white p-6 text-slate-600 shadow-panel">You have not submitted any applications.</div>
        )}
      </div>
    </section>
  );
}
