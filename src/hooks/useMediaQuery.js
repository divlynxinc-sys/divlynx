import { useEffect, useState } from "react";

/** Reactive `window.matchMedia`, SSR-safe and cleaned up on unmount. */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const sync = () => setMatches(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, [query]);

  return matches;
}
