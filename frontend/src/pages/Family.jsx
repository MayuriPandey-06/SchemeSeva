import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import toast from 'react-hot-toast';

const FAMILY_STORAGE_KEY = 'gov-scheme-family';

function loadFamilyFromStorage() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.sessionStorage.getItem(FAMILY_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFamilyToStorage(family) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(FAMILY_STORAGE_KEY, JSON.stringify(family));
}

export default function Family() {
  const [family, setFamily] = useState([]);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const loadFamily = async () => {
    const storedFamily = loadFamilyFromStorage();
    if (storedFamily.length) {
      setFamily(storedFamily);
    }

    try {
      const response = await api.get('/family');
      const payload = response.data.family || [];
      setFamily(payload);
      saveFamilyToStorage(payload);
    } catch (error) {
      console.error(error);
      if (!storedFamily.length) {
        toast.error('Unable to load family members');
      }
    }
  };

  useEffect(() => {
    loadFamily();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await api.put(`/family/${editing.id}`, data);
        toast.success('Family member updated');
      } else {
        await api.post('/family', data);
        toast.success('Family member added');
      }
      reset();
      setEditing(null);
      loadFamily();
    } catch (error) {
      console.error(error);
      const updatedFamily = editing
        ? family.map((item) => (item.id === editing.id ? { ...item, ...data } : item))
        : [{ ...data, id: `${data.name}-${Date.now()}` }, ...family];
      setFamily(updatedFamily);
      saveFamilyToStorage(updatedFamily);
      reset();
      setEditing(null);
      toast.success('Family member saved locally');
    }
  };

  const onEdit = (member) => {
    setEditing(member);
    reset(member);
  };

  const onDelete = async (id) => {
    try {
      await api.delete(`/family/${id}`);
      toast.success('Family member removed');
      loadFamily();
    } catch (error) {
      console.error(error);
      const updatedFamily = family.filter((member) => member.id !== id);
      setFamily(updatedFamily);
      saveFamilyToStorage(updatedFamily);
      toast.success('Family member removed locally');
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-navy to-ocean p-6 text-white shadow-panel">
        <h1 className="text-2xl font-semibold">Family Profile</h1>
        <p className="mt-2 text-slate-200">Add family members for additional scheme recommendations.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-3xl bg-white p-6 shadow-panel">
          <h2 className="text-lg font-semibold text-slate-900">Add / Edit Member</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
            {['name', 'age', 'relation', 'occupation', 'education', 'income'].map((field) => (
              <label key={field} className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                <input
                  {...register(field, { required: true })}
                  type={field === 'age' || field === 'income' ? 'number' : 'text'}
                  className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400"
                />
              </label>
            ))}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="rounded-3xl bg-navy px-6 py-3 text-white transition hover:bg-ocean" type="submit">
                {editing ? 'Update Member' : 'Add Member'}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => { setEditing(null); reset(); }}
                  className="rounded-3xl border border-slate-300 px-6 py-3 text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-panel">
          <h2 className="text-lg font-semibold text-slate-900">Family Members</h2>
          <div className="mt-5 space-y-4">
            {family.length ? family.map((member) => (
              <div key={member.id} className="rounded-3xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{member.name}</h3>
                    <p className="text-sm text-slate-500">{member.relation} • {member.occupation}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(member)}
                      className="rounded-2xl border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(member.id)}
                      className="rounded-2xl bg-rose-500 px-3 py-2 text-sm text-white hover:bg-rose-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <span className="text-sm text-slate-500">Age: {member.age}</span>
                  <span className="text-sm text-slate-500">Income: ₹{member.income}</span>
                </div>
              </div>
            )) : <p className="text-slate-500">No family members yet. Add one to improve scheme eligibility.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
