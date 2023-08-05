import { classNames } from "~/utils/classNames";

export const SearchTipsModal = ({
  isDarkMode,
  isShown,
  closeModal,
}: {
  isDarkMode: boolean;
  isShown: boolean;
  closeModal: () => void;
}) => {
  return (
    <>
      <div
        className={classNames(
          "fixed inset-0 bg-black transition duration-300",
          isShown ? "opacity-40" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!isShown}
        onClick={closeModal}
      ></div>

      <dialog
        className={classNames(
          "fixed inset-5 flex max-w-2xl flex-col p-0 shadow transition duration-300",
          isShown ? "opacity-100" : "pointer-events-none opacity-0",
          isDarkMode ? "bg-slate-700 text-white" : "bg-white text-black"
        )}
        style={{ maxHeight: "calc(100vh - 40px)" }}
        aria-hidden={!isShown}
      >
        <h2 className="p-4 text-2xl">Search Tips</h2>

        <div className="flex grow flex-col gap-3 overflow-y-auto px-4 pb-4">
          <p>
            {`You can search the dictionary using kanji (今日は), kana (こんにちは), romaji (konnichiha), kanji/kana/romaji all together (今nichiは), or English (hello).`}
          </p>

          <p>
            {`To enter characters, tap on the paintbrush icon below the search box for handwriting input (if installed), or the puzzle piece icon for a traditional radical input table.`}
          </p>

          <p>
            {`For words like "man" that are valid in both English and romaji, tap on the button at the top right corner of the screen to switch between languages.`}
          </p>

          <p>
            {`With romaji, there's no need to separate syllables with spaces or apostrophes and entering aa/ii/uu/ee/ou will search for long vowel sounds.`}
          </p>

          <p>
            {`Search with wildcards by entering a ? to replace one character or * to replace any number of them.`}
          </p>

          <p>
            {`To view words containing a single character, tap on that character's search result and then select the "WORDS" tab; you can also view character components via the "CHARS" tab, and example sentences for both single characters and multi-character words via the "SENTS" tab.`}
          </p>

          <p>
            {`If you've installed an English-to-Japanese dictionary add-on, you'll see two different [E] icons at the top right corner of the screen; the hollow one searches for Japanese-to-English entries containing your current English word, the filled-in one search for entries in English-to-Japanese dictionary.`}
          </p>
        </div>

        <button
          className={classNames(
            "border-t-2 p-4 text-left text-lg font-bold",
            isDarkMode ? "border-slate-500 text-blue-400" : "text-black"
          )}
          onClick={closeModal}
        >
          Ok
        </button>
      </dialog>
    </>
  );
};