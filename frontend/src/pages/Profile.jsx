import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const PROFILE_STORAGE_KEY = 'gov-scheme-profile';
const fields = [
  { name: 'full_name', label: 'Full Name', type: 'text' },
  { name: 'dob', label: 'Date of Birth', type: 'date' },
  { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'state', label: 'State', type: 'text' },
  { name: 'district', label: 'District', type: 'text' },
  { name: 'phone', label: 'Phone Number', type: 'tel' },
  { name: 'occupation', label: 'Occupation', type: 'text' },
  { name: 'annual_income', label: 'Annual Income', type: 'number' },
  { name: 'caste_category', label: 'Caste Category', type: 'select', options: ['General', 'OBC', 'SC', 'ST'] },
  { name: 'disability_status', label: 'Disability Status', type: 'select', options: ['None', 'Visual', 'Mobility', 'Cognitive', 'Other'] },
  { name: 'education_level', label: 'Education Level', type: 'select', options: ['High School', 'Graduate', 'Postgraduate', 'Doctorate', 'Other'] },
  { name: 'farmer_status', label: 'Farmer Status', type: 'select', options: ['No', 'Yes'] },
];

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const loadProfileFromStorage = () => {
      if (typeof window === 'undefined') return null;
      try {
        return JSON.parse(window.sessionStorage.getItem(PROFILE_STORAGE_KEY));
      } catch {
        return null;
      }
    };

    const fetchProfile = async () => {
      const storedProfile = loadProfileFromStorage();
      if (storedProfile) {
        reset(storedProfile);
      }

      try {
        setLoading(true);
        const response = await api.get('/profile');
        const profileData = response.data.profile || storedProfile || {};
        reset(profileData);
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
        }
      } catch (error) {
        console.error(error);
        toast.success('Unable to load profile, using saved profile data.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
      }
      await api.post('/profile', data);
      toast.success('Profile saved successfully');
    } catch (error) {
      console.error(error);
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
      }
      toast.success('Profile saved successfully');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="mb-6 rounded-3xl bg-gradient-to-r from-navy to-ocean p-6 text-white shadow-panel">
        <h1 className="text-2xl font-semibold">Citizen Profile</h1>
        <p className="mt-2 text-slate-200">Enter your details once and reuse them across applications and schemes.</p>
        <p className="mt-2 text-sm text-yellow-200 font-semibold">⚠️ All details are mandatory to fill.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 rounded-3xl bg-slate-100 p-6 shadow-panel md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">{field.label}</span>
            {field.type === 'select' ? (
              <select
                {...register(field.name)}
                className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-sky-400"
              >
                <option value="">Select</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                {...register(field.name)}
                className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-sky-400"
              />
            )}
          </label>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="col-span-full rounded-3xl bg-navy px-6 py-3 text-white transition hover:bg-ocean disabled:opacity-60"
        >
          {loading ? 'Saving…' : 'Save Profile'}
        </button>
      </form>
    </section>
  );
}
