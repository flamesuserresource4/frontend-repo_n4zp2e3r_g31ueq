import { User, Dice5 } from "lucide-react";

function Stat({ label, value }) {
  return (
    <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-lg p-3">
      <span className="text-xs uppercase tracking-wide text-white/60">{label}</span>
      <span className="mt-1 text-xl font-bold text-white">{value}</span>
    </div>
  );
}

export default function CharacterCard({ character }) {
  if (!character) return null;

  const { name, ancestry, role, alignment, background, traits, stats, age, homeland } = character;

  return (
    <section className="w-full max-w-5xl mx-auto bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
          <User className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{name}</h2>
          <p className="text-white/70 mt-1">
            {ancestry} • {role} • {alignment}
          </p>
          <p className="text-white/70 mt-1">Age {age} from {homeland}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-white/80 font-semibold mb-2">Background</h3>
          <p className="text-white/70 leading-relaxed">{background}</p>
          <h3 className="text-white/80 font-semibold mt-4 mb-2">Traits</h3>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            {traits.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white/80 font-semibold">Attributes</h3>
            <Dice5 className="w-5 h-5 text-white/60" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(stats).map(([k, v]) => (
              <Stat key={k} label={k} value={v} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
