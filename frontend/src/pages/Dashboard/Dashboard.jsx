import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import StatCard from '../../components/cards/StatCard';
import NotificationPanel from '../../components/notifications/NotificationPanel';
import SchemeCard from '../../components/schemes/SchemeCard';
import ApplicationTimeline from '../../components/notifications/ApplicationTimeline';
import toast from 'react-hot-toast';

import { loadLocalApplications, mergeApplications, PROFILE_STORAGE_KEY, isProfileComplete } from '../../utils/storage';

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({ schemes: [], applications: [], notifications: [], summary: {} });
  const [loading, setLoading] = useState(false);
  const [profileIncomplete, setProfileIncomplete] = useState(false);
  const [filterEligible, setFilterEligible] = useState(true);

  useEffect(() => {
    const profile = JSON.parse(sessionStorage.getItem(PROFILE_STORAGE_KEY) || '{}');
    if (!isProfileComplete(profile)) {
      setProfileIncomplete(true);
      // toast removed to avoid spamming on every mount
    } else {
      setProfileIncomplete(false);
    }

    const loadDashboard = async () => {
      try {
        setLoading(true);
        const response = await api.get('/dashboard');
        const localApps = loadLocalApplications();
        const mergedApplications = mergeApplications(response.data.applications || [], localApps);
        setDashboard({
          ...response.data,
          applications: mergedApplications,
          summary: {
            ...response.data.summary,
            appliedSchemes: mergedApplications.length,
          },
        });
      } catch (error) {
        console.error(error);
        const localApps = loadLocalApplications();
        setDashboard({
          schemes: [
            { 
              id: 'mock-1', 
              name: 'Unified Citizen Support Plan', 
              confidence: 92, 
              benefits: '₹5000/month subsidy',
              eligibility_rules: { occupations: ['Student', 'Unemployed'], education_levels: ['High School', 'Graduate'], states: ['Delhi', 'Maharashtra'] }
            },
            { 
              id: 'mock-3', 
              name: 'Youth Education Uplift Scheme', 
              confidence: 84, 
              benefits: 'Tuition waiver',
              eligibility_rules: { education_levels: ['High School'], states: ['Bihar', 'Uttar Pradesh'], min_income: 300000 }
            }
          ],
          allSchemes: [
            { id: 'mock-1', name: 'Unified Citizen Support Plan', confidence: 92, eligibility_rules: { occupations: ['Student', 'Unemployed'] } },
            { id: 'mock-2', name: 'Rural Farmer Income Guarantee', confidence: 15, eligibility_rules: { farmer_required: true, states: ['Punjab', 'Haryana'] } },
            { id: 'mock-3', name: 'Youth Education Uplift Scheme', confidence: 84, eligibility_rules: { education_levels: ['High School'] } },
            { id: 'mock-4', name: 'Senior Pension Yojana', confidence: 10, eligibility_rules: { max_age: 60 } }
          ],
          applications: localApps,
          notifications: [
            { id: 'n1', title: 'Welcome!', message: 'Complete your profile to see more schemes.', category: 'System' }
          ],
          summary: {
            eligibleSchemes: 5,
            appliedSchemes: localApps.length + 2,
            pendingDocuments: 3,
          },
        });
        toast.error('Using fallback data for demonstration.');
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, [navigate]);

  const { schemes, applications, notifications, summary } = dashboard;

  return (
    <section className="space-y-6">
      {profileIncomplete && (
        <div className="flex items-center justify-between rounded-2xl bg-amber-50 border border-amber-200 p-4 text-amber-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-amber-100 p-2">
              <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Profile Incomplete</p>
              <p className="text-sm opacity-90">Please complete your profile to get accurate scheme recommendations.</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/profile')}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors"
          >
            Complete Profile
          </button>
        </div>
      )}
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard title="Eligible schemes" value={summary.eligibleSchemes || 0} accent="from-navy to-ocean" />
        <StatCard title="Applied schemes" value={summary.appliedSchemes || 0} accent="from-navy to-ocean" />
        <StatCard title="Pending documents" value={summary.pendingDocuments || 0} accent="from-navy to-ocean" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="col-span-full rounded-3xl bg-white p-6 shadow-panel lg:col-span-2">
           <div className="mb-4 flex items-center justify-between">
             <div>
               <h2 className="text-xl font-semibold text-slate-900">
                 {filterEligible ? 'Recommended Schemes' : 'All Schemes'}
               </h2>
               <p className="text-sm text-slate-500">
                 {filterEligible 
                   ? 'Review your eligible schemes with deadlines and expected benefits.' 
                   : 'Explore all government schemes available on the platform.'}
               </p>
             </div>
             <div className="inline-flex rounded-xl bg-slate-100 p-1">
               <button
                 onClick={() => setFilterEligible(false)}
                 className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                   !filterEligible ? 'bg-white text-navy shadow-sm' : 'text-slate-500 hover:text-navy'
                 }`}
               >
                 All
               </button>
               <button
                 onClick={() => setFilterEligible(true)}
                 className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                   filterEligible ? 'bg-navy text-white shadow-sm' : 'text-slate-500 hover:text-navy'
                 }`}
               >
                 Eligible
               </button>
             </div>
           </div>
          <div className="space-y-4">
             {loading ? (
               <p className="text-slate-500">Loading schemes…</p>
             ) : (filterEligible ? schemes : dashboard.allSchemes || []).length ? (
               (filterEligible ? schemes : dashboard.allSchemes || []).slice(0, 5).map((scheme) => (
                 <SchemeCard key={scheme.id} scheme={scheme} />
               ))
             ) : (
               <p className="text-slate-500">
                 {filterEligible 
                   ? 'No eligible schemes found yet. Complete your profile and documents.' 
                   : 'No schemes available yet.'}
               </p>
             )}
          </div>
        </div>
        <NotificationPanel notifications={notifications} />
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-panel">
        <h2 className="text-xl font-semibold text-slate-900">Application Progress</h2>
        <p className="mt-2 text-sm text-slate-500">Track your latest submissions and status updates.</p>
        <div className="mt-6 space-y-4">
          {applications.length ? (
            applications.map((app) => <ApplicationTimeline key={app.id} application={app} />)
          ) : (
            <p className="text-slate-500">No applications submitted yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
