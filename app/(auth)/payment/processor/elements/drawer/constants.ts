import { Info, Key, Server, SlidersHorizontal } from "lucide-react"
import type { PaymentProcessorFormData } from "./types"

export const navItems = [
  { label: "Basic Information", href: "#basic", icon: Info },
  { label: "Credentials", href: "#credentials", icon: Key },
  { label: "SFTP Configuration", href: "#sftp", icon: Server },
  { label: "Additional Settings", href: "#settings", icon: SlidersHorizontal },
]

export const initialFormData: PaymentProcessorFormData = {
  name: "",
  description: "",
  processor_type: "both",
  user: "",
  password: "",
  url: "",
  sftp_host: "",
  sftp_username: "",
  sftp_password: "",
  store_id: "",
  client_id: "",
  location_id: "",
  sec_code: "ppd",
  use_same_day_ach: true,
  enabled_for_lender_web: true,
  active: true,
}

export const optionsSecCode = [
  { key: "ppd", label: "PPD" },
  { key: "ccd", label: "CCD" },
  { key: "web", label: "WEB" },
  { key: "tel", label: "TEL" },
  { key: "pop", label: "POP" },
  { key: "arc", label: "ARC" },
  { key: "boc", label: "BOC" },
  { key: "rck", label: "RCK" },
  { key: "icl", label: "ICL" },
  { key: "ic2", label: "IC2" },
  { key: "rtp", label: "RTP" },
]