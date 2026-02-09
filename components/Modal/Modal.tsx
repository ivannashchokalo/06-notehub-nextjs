import { useEffect } from "react";
import NoteForm from "../NoteForm/NoteForm";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  onCloseModal: () => void;
}

export default function Modal({ onCloseModal }: ModalProps) {
  useEffect(() => {
    const handleEscapePress = (e: KeyboardEvent) => {
      if (e.code === "Escape") onCloseModal();
    };
    document.addEventListener("keydown", handleEscapePress);

    return () => document.removeEventListener("keydown", handleEscapePress);
  }, [onCloseModal]);
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) onCloseModal();
  };

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <NoteForm onCloseModal={onCloseModal} />
      </div>
    </div>,
    document.body,
  );
}
