import { HiClipboardList, HiDocumentDuplicate, HiUserGroup } from 'react-icons/hi';

export default function StatCard({ title, value, accent }) {
  const Icon = title.toLowerCase().includes('eligible') 
    ? HiClipboardList 
    : title.toLowerCase().includes('applied') 
    ? HiDocumentDuplicate 
    : HiUserGroup;

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${accent} p-6 text-white shadow-panel group transition-transform hover:scale-[1.02]`}>
      <div className="absolute -right-4 -top-4 opacity-10 transition-transform group-hover:scale-110">
        <Icon className="h-24 w-24" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
          <Icon className="h-4 w-4" />
          {title}
        </div>
        <p className="mt-4 text-5xl font-bold tracking-tight">{value}</p>
        <p className="mt-1 text-xs text-white/60">Updated just now</p>
      </div>
    </div>
  );
}
