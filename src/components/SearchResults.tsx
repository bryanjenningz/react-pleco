import { classNames } from "~/utils/classNames";
import { type WordEntry } from "~/dictionary/search";
import { Pronunciation } from "~/components/Pronunciation";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import Link from "next/link";
import { useSearchTextStore } from "~/stores/searchTextStore";
import { createWordLink } from "~/utils/createWordLink";

const emptyWordEntriesList = [
  { text: "History", href: "/history" },
  { text: "Clip Reader", href: "/clip-reader" },
  { text: "Flashcard Test", href: "/new-flashcard-test" },
  { text: "Tutorial", href: "/tutorial" },
] as const;

export const SearchResults = ({
  wordEntries,
}: {
  wordEntries: WordEntry[];
}) => {
  const searchText = useStore(useSearchTextStore, (x) => x.searchText) ?? "";
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;

  if (wordEntries.length === 0) {
    return (
      <ul>
        {emptyWordEntriesList.map(({ text, href }) => {
          return (
            <li key={text}>
              <Link
                href={href}
                className={classNames(
                  "block border-b p-4 text-lg",
                  isDarkMode ? "border-slate-600" : "border-slate-300",
                )}
              >
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul id="search-results">
      {wordEntries.map((wordEntry, resultIndex) => {
        const { word, pronunciation, pitchAccents, definitions } = wordEntry;
        const key = `${word}-${pronunciation}-${resultIndex}}`;
        return (
          <li key={key}>
            <Link
              href={createWordLink({ searchText, resultIndex })}
              className={classNames(
                "block border-b p-4",
                isDarkMode ? "border-slate-600" : "border-slate-300",
              )}
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl">{word}</h2>
                <Pronunciation
                  word={word}
                  pronunciation={pronunciation}
                  pitchAccents={pitchAccents}
                />
              </div>
              <p className={isDarkMode ? "text-slate-400" : "text-slate-700"}>
                {definitions.join(", ")}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
