import { useState } from "react";
import { FuriganaIcon } from "~/icons/FuriganaIcon";
import { MoonIcon } from "~/icons/MoonIcon";
import { SmallCameraIcon } from "~/icons/SmallCameraIcon";
import { SmallCartIcon } from "~/icons/SmallCartIcon";
import { SmallClipboardIcon } from "~/icons/SmallClipboardIcon";
import { SmallHelpIcon } from "~/icons/SmallHelpIcon";
import { SmallHistoryIcon } from "~/icons/SmallHistoryIcon";
import { SmallImageIcon } from "~/icons/SmallImageIcon";
import { SmallLearnIcon } from "~/icons/SmallLearnIcon";
import { SmallMailIcon } from "~/icons/SmallMailIcon";
import { SmallRegisterIcon } from "~/icons/SmallRegisterIcon";
import { SmallSearchIcon } from "~/icons/SmallSearchIcon";
import { SmallSettingsIcon } from "~/icons/SmallSettingsIcon";
import { SmallStackIcon } from "~/icons/SmallStackIcon";
import { SunIcon } from "~/icons/SunIcon";
import { classNames } from "~/utils/classNames";

const sideMenuOptionGroups = [
  {
    label: "Dictionary",
    options: [
      { label: "Dictionary", icon: <SmallSearchIcon /> },
      { label: "History", icon: <SmallHistoryIcon /> },
    ],
  },
  {
    label: "Add-ons",
    options: [
      { label: "Add-ons", icon: <SmallCartIcon /> },
      { label: "Registration", icon: <SmallRegisterIcon /> },
    ],
  },
  {
    label: "OCR",
    options: [
      { label: "Live OCR", icon: <SmallCameraIcon /> },
      { label: "Still OCR", icon: <SmallImageIcon /> },
    ],
  },
  {
    label: "Reader",
    options: [
      { label: "Clip Reader", icon: <SmallClipboardIcon /> },
      { label: "Screen Reader/OCR", icon: <SmallStackIcon /> },
    ],
  },
  {
    label: "Flashcards",
    options: [{ label: "Open AnkiDroid", icon: <SmallLearnIcon /> }],
  },
  {
    label: "Settings",
    options: [{ label: "Settings", icon: <SmallSettingsIcon /> }],
  },
  {
    label: "Support",
    options: [
      { label: "Help", icon: <SmallHelpIcon /> },
      { label: "Contact Us", icon: <SmallMailIcon /> },
    ],
  },
];

export const SideMenu = ({
  isSideMenuOpen,
  closeSideMenu,
}: {
  isSideMenuOpen: boolean;
  closeSideMenu: () => void;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <>
      <div
        className={classNames(
          "absolute inset-0 bg-black opacity-40",
          !isSideMenuOpen && "hidden"
        )}
        onClick={closeSideMenu}
      ></div>

      <aside
        className={classNames(
          "absolute bottom-0 top-0 transition-all duration-300",
          isDarkMode ? "bg-black text-white" : "bg-white text-black",
          isSideMenuOpen ? "left-0" : "-left-64"
        )}
        aria-hidden={!isSideMenuOpen}
      >
        <section
          className={classNames(
            "flex text-white",
            isDarkMode ? "" : "bg-blue-600"
          )}
        >
          <button
            className="flex grow basis-1 items-center justify-center py-4"
            onClick={() => setIsDarkMode((isDarkMode) => !isDarkMode)}
          >
            {isDarkMode ? (
              <>
                <span className="sr-only">Dark mode</span>
                <MoonIcon />
              </>
            ) : (
              <>
                <span className="sr-only">Light mode</span>
                <SunIcon />
              </>
            )}
          </button>

          <button className="flex grow basis-1 items-center justify-center py-4">
            <span className="sr-only">Furigana mode</span>
            <FuriganaIcon />
          </button>
        </section>

        {sideMenuOptionGroups.map(({ label, options }) => {
          return (
            <section key={label}>
              <h2
                className={classNames(
                  "px-4 py-2 text-xs uppercase",
                  isDarkMode ? "bg-slate-900" : "bg-slate-200"
                )}
              >
                {label}
              </h2>
              <ul>
                {options.map((option) => {
                  const key = `${label}-${option.label}`;
                  return (
                    <li key={key}>
                      <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-lg">
                        {option.icon} {option.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </aside>
    </>
  );
};
