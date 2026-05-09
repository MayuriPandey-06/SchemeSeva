export default function NotificationPanel({ notifications }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-panel">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Notifications</h2>
          <p className="mt-1 text-sm text-slate-500">Alerts for documents, applications, and deadlines.</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {notifications.length ? notifications.map((note) => (
          <div key={note.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{note.title}</p>
                <p className="text-sm text-slate-500">{new Date(note.created_at).toLocaleString()}</p>
              </div>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">{note.category}</span>
            </div>
            <p className="mt-3 text-sm text-slate-700">{note.message}</p>
          </div>
        )) : <p className="text-slate-500">No notifications yet. You will receive updates here.</p>}
      </div>
    </div>
  );
}
