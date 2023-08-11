import { type Dispatch, type SetStateAction, useState, useRef } from "react";
import { MenuIcon } from "~/icons/MenuIcon";
import { MoreVerticalIcon } from "~/icons/MoreVerticalIcon";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";

type HistoryHeaderTab = (typeof historyHeaderTabs)[number];

const DEFAULT_HISTORY_HEADER_TAB: HistoryHeaderTab = "Dict";

const historyHeaderTabs = ["Dict", "Reader", "OCR", "Search", "Cards"] as const;

export const useHistoryHeaderTab = () => {
  return useState<HistoryHeaderTab>(DEFAULT_HISTORY_HEADER_TAB);
};

export const HistoryHeader = ({
  openSideMenu,
  historyHeaderTab,
  setHistoryHeaderTab,
}: {
  openSideMenu: () => void;
  historyHeaderTab: HistoryHeaderTab;
  setHistoryHeaderTab: Dispatch<SetStateAction<HistoryHeaderTab>>;
}) => {
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );
  const [isMoreMenuShown, setIsMoreMenuShown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  return (
    <header
      className={classNames(
        "flex w-full justify-center text-white shadow",
        isDarkMode ? "bg-black" : "bg-blue-600"
      )}
    >
      <div className="w-full max-w-2xl">
        <section className="flex h-14 items-center">
          <button className="h-full px-4" onClick={openSideMenu}>
            <span className="sr-only">Open side menu</span>
            <MenuIcon />
          </button>

          <div className="relative flex grow">
            <h1 className="text-lg font-semibold">History</h1>
          </div>

          {isMoreMenuShown && <div className="fixed inset-0"></div>}

          <div className="relative h-full">
            <button
              className="flex h-full items-center justify-center px-4"
              onClick={() => {
                setIsMoreMenuShown(!isMoreMenuShown);
                if (!isMoreMenuShown && dropdownRef.current) {
                  dropdownRef.current.focus();
                }
              }}
            >
              <span className="sr-only">More options</span>
              <MoreVerticalIcon />
            </button>

            <div
              className={classNames(
                "absolute right-2 top-2 z-10 shadow transition-all",
                isDarkMode ? "bg-slate-700 text-white" : "bg-white text-black",
                isMoreMenuShown
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              )}
              tabIndex={-1}
              ref={dropdownRef}
              onBlur={() => setIsMoreMenuShown(false)}
              aria-hidden={!isMoreMenuShown}
            >
              <ul>
                <li>
                  <button className="w-full whitespace-nowrap p-4 text-left">
                    Dump current list to flashcards
                  </button>
                </li>
                <li>
                  <button className="w-full whitespace-nowrap p-4 text-left">
                    Clear current list
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="flex h-14 items-center">
          {historyHeaderTabs.map((tab) => {
            return (
              <button
                key={tab}
                className={classNames(
                  "flex h-full grow basis-1 items-center justify-center uppercase",
                  historyHeaderTab === tab && "border-b-2 border-white"
                )}
                onClick={() => setHistoryHeaderTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </section>
      </div>
    </header>
  );
};
