export {
  PiArrowLeft as FiArrowLeft,
  PiArrowUp as FiArrowUp,
  PiCaretDown as FiChevronDown,
  PiCaretLeft as FiChevronLeft,
  PiCaretRight as FiChevronRight,
  PiList as FiMenu,
  PiX as FiX,
  PiPlus as FiPlus,
  PiBriefcase as FiBriefcase,
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
  PiCodeBlock as FiCode,
  PiPencilLine as FiEdit3,
} from "react-icons/pi";

function AssetIcon({ src, className = "", ...props }) {
  return (
    <img
      src={src}
      alt=""
      className={`asset-icon ${className}`.trim()}
      {...props}
    />
  );
}

export function FiMail(props) {
  return <AssetIcon src="/assets/icons/email.png" {...props} />;
}

export function FiCalendar(props) {
  return <AssetIcon src="/assets/icons/calendar.png" {...props} />;
}

export function FaWhatsapp(props) {
  return <AssetIcon src="/assets/icons/whatsapp.png" {...props} />;
}

export function FiInstagram(props) {
  return <AssetIcon src="/assets/icons/instagram.png" {...props} />;
}

export function FiLinkedin(props) {
  return <AssetIcon src="/assets/icons/linkedin (1).png" {...props} />;
}

export function FiPhone(props) {
  return <AssetIcon src="/assets/icons/telephone.png" {...props} />;
}

export function FiMapPin(props) {
  return <AssetIcon src="/assets/icons/location.png" {...props} />;
}

export function FiArrowUpRight({ className = "", ...props }) {
  return (
    <img
      src="/assets/icons/link-open.png"
      alt=""
      className={`link-open-icon ${className}`.trim()}
      {...props}
    />
  );
}
