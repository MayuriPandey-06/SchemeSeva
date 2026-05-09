import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { mockSchemes } from '../data/mockSchemes';
import toast from 'react-hot-toast';

const PROFILE_STORAGE_KEY = 'gov-scheme-profile';
const FAMILY_STORAGE_KEY = 'gov-scheme-family';
const APPLICATIONS_STORAGE_KEY = 'gov-scheme-applications';

function loadSessionData(key) {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(window.sessionStorage.getItem(key));
  } catch {
    return null;
  }
}

function saveSessionData(key, value) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(key, JSON.stringify(value));
}

function saveLocalApplication(application) {
  const existing = loadSessionData(APPLICATIONS_STORAGE_KEY) || [];
  const updated = [application, ...existing];
  saveSessionData(APPLICATIONS_STORAGE_KEY, updated);
}

export default function ApplyScheme() {
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [scheme, setScheme] = useState(null);
  const [profile, setProfile] = useState({});
  const [family, setFamily] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadScheme = async () => {
      try {
        const response = await api.get('/schemes');
        const schemes = response.data.schemes || mockSchemes;
        setScheme(schemes.find((item) => item.id === schemeId) || mockSchemes.find((item) => item.id === schemeId));
      } catch (error) {
        setScheme(mockSchemes.find((item) => item.id === schemeId));
      }
    };

    const loadProfile = async () => {
      const storedProfile = loadSessionData(PROFILE_STORAGE_KEY) || {};
      if (Object.keys(storedProfile).length > 0) {
        setProfile(storedProfile);
        reset({
          full_name: storedProfile.full_name || '',
          address: storedProfile.address || '',
          phone: storedProfile.phone || '',
          occupation: storedProfile.occupation || '',
          annual_income: storedProfile.annual_income || '',
          comments: '',
        });
      }
      try {
        const response = await api.get('/profile');
        const data = response.data.profile || {};
        const merged = { ...storedProfile, ...data };
        setProfile(merged);
        reset({
          full_name: merged.full_name || '',
          address: merged.address || '',
          phone: merged.phone || '',
          occupation: merged.occupation || '',
          annual_income: merged.annual_income || '',
          comments: '',
        });
      } catch (error) {
        if (!storedProfile.full_name) {
          reset({ full_name: '', address: '', phone: '', occupation: '', annual_income: '', comments: '' });
        }
      }
    };

    const loadFamily = async () => {
      const storedFamily = loadSessionData(FAMILY_STORAGE_KEY) || [];
      setFamily(storedFamily);
      try {
        const response = await api.get('/family');
        const data = response.data.family || [];
        setFamily(data);
        saveSessionData(FAMILY_STORAGE_KEY, data);
      } catch (error) {
        // already using local family
      }
    };

    loadScheme();
    loadProfile();
    loadFamily();
  }, [schemeId, reset]);

  const saveApplication = async (status, applicationDetails) => {
    const payload = {
      scheme_id: schemeId,
      status,
      comments: applicationDetails.comments || '',
      form_data: {
        full_name: applicationDetails.full_name,
        address: applicationDetails.address,
        phone: applicationDetails.phone,
        occupation: applicationDetails.occupation,
        annual_income: applicationDetails.annual_income,
        family_members: family,
      },
    };

    const localApplication = {
      id: `${schemeId}-${Date.now()}`,
      scheme_name: scheme?.name || 'Selected Scheme',
      status,
      submitted_at: new Date().toISOString(),
      comments: payload.comments,
      form_data: payload.form_data,
    };

    try {
      setLoading(true);
      await api.post('/applications', payload);
      saveLocalApplication(localApplication);
      toast.success(status === 'Rejected' ? 'Application rejected and saved.' : 'Application submitted successfully.');
      navigate('/applications');
    } catch (error) {
      console.error(error);
      saveLocalApplication(localApplication);
      toast.success('Application saved locally.');
      navigate('/applications');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    await saveApplication('Submitted', data);
  };

  const onReject = async () => {
    const currentData = { ...profile, comments: 'User rejected this application.' };
    await saveApplication('Rejected', currentData);
  };

  if (!scheme) {
    return (
      <section className="rounded-3xl bg-white p-6 shadow-panel">
        <h1 className="text-xl font-semibold text-slate-900">Scheme not found</h1>
        <p className="mt-2 text-slate-500">The requested scheme could not be loaded. Please select another scheme from the list.</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-navy to-ocean p-6 text-white shadow-panel">
        <h1 className="text-2xl font-semibold">Apply for {scheme.name}</h1>
        <p className="mt-2 text-slate-200">Review the scheme details and submit your application or reject it.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl bg-white p-6 shadow-panel">
          <h2 className="text-lg font-semibold text-slate-900">Applicant Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            {['full_name', 'address', 'phone', 'occupation', 'annual_income'].map((field) => (
              <label key={field} className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">{field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</span>
                <input
                  type={field === 'annual_income' || field === 'phone' ? 'text' : 'text'}
                  {...register(field)}
                  className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400"
                />
              </label>
            ))}
            <label className="space-y-2 text-sm text-slate-700">
              <span className="font-medium">Additional comments</span>
              <textarea
                {...register('comments')}
                rows={4}
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400"
                placeholder="Add context or supporting details for your application"
              />
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" disabled={loading} className="rounded-3xl bg-navy px-6 py-3 text-white transition hover:bg-ocean disabled:opacity-60">
                {loading ? 'Submitting…' : 'Apply Now'}
              </button>
              <button type="button" onClick={onReject} disabled={loading} className="rounded-3xl border border-rose-500 px-6 py-3 text-rose-600 transition hover:bg-rose-50 disabled:opacity-60">
                {loading ? 'Processing…' : 'Reject Application'}
              </button>
            </div>
          </form>
        </div>
        <aside className="rounded-3xl bg-white p-6 shadow-panel">
          <h2 className="text-lg font-semibold text-slate-900">Scheme Overview</h2>
          <p className="mt-3 text-slate-600">{scheme.description}</p>
          <div className="mt-6 space-y-3 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
            <div>
              <p className="font-semibold text-slate-900">Benefits</p>
              <p className="mt-1">{scheme.benefits}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Required Documents</p>
              <p className="mt-1">{scheme.required_documents}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Deadline</p>
              <p className="mt-1">{scheme.deadline ? new Date(scheme.deadline).toLocaleDateString() : 'Open until further notice'}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Family members included</p>
              <p className="mt-1">{family.length} member(s) saved</p>
            </div>
          </div>
          <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
            <h3 className="font-semibold text-slate-900">Saved family members</h3>
            {family.length ? (
              family.map((member) => (
                <div key={member.id || member.name} className="mt-3 border-b border-slate-200 pb-3">
                  <p className="font-medium text-slate-900">{member.name}</p>
                  <p className="text-sm">{member.relation} • Age {member.age}</p>
                </div>
              ))
            ) : (
              <p className="mt-3 text-slate-500">No family members saved yet. Add them on the Family page.</p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
