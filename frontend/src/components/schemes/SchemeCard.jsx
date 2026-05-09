import { useNavigate } from 'react-router-dom';

export default function SchemeCard({ scheme, showApply }) {
  const navigate = useNavigate();
  const onApply = () => {
    navigate(`/apply/${scheme.id}`);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{scheme.name}</h3>
          <p className="mt-2 text-sm text-slate-500">{scheme.description}</p>
        </div>
        <div className="space-y-2 text-right">
          <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">Deadline: {scheme.deadline ? new Date(scheme.deadline).toLocaleDateString() : 'Open'}</span>
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Confidence {scheme.confidence}%</span>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Benefits</p>
          <p className="mt-2">{scheme.benefits}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Required Docs</p>
          <p className="mt-2">{scheme.required_documents}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Eligibility Info</p>
          <div className="mt-2 space-y-1 text-xs">
            {(() => {
              const rules = typeof scheme.eligibility_rules === 'string' 
                ? JSON.parse(scheme.eligibility_rules || '{}') 
                : (scheme.eligibility_rules || {});
              
              if (Object.keys(rules).length === 0) return <p className="italic">Standard eligibility applies.</p>;

              return (
                <>
                  {rules.states && <p>• States: {rules.states.join(', ')}</p>}
                  {rules.occupations && <p>• Occupations: {rules.occupations.join(', ')}</p>}
                  {rules.education_levels && <p>• Education: {rules.education_levels.join(', ')}</p>}
                  {rules.min_income && <p>• Income limit: ₹{rules.min_income}</p>}
                  {rules.max_income && <p>• Max Income: ₹{rules.max_income}</p>}
                  {rules.gender && <p>• Gender: {rules.gender}</p>}
                  {rules.farmer_required && <p>• Farmers only</p>}
                  {rules.min_age && <p>• Min Age: {rules.min_age}</p>}
                </>
              );
            })()}
          </div>
        </div>
      </div>
      {showApply && (
        <button onClick={onApply} className="mt-5 rounded-3xl bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-ocean">
          Apply now
        </button>
      )}
    </div>
  );
}
