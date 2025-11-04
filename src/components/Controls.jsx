import { Shuffle, Clipboard, Download } from "lucide-react";

export default function Controls({ onGenerate, onCopy, onDownload, generating }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        onClick={onGenerate}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white font-semibold shadow-lg shadow-indigo-700/20 hover:from-indigo-600 hover:to-fuchsia-700 active:scale-[0.99] transition"
      >
        <Shuffle className="w-5 h-5" />
        {generating ? "Generating..." : "Generate Character"}
      </button>
      <button
        onClick={onCopy}
        className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
      >
        <Clipboard className="w-5 h-5" />
        Copy
      </button>
      <button
        onClick={onDownload}
        className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
      >
        <Download className="w-5 h-5" />
        Download JSON
      </button>
    </div>
  );
}
