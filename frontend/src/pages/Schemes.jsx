import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import SchemeCard from '../components/schemes/SchemeCard';
import toast from 'react-hot-toast';
import { mockSchemes } from '../data/mockSchemes';

const PROFILE_STORAGE_KEY = 'gov-scheme-profile';

const requiredFields = [
  'full_name', 'dob', 'gender', 'address', 'state', 'district', 'phone', 'occupation', 'annual_income', 'caste_category', 'disability_status', 'education_level', 'farmer_status'
];

function isProfileComplete(profile) {
  return requiredFields.every(field => profile[field] && profile[field].toString().trim() !== '');
}

export default function Schemes() {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileIncomplete, setProfileIncomplete] = useState(false);
  const [filterEligible, setFilterEligible] = useState(false);

  useEffect(() => {
    const profile = JSON.parse(sessionStorage.getItem(PROFILE_STORAGE_KEY) || '{}');
    if (!isProfileComplete(profile)) {
      setProfileIncomplete(true);
    } else {
      setProfileIncomplete(false);
    }
    const loadSchemes = async () => {
      try {
        setLoading(true);
        const response = await api.get('/schemes');
        const fetchedSchemes = response.data.schemes || [];
        setSchemes(fetchedSchemes.length > 0 ? fetchedSchemes : mockSchemes);
      } catch (error) {
        console.error(error);
        toast.error('Unable to load schemes; showing sample recommendations.');
        setSchemes(mockSchemes);
      } finally {
        setLoading(false);
      }
    };
    loadSchemes();
  }, [navigate]);

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
              <p className="text-sm opacity-90">Matched schemes might be inaccurate until you complete your profile.</p>
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
      <div className="rounded-3xl bg-gradient-to-r from-navy to-ocean p-6 text-white shadow-panel">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Explore Schemes</h1>
            <p className="mt-2 text-slate-200">Review all available government schemes or filter for your best matches.</p>
          </div>
          <div className="inline-flex rounded-xl bg-white/10 p-1 backdrop-blur-sm">
            <button
              onClick={() => setFilterEligible(false)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                !filterEligible ? 'bg-white text-navy shadow-sm' : 'text-white hover:bg-white/5'
              }`}
            >
              All Schemes
            </button>
            <button
              onClick={() => setFilterEligible(true)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                filterEligible ? 'bg-white text-navy shadow-sm' : 'text-white hover:bg-white/5'
              }`}
            >
              Eligible
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        {loading ? (
          <div className="rounded-3xl bg-white p-6 text-slate-600 shadow-panel">Loading schemes…</div>
        ) : (filterEligible ? schemes.filter(s => s.confidence >= 40) : schemes).length ? (
          (filterEligible ? schemes.filter(s => s.confidence >= 40) : schemes).map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} showApply />
          ))
        ) : (
          <div className="rounded-3xl bg-white p-6 text-slate-600 shadow-panel">
            {filterEligible ? 'No eligible schemes found for your current profile.' : 'No schemes available yet.'}
          </div>
        )}
      </div>
    </section>
  );
}
