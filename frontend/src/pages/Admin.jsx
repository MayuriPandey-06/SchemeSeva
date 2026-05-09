import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function AdminPanel() {
  const [schemes, setSchemes] = useState([]);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const loadSchemes = async () => {
    try {
      const response = await api.get('/admin/schemes');
      setSchemes(response.data.schemes || []);
    } catch (error) {
      console.error(error);
      toast.error('Unable to load admin data');
    }
  };

  useEffect(() => {
    loadSchemes();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await api.put(`/admin/schemes/${editing.id}`, data);
        toast.success('Scheme updated');
      } else {
        await api.post('/admin/schemes', data);
        toast.success('Scheme added');
      }
      setEditing(null);
      reset();
      loadSchemes();
    } catch (error) {
      console.error(error);
      toast.error('Admin update failed');
    }
  };

  const onEdit = (scheme) => {
    setEditing(scheme);
    reset(scheme);
  };

  const onDelete = async (id) => {
    try {
      await api.delete(`/admin/schemes/${id}`);
      toast.success('Scheme removed');
      loadSchemes();
    } catch (error) {
      console.error(error);
      toast.error('Unable to delete scheme');
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-navy to-ocean p-6 text-white shadow-panel">
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
        <p className="mt-2 text-slate-200">Add scheme rules, update deadlines, and manage all citizen applications.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl bg-white p-6 shadow-panel">
          <h2 className="text-lg font-semibold text-slate-900">Add / Edit Scheme</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
            {[
              { name: 'name', label: 'Scheme Name' },
              { name: 'description', label: 'Description' },
              { name: 'required_documents', label: 'Required Documents (comma separated)' },
              { name: 'deadline', label: 'Deadline', type: 'date' },
              { name: 'benefits', label: 'Benefits' },
              { name: 'eligibility_rules', label: 'Eligibility Rules (JSON format)' },
            ].map((field) => (
              <label key={field.name} className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">{field.label}</span>
                {field.type === 'date' ? (
                  <input
                    type="date"
                    {...register(field.name)}
                    className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400"
                  />
                ) : (
                  <textarea
                    rows={field.name === 'description' || field.name === 'benefits' || field.name === 'eligibility_rules' ? 4 : 1}
                    {...register(field.name)}
                    className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400"
                  />
                )}
              </label>
            ))}
            <button className="rounded-3xl bg-navy px-6 py-3 text-white transition hover:bg-ocean">{editing ? 'Update Scheme' : 'Create Scheme'}</button>
          </form>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-panel">
          <h2 className="text-lg font-semibold text-slate-900">Existing Schemes</h2>
          <div className="mt-5 space-y-4">
            {schemes.length ? schemes.map((scheme) => (
              <div key={scheme.id} className="rounded-3xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{scheme.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">Deadline: {scheme.deadline ? new Date(scheme.deadline).toLocaleDateString() : 'None'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(scheme)}
                      className="rounded-2xl border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(scheme.id)}
                      className="rounded-2xl bg-rose-500 px-3 py-2 text-sm text-white hover:bg-rose-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">{scheme.description}</p>
              </div>
            )) : <p className="text-slate-500">No schemes found. Add one to begin.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
