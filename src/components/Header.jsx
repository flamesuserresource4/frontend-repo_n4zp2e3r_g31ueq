import { Wand2 } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full max-w-5xl mx-auto pt-10 pb-6 text-center">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 border border-indigo-500/20 text-indigo-400 mb-4">
        <Wand2 className="h-4 w-4" />
        <span className="text-sm font-medium">Fantasy Character Forge</span>
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
        Random Character Generator
      </h1>
      <p className="mt-3 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
        Instantly craft richly detailed characters for your next story, tabletop campaign, or game prototype.
      </p>
    </header>
  );
}
