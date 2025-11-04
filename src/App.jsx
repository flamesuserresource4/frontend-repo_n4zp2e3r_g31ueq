import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Controls from "./components/Controls.jsx";
import CharacterCard from "./components/CharacterCard.jsx";
import History from "./components/History.jsx";

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rollStat() {
  // 4d6 drop lowest for nicer distributions
  const rolls = Array.from({ length: 4 }, () => 1 + Math.floor(Math.random() * 6)).sort((a, b) => a - b);
  return rolls.slice(1).reduce((a, b) => a + b, 0);
}

function generateName() {
  const starts = [
    "Al", "Bel", "Cor", "Da", "El", "Fa", "Gal", "Hel", "Iri", "Jo", "Ka", "Lor", "Ma", "Nor", "Ori", "Pa", "Qua", "Rin", "Sa", "Tor", "Ul", "Val", "Wyn", "Xan", "Yor", "Zel",
  ];
  const middles = ["a", "e", "i", "o", "u", "ae", "ia", "ai", "ou", "eo", "ir", "an", "or", "el", "yn", "as", "os"];
  const ends = [
    "dor", "driel", "var", "mir", "thas", "wyn", "rin", "dane", "lith", "vash", "thor", "dell", "mond", "ric", "saris", "thane", "riel", "zor", "drake",
  ];
  const parts = [randomItem(starts), randomItem(middles), Math.random() > 0.5 ? randomItem(middles) : "", randomItem(ends)];
  const name = parts.join("");
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function generateCharacter() {
  const ancestries = ["Human", "Elf", "Dwarf", "Halfling", "Tiefling", "Orc", "Gnome", "Dragonborn", "Half-Elf", "Fae"];
  const roles = ["Warrior", "Rogue", "Wizard", "Cleric", "Ranger", "Bard", "Paladin", "Druid", "Monk", "Artificer"];
  const alignments = ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"];
  const homelands = [
    "the misty coasts of Aramoor",
    "the crystal forests of Elowyn",
    "the underground halls of Kharzul",
    "the floating markets of Myria",
    "the sun-scorched dunes of Sahrim",
    "the storm islands of Vyr",
    "the moonlit vale of Seraphine",
  ];
  const traitPool = [
    "Quick with a joke, quicker with a blade",
    "Keeps a journal of dreams and omens",
    "Terrified of deep water",
    "Collects ancient coins",
    "Speaks with animals in hushed tones",
    "Always pays debts, even the small ones",
    "Believes every meeting is fate",
    "Carries a lucky charm from childhood",
    "Refuses to turn their back on a fight",
    "Hums old battlefield songs while thinking",
    "Trusts maps more than people",
    "Never refuses a dare",
  ];

  const backgroundTemplates = [
    (n, a, r) => `${n} grew up among ${a.toLowerCase()} scholars but chose the path of a ${r.toLowerCase()}, seeking stories written in steel and starlight.`,
    (n, a, r) => `Once a humble caravan guard, ${n} discovered a talent for ${r.toLowerCase()} after a fateful night under a blood-red moon.`,
    (n, a, r) => `Raised in a remote monastery, ${n}, a ${a.toLowerCase()}, abandoned the quiet life when a forgotten relic called to their ${r.toLowerCase()} heart.`,
    (n, a, r) => `An exile from ancient courts, ${n} wanders as a ${r.toLowerCase()}, chasing rumors of a crown that refuses to die.`,
  ];

  const name = generateName();
  const ancestry = randomItem(ancestries);
  const role = randomItem(roles);
  const alignment = randomItem(alignments);
  const homeland = randomItem(homelands);
  const age = 16 + Math.floor(Math.random() * 50);

  const traits = Array.from({ length: 3 }, () => randomItem(traitPool)).filter((v, i, self) => self.indexOf(v) === i);

  const stats = {
    STR: rollStat(),
    DEX: rollStat(),
    CON: rollStat(),
    INT: rollStat(),
    WIS: rollStat(),
    CHA: rollStat(),
  };

  const background = randomItem(backgroundTemplates)(name, ancestry, role);

  return { id: crypto.randomUUID(), name, ancestry, role, alignment, background, traits, stats, age, homeland };
}

export default function App() {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = useCallback(() => {
    setGenerating(true);
    setTimeout(() => {
      const ch = generateCharacter();
      setCurrent(ch);
      setHistory((prev) => [ch, ...prev].slice(0, 9));
      setGenerating(false);
    }, 250);
  }, []);

  const copyText = useMemo(() => {
    if (!current) return "";
    const { name, ancestry, role, alignment, background, traits, stats, age, homeland } = current;
    return `Name: ${name}\nAncestry: ${ancestry}\nRole: ${role}\nAlignment: ${alignment}\nAge: ${age}\nHomeland: ${homeland}\n\nBackground: ${background}\n\nTraits:\n- ${traits.join("\n- ")}\n\nAttributes:\n${Object.entries(stats)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")}`;
  }, [current]);

  const handleCopy = useCallback(() => {
    if (!current) return;
    navigator.clipboard.writeText(copyText).catch(() => {});
  }, [current, copyText]);

  const handleDownload = useCallback(() => {
    if (!current) return;
    const blob = new Blob([JSON.stringify(current, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${current.name.replace(/\s+/g, "_")}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [current]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-fuchsia-900 to-slate-900 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8">
          <Header />

          <div className="w-full max-w-5xl mx-auto mt-4">
            <Controls onGenerate={handleGenerate} onCopy={handleCopy} onDownload={handleDownload} generating={generating} />
          </div>

          <div className="mt-6 px-0">
            <CharacterCard character={current} />
          </div>

          <History items={history} onSelect={setCurrent} />

          {!current && (
            <div className="w-full max-w-5xl mx-auto mt-6 text-center text-white/70">
              Click Generate Character to get started.
            </div>
          )}

          <footer className="w-full max-w-5xl mx-auto py-10 text-center text-white/50">
            Crafted with imagination. Every roll is unique.
          </footer>
        </div>
      </div>
    </div>
  );
}
