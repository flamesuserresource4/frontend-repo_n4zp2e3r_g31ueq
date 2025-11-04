import { History as HistoryIcon } from "lucide-react";

export default function History({ items = [], onSelect }) {
  if (!items.length) return null;

  return (
    <section className="w-full max-w-5xl mx-auto mt-8">
      <div className="flex items-center gap-2 mb-3 text-white/80">
        <HistoryIcon className="w-5 h-5" />
        <h3 className="font-semibold">Recent Generations</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((ch, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(ch)}
            className="text-left group rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-4"
            title="Click to view"
          >
            <div className="font-semibold text-white group-hover:text-white">{ch.name}</div>
            <div className="text-sm text-white/70">
              {ch.ancestry} • {ch.role} • {ch.alignment}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
