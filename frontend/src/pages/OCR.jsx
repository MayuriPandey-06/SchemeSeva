import { useState } from 'react';
import Tesseract from 'tesseract.js';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function OCRScan() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return toast.error('Select an image or PDF first');
    setLoading(true);
    setText('');
    try {
      await Tesseract.recognize(file, 'eng', {
        logger: (m) => setProgress(m.progress ? Math.round(m.progress * 100) : null),
      }).then(async ({ data }) => {
        setText(data.text);
        const extracted = {
          name: extractField(data.text, ['Name', 'NAME']),
          dob: extractField(data.text, ['DOB', 'Date of Birth', 'Birth Date']),
          address: extractField(data.text, ['Address', 'ADDR']),
          id_number: extractField(data.text, ['Aadhaar', 'ID', 'UID'])
        };
        await api.post('/ocr', extracted);
        toast.success('OCR completed. Fields will be filled automatically.');
      });
    } catch (error) {
      console.error(error);
      toast.error('OCR failed. Please try a clearer image.');
    } finally {
      setLoading(false);
      setProgress(null);
    }
  };

  const extractField = (content, patterns) => {
    const lowerText = content.toLowerCase();
    for (const pattern of patterns) {
      const token = pattern.toLowerCase();
      const index = lowerText.indexOf(token);
      if (index !== -1) {
        const snippet = content.substring(index, index + 100).split(/\n|,|:/).slice(1).join(' ').trim();
        if (snippet) return snippet.slice(0, 80);
      }
    }
    return '';
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-navy to-ocean p-6 text-white shadow-panel">
        <h1 className="text-2xl font-semibold">OCR Document Scanner</h1>
        <p className="mt-2 text-slate-200">Upload your Aadhaar or certificate image and auto-fill profile fields.</p>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-panel">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1fr]">
          <div className="space-y-4">
            <p className="text-slate-700">Choose an image or a high-quality scan of your ID document. The system will extract common fields and suggest profile values.</p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
              className="text-sm text-slate-700"
            />
            <button
              disabled={loading}
              onClick={handleUpload}
              className="rounded-3xl bg-navy px-6 py-3 text-white transition hover:bg-ocean disabled:opacity-60"
            >
              {loading ? 'Scanning…' : 'Start OCR Scan'}
            </button>
            {progress !== null && <p className="text-sm text-slate-500">Progress: {progress}%</p>}
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-lg font-semibold text-slate-900">Extracted text preview</h2>
            <p className="mt-3 whitespace-pre-line break-words text-sm leading-6 text-slate-600">{text || 'No text extracted yet. Upload a document to preview results.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
