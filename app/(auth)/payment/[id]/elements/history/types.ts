export interface PaymentHistoryViewProps {
  paymentData: any
  token?: string | null
  id?: number | null
}

export interface PaymentHistoryT {
  attempt_number: number
  amount_before: number
  amount_after: number
  success: boolean
  successful_at: string | null
  processed_at: string
  payment_method: string
  payment_processor: string
  transaction_id: string | null
  associated_payment: AssociatedPayment | null
}

export interface AssociatedPayment {
  id: number
  status: string
  created_at: string
  successful_at: string | null
  returned_at: string | null
  identifier: string
  identifier_2: string
  return_code: ReturnCode | null
}

export interface ReturnCode {
  code: string
  title_en: string
  description_en: string
  stop_step: boolean
  deactivate_account: boolean
}