export type secCode = "ppd" | "ccd" | "web" | "tel" | "pop" | "arc"  |"boc" | "rck" | "icl" | "ic2" | "rtp"

type processor = "debit" | "credit" | "both"

export interface PaymentProcessorFormData {
  name: string
  description?: string
  processor_type?: processor
  user?: string
  password?: string
  url?: string
  sftp_host?: string
  sftp_username?: string
  sftp_password?: string
  store_id?: string
  client_id?: string
  location_id?: string
  sec_code: secCode
  use_same_day_ach?: boolean
  enabled_for_lender_web?: boolean
  active?: boolean
}