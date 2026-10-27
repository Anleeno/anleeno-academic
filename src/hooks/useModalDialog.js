import { useEffect } from "react";

let scrollLocks = 0;
let previousOverflow = "";

// Share lifecycle behavior, not the visual design of different preview windows.
export function useModalDialog(dialogRef) {
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    if (!dialog.open) dialog.showModal();
    if (scrollLocks++ === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    return () => {
      dialog.close();
      if (--scrollLocks === 0) document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => {
        // StrictMode may already have opened the dialog again.
        if (!dialog.open && !scrollLocks && previousFocus instanceof HTMLElement && previousFocus.isConnected) {
          previousFocus.focus({ preventScroll: true });
        }
      });
    };
  }, [dialogRef]);
}
