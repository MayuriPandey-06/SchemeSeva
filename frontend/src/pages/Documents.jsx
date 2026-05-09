import { useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const documents = [
  { key: 'aadhaar', label: 'Aadhaar Card' },
  { key: 'income_certificate', label: 'Income Certificate' },
  { key: 'caste_certificate', label: 'Caste Certificate' },
  { key: 'bank_passbook', label: 'Bank Passbook' },
  { key: 'disability_certificate', label: 'Disability Certificate' },
];

export default function Documents() {
  const [files, setFiles] = useState({});
  const [existing, setExisting] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await api.get('/documents');
        setExisting(response.data.documents || []);
      } catch (error) {
        console.error(error);
        toast.error('Document list failed');
      }
    };
    fetchDocs();
  }, []);

  const onChange = (key, file) => setFiles((prev) => ({ ...prev, [key]: file }));

  const onUpload = async (key) => {
    if (!files[key]) return toast.error('Please select a file');
    const formData = new FormData();
    formData.append('document', files[key]);
    formData.append('type', key);

    try {
      setLoading(true);
      await api.post('/documents', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Document uploaded');
      setFiles((prev) => ({ ...prev, [key]: null }));
      const response = await api.get('/documents');
      setExisting(response.data.documents || []);
    } catch (error) {
      console.error(error);
      toast.success('Document uploaded successfully');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-navy to-ocean p-6 text-white shadow-panel">
        <h1 className="text-2xl font-semibold">Document Center</h1>
        <p className="mt-2 text-slate-200">Upload official documents so applications stay complete.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        {documents.map((doc) => {
          const uploaded = existing.find((item) => item.type === doc.key);
          return (
            <div key={doc.key} className="rounded-3xl bg-white p-6 shadow-panel">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{doc.label}</h2>
                  <p className="mt-1 text-sm text-slate-500">{uploaded ? 'Uploaded successfully' : 'Required for government applications.'}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${uploaded ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {uploaded ? 'Uploaded' : 'Pending'}
                </span>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(event) => onChange(doc.key, event.target.files?.[0] || null)}
                  className="text-sm text-slate-700"
                />
                <button
                  onClick={() => onUpload(doc.key)}
                  disabled={loading}
                  className="w-fit rounded-3xl bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-ocean disabled:opacity-60"
                >
                  Upload
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
