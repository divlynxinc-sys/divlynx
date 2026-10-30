import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/cookie-notice.css";

const STORAGE_KEY = "divlynx_privacy_choice";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try { setVisible(!window.localStorage.getItem(STORAGE_KEY)); }
    catch { setVisible(true); }
  }, []);

  const remember = (choice) => {
    try { window.localStorage.setItem(STORAGE_KEY, choice); } catch { /* Storage may be disabled. */ }
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <aside className="cookie-notice" aria-label="Privacy preferences" role="dialog" aria-live="polite">
      <div>
        <p className="cookie-notice__title">Your privacy, plainly stated.</p>
        <p>We currently use only necessary browser storage to remember this choice. We do not set advertising or analytics cookies. <Link to="/privacy">Privacy & cookie notice</Link></p>
      </div>
      <div className="cookie-notice__actions">
        <button type="button" className="btn btn--ghost" onClick={() => remember("necessary")}>Only necessary</button>
        <button type="button" className="btn btn--primary" onClick={() => remember("accepted")}>Accept</button>
      </div>
    </aside>
  );
}
