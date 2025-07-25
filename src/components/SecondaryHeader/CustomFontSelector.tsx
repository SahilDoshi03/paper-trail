"use client";

import {
  useEffect,
  useState,
  useRef,
  useDeferredValue,
} from "react";
import type { WebFont } from "@/types/Font";
import { CustomEditor } from "@/lib/CustomEditor";
import { useSlate } from "slate-react";
import { loadGoogleFont } from "@/utils/FontFamily";
import { getGoogleFonts } from "@/actions/Font";

const SORT_OPTIONS = {
  alpha: "Alphabetical",
  date: "Date Added",
  popularity: "Popularity",
  trending: "Trending",
} as const;

type SortOption = keyof typeof SORT_OPTIONS;

const CATEGORY_OPTIONS = {
  all: "All",
  "sans-serif": "Sans Serif",
  serif: "Serif",
  display: "Display",
  handwriting: "Handwriting",
  monospace: "Monospace",
} as const;

const SUBSET_OPTIONS = {
  all: "All",
  arabic: "Arabic",
  bengali: "Bengali",
  cyrillic: "Cyrillic",
  "cyrillic-ext": "Cyrillic Extended",
  devanagari: "Devanagari",
  greek: "Greek",
  "greek-ext": "Greek Extended",
  gujarati: "Gujarati",
  gurmukhi: "Gurmukhi",
  hebrew: "Hebrew",
  japanese: "Japanese",
  kannada: "Kannada",
  khmer: "Khmer",
  korean: "Korean",
  latin: "Latin",
  "latin-ext": "Latin Extended",
  malayalam: "Malayalam",
  myanmar: "Myanmar",
  oriya: "Oriya",
  sinhala: "Sinhala",
  tamil: "Tamil",
  telugu: "Telugu",
  thai: "Thai",
  vietnamese: "Vietnamese",
} as const;

const CustomFontSelector = () => {
  const editor = useSlate();
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const [fontsList, setFontsList] = useState<WebFont[]>([]);

  const [sort, setSort] = useState<SortOption>("alpha");
  const [category, setCategory] =
    useState<keyof typeof CATEGORY_OPTIONS>("all");
  const [subset, setSubset] = useState<keyof typeof SUBSET_OPTIONS>("all");

  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFonts = async () => {
      setLoading(true);
      const items = await getGoogleFonts(sort, deferredSearch);
      setFontsList(items);
      setLoading(false);
    };

    loadFonts();
  }, [sort, deferredSearch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const font = entry.target.getAttribute("data-font");
            if (font) {
              loadGoogleFont(font);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 },
    );

    Object.values(itemRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [fontsList]);

  return (
    <div className="modal">
      <div className="flex justify-between items-end gap-4">
        <input
          id="font-search"
          type="search"
          placeholder="Search Fonts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-1 p-2 bg-gray-700 rounded-sm"
        />

        <div className="flex gap-2 text-sm">
          <div>
            <label htmlFor="script-select" className="text-sm font-medium">
              Script
            </label>
            <select
              id="script-select"
              value={subset}
              onChange={(e) =>
                setSubset(e.target.value as keyof typeof SUBSET_OPTIONS)
              }
              className="border p-1 rounded-sm cursor-pointer"
            >
              {Object.entries(SUBSET_OPTIONS).map(([value, label]) => (
                <option
                  key={value}
                  value={value}
                  className="bg-gray-700 cursor-pointer"
                >
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="show-select" className="text-sm font-medium">
              Show
            </label>
            <select
              id="show-select"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as keyof typeof CATEGORY_OPTIONS)
              }
              className="border p-1 rounded-sm cursor-pointer"
            >
              {Object.entries(CATEGORY_OPTIONS).map(([value, label]) => (
                <option
                  key={value}
                  value={value}
                  className="bg-gray-700 cursor-pointer"
                >
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sort-select" className="text-sm font-medium">
              Sort
            </label>
            <select
              id="sort-select"
              className="border p-1 rounded-sm text-sm cursor-pointer"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
            >
              {Object.entries(SORT_OPTIONS).map(([value, label]) => (
                <option
                  key={value}
                  value={value}
                  className="bg-gray-700 cursor-pointer"
                >
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 h-100 border-1 overflow-auto rounded-sm">
        {loading ? (
          <div className="p-4 text-sm text-gray-400 italic">Loading...</div>
        ) : (
          (() => {
            const filteredFonts = fontsList.filter((font: WebFont) => {
              const matchesCategory =
                category === "all" || font.category === category;
              const matchesSubset =
                subset === "all" || font.subsets.includes(subset);
              return matchesCategory && matchesSubset;
            });

            if (filteredFonts.length === 0) {
              return (
                <div className="p-4 text-sm uppercase font-bold italic">
                  No fonts found!
                </div>
              );
            }

            return filteredFonts.map((font: WebFont) => (
              <li
                key={font.family}
                ref={(el) => {
                  itemRefs.current[font.family] = el;
                }}
                data-font={font.family}
                className={`p-4 border-b border-gray-200 hover:bg-gray-800 cursor-pointer list-none ${
                  CustomEditor.getFontFamily(editor) === font.family
                    ? "bg-gray-700"
                    : ""
                }`}
                style={{ fontFamily: font.family }}
                onClick={() => {
                  loadGoogleFont(font.family);
                  CustomEditor.setFontFamily(editor, font.family);
                }}
              >
                {font.family}
              </li>
            ));
          })()
        )}
      </div>
    </div>
  );
};

export default CustomFontSelector;
