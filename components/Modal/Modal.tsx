import { useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  onCloseModal: () => void;
  children: ReactNode;
}

export default function Modal({ onCloseModal, children }: ModalProps) {
  useEffect(() => {
    const handleEscapePress = (e: KeyboardEvent) => {
      if (e.code === "Escape") onCloseModal();
    };

    document.addEventListener("keydown", handleEscapePress);
    return () => document.removeEventListener("keydown", handleEscapePress);
  }, [onCloseModal]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
}
