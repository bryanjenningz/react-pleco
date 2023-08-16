import { type Dispatch, type SetStateAction, useState } from "react";
import { CloseIcon } from "~/icons/CloseIcon";
import { MenuIcon } from "~/icons/MenuIcon";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";
import { Modal } from "~/components/Modal";
import { type FlashcardState, useFlashcardStore } from "~/stores/flashcardStore";
import { useRouter } from "next/router";
import { ArrowOutBoxIcon } from "~/icons/ArrowOutBoxIcon";
import { BrushIcon } from "~/icons/BrushIcon";
import { VolumeUpIcon } from "~/icons/VolumeUpIcon";

type ModalState =
  | "HIDDEN"
  | "EXIT_SESSION_MODAL"
  | "CARD_NOT_REVEALED_MODAL"
  | "AUDIO_NOT_REVEALED_MODAL";

export const FlashcardTestHeader = ({
  openSideMenu,
}: {
  openSideMenu: () => void;
}) => {
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );

  const flashcardTest = useStore<
    FlashcardState,
    FlashcardState["flashcardTest"]
  >(useFlashcardStore, (x) => x.flashcardTest);
  const flashcardNumber = (flashcardTest?.index ?? 0) + 1;
  const flashcardCount = flashcardTest?.flashcards.length ?? 0;
  const flashcardsCorrect =
    flashcardTest?.flashcards.filter((x) => x.status === "Pass").length ?? 0;
  const flashcardsIncorrect =
    flashcardTest?.flashcards.filter((x) => x.status === "Fail").length ?? 0;
  const flashcardPercentCorrect =
    Math.floor(
      (flashcardsCorrect / (flashcardsCorrect + flashcardsIncorrect)) * 100
    ) || 0;

  const [modalState, setModalState] = useState<ModalState>("HIDDEN");

  return (
    <>
      <FlashcardTestHeaderModal
        modalState={modalState}
        setModalState={setModalState}
      />

      <header
        className={classNames(
          "flex w-full flex-col items-center text-white shadow",
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
              <h1 className="text-lg font-semibold">Pleco</h1>
            </div>

            <button
              className="h-full px-4"
              onClick={() => setModalState("EXIT_SESSION_MODAL")}
            >
              <span className="sr-only">End session</span>
              <CloseIcon />
            </button>

            <button
              className="h-full px-4"
              onClick={() => setModalState("CARD_NOT_REVEALED_MODAL")}
            >
              <span className="sr-only">View in Dictionary</span>
              <ArrowOutBoxIcon />
            </button>

            <button className="h-full px-4">
              <span className="sr-only">Sketch Box</span>
              <BrushIcon />
            </button>

            <button
              className="h-full px-4"
              onClick={() => setModalState("AUDIO_NOT_REVEALED_MODAL")}
            >
              <span className="sr-only">Audio</span>
              <VolumeUpIcon />
            </button>
          </section>
        </div>

        <div
          className={classNames(
            "flex w-full justify-center text-sm font-semibold",
            isDarkMode ? "bg-slate-700 text-white" : "bg-slate-300 text-black"
          )}
        >
          <div className="flex w-full max-w-2xl justify-between px-4">
            <span aria-label="Flashcard number">{`${flashcardNumber}/${flashcardCount}`}</span>
            <span aria-label="Correct and incorrect counts">{`${flashcardsCorrect}:${flashcardsIncorrect}`}</span>
            <span aria-label="Correct percentage">{`${flashcardPercentCorrect}%`}</span>
          </div>
        </div>
      </header>
    </>
  );
};

const FlashcardTestHeaderModal = ({
  modalState,
  setModalState,
}: {
  modalState: ModalState;
  setModalState: Dispatch<SetStateAction<ModalState>>;
}) => {
  const router = useRouter();

  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );

  const deleteCurrentFlashcardTest = useFlashcardStore(
    (x) => x.deleteCurrentFlashcardTest
  );

  return (
    <Modal
      isShown={modalState !== "HIDDEN"}
      onClose={() => setModalState("HIDDEN")}
    >
      <div className="flex flex-col gap-3">
        {((): JSX.Element => {
          switch (modalState) {
            case "HIDDEN":
              return <></>;

            case "EXIT_SESSION_MODAL":
              return (
                <>
                  <h2 className="text-xl">Exit Session</h2>

                  <p>{`Exit this session? (any card scores already recorded will be preserved)`}</p>

                  <div className="flex items-center justify-end">
                    <button
                      className={classNames(
                        "px-4 py-2 uppercase",
                        isDarkMode ? "text-blue-500" : "text-black"
                      )}
                      onClick={() => setModalState("HIDDEN")}
                    >
                      No
                    </button>

                    <button
                      className={classNames(
                        "px-4 py-2 uppercase",
                        isDarkMode ? "text-blue-500" : "text-black"
                      )}
                      onClick={() => {
                        deleteCurrentFlashcardTest();
                        void router.replace("/new-flashcard-test");
                      }}
                    >
                      Yes
                    </button>
                  </div>
                </>
              );

            case "CARD_NOT_REVEALED_MODAL":
              return (
                <>
                  <h2 className="text-xl">Card Not Revealed</h2>

                  <p>{`Sorry, to avoid accidental cheating you can only display the dictionary definition screen for a card after it's fully revealed.`}</p>

                  <div className="flex items-center">
                    <button
                      className={classNames(
                        "px-4 py-2 uppercase",
                        isDarkMode ? "text-blue-500" : "text-black"
                      )}
                      onClick={() => setModalState("HIDDEN")}
                    >
                      Ok
                    </button>
                  </div>
                </>
              );

            case "AUDIO_NOT_REVEALED_MODAL":
              return (
                <>
                  <h2 className="text-xl">Audio Not Revealed</h2>

                  <p>{`Your current flashcard test settings only allow audio to be played after a card is fully revealed (to avoid accidentally giving away the answer).`}</p>

                  <p>{`To change this, select "Audio" as one of your "Show" options in the main flashcard test configuration screen.`}</p>

                  <div className="flex items-center">
                    <button
                      className={classNames(
                        "px-4 py-2 uppercase",
                        isDarkMode ? "text-blue-500" : "text-black"
                      )}
                      onClick={() => setModalState("HIDDEN")}
                    >
                      Ok
                    </button>
                  </div>
                </>
              );
          }
        })()}
      </div>
    </Modal>
  );
};
