"use client";

import { useState } from "react";
import { Globe } from "lucide-react";

const languages = [
  { name: "Global - English", code: "en" },
  { name: "India - Hindi", code: "hi" },
  { name: "India - Telugu", code: "te" },
  { name: "India - Tamil", code: "ta" },
  { name: "Brazil - Português", code: "pt" },
  { name: "Mexico - Español", code: "es" },
  { name: "France - Français", code: "fr" },
  { name: "Germany - Deutsch", code: "de" },
  { name: "Japan - 日本語", code: "ja" },
  { name: "China - 中文", code: "zh" },
];

export const LanguageDropdown = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = languages.filter((lang) =>
    lang.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 hover:underline"
      >
        <Globe size={14} />
        Global - English
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 top-[120%] w-64 bg-white text-black rounded-xl shadow-xl p-3 z-[999]">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search language..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-3 px-3 py-2 border rounded-lg text-sm outline-none"
          />

          {/* LIST */}
          <div className="max-h-60 overflow-y-auto">
            {filtered.map((lang) => (
              <div
  key={lang.code}
  onClick={() => {
    console.log("Selected:", lang.code);
    setOpen(false);
  }}
  className="px-3 py-2 text-sm rounded-lg hover:bg-gray-100 cursor-pointer"
>
  {lang.name}
</div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}