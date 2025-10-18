import { useEffect } from "react";

/**
 * Custom hook to detect clicks outside a specified element.
 * @param {React.RefObject<HTMLElement || null>} ref - The ref of the element to monitor.
 * @param {() => void} callback - The function to call when a click outside is detected.
 */
function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      // Check if the ref is current and the clicked target is not within the ref's element.
      // We also need to cast event.target to Node for the contains method to work.
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]); // Re-run effect if ref or callback changes
}

export default useOutsideClick;
