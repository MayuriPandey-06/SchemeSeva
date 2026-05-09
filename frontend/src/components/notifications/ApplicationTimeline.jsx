export default function ApplicationTimeline({ application }) {
  const statusMap = {
    Submitted: { label: 'Under Review', labelClass: 'bg-sky-100 text-sky-700', iconClass: 'bg-sky-500 text-white' },
    'Under Review': { label: 'Under Review', labelClass: 'bg-sky-100 text-sky-700', iconClass: 'bg-sky-500 text-white' },
    Approved: { label: 'Approved', labelClass: 'bg-emerald-100 text-emerald-700', iconClass: 'bg-emerald-500 text-white' },
    Rejected: { label: 'Rejected', labelClass: 'bg-rose-100 text-rose-700', iconClass: 'bg-rose-500 text-white' },
  };

  const currentStatus = statusMap[application.status] || statusMap['Under Review'];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{application.scheme_name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            Submitted: {new Date(application.submitted_at).toLocaleDateString()}
          </p>
        </div>
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${currentStatus.labelClass}`}>
          {currentStatus.label}
        </span>
      </div>
      <div className="mt-5 flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStatus.iconClass}`}>
          {currentStatus.label.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-slate-900">Application status</p>
          <p className="text-sm text-slate-600">{currentStatus.label}</p>
          {application.comments && <p className="mt-2 text-sm text-slate-500">{application.comments}</p>}
        </div>
      </div>
    </div>
  );
}
