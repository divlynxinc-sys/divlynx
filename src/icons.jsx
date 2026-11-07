/**
 * One icon family (Phosphor, regular weight) for the whole site, so every
 * glyph shares a stroke. The Fi* names are kept so existing imports still work.
 */
import { PiArrowUpRight } from "react-icons/pi";

export {
  PiArrowLeft as FiArrowLeft,
  PiArrowUp as FiArrowUp,
  PiCaretDown as FiChevronDown,
  PiList as FiMenu,
  PiX as FiX,
  PiPlus as FiPlus,
  PiRobot as FiCpu,
  PiWaveform as FiPhoneCall,
  PiFlowArrow as FiGitMerge,
  PiStack as FiLayers,
  PiDeviceMobile as FiSmartphone,
  PiBrowser as FiMonitor,
  PiCloud as FiServer,
  PiGameController as FiBox,
  PiCashRegister as FiCreditCard,
  PiMagnifyingGlass as FiSearch,
  PiMegaphone as FiTrendingUp,
  PiEnvelopeSimple as FiMail,
  PiCalendarBlank as FiCalendar,
  PiWhatsappLogo as FaWhatsapp,
  PiInstagramLogo as FiInstagram,
  PiLinkedinLogo as FiLinkedin,
  PiPhone as FiPhone,
  PiMapPin as FiMapPin,
  PiStarFill as FiStar,
  PiCheck as FiCheck,
  PiPhoneIncoming as FiPhoneIncoming,
  PiBrain as FiBrain,
  PiDatabase as FiDatabase,
  PiChatCircleText as FiChat,
  PiCode as FiCodeSimple,
  PiPaintBrush as FiDesign,
  PiChartLineUp as FiGrowth,
} from "react-icons/pi";

/** Outbound / "go" arrow. Carries the `arrow` class so buttons can nudge it. */
export function FiArrowUpRight({ className = "", ...props }) {
  return <PiArrowUpRight className={`arrow ${className}`.trim()} {...props} />;
}
