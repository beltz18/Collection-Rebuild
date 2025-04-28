import { LoanRequestStatus } from '@typ/loans-status'
import { Status as PaymentStatus } from '@typ/payment-status'

export interface Loan {
  id: string
  loan_request_id: number
  loan_details_url: string
  customer_details_url: string
  payment_frequency: {
    description: string
    unique_description: string
  }
  create_date: Date | string | null
  update_date: Date | string | null
  request_date: Date | string | null
  sign_date: Date | string | null
  disbursment_date: Date | string | null
  closure_amount: number | string
  insurance_amount: number | string
  requested_amount: number | string
  approved_amount: number | string
  term: number
  base_rate: number | string
  insurance_rate: number | string
  tax_rate: number | string
  observations: string | null
  person: {
    person_id: number
    first_name: string | null
    last_name: string | null
    email: string | null
  }
  currency: {
    currency_id: number
    create_date: Date | string | null
    update_date: Date | string | null
    code: string | null
    description: string | null
    currency_asterion_id: number
  }
  status: {
    loan_request_status_id: number
    description: string
    unique_description: LoanRequestStatus
  }
  loan_destination: {
    loan_destination_id: number
    description: string
    unique_description: string
  }
}

export type Column = {
  uid: string
  name: string
}

type PaymentHistoryT = {
  attempt_number?: number
  amount_before?: string
  amount_after?: string
  success?: boolean
  successful_at?: string
  processed_at?: string
  payment_method?: string
  payment_processor?: string
  transaction_id?: string
  associated_payment?: {
    id?: number
    status?: string
    created_at?: string
    successful_at?: string
    returned_at?: string
    identifier?: string
    identifier2?: string
    return_code?: {
      code?: string
      title_en?: string
      description_en?:string
      stop_step?: boolean
      deactivate_account?: boolean
    } | null
  } | null
}

export interface Payment {
  id: string
  loan_payment_id: number
  loan_request_id: number
  loan_request_number: string
  person: {
    person_id: number
    first_name: string
    last_name: string
    email: string
  }
  company_name: string
  amount: string
  capital: string
  interest_amount: string
  arrears_amount: string
  other_debts: string
  balance_date: string | null
  remaining_amount: string
  due_date: string
  real_payment_date: string | null
  payment_status: {
    loan_payment_status_id: number
    unique_description: PaymentStatus
  }
  number_payment: number
  payment_history: PaymentHistoryT[]
  loan_details_url: string
  customer_details_url: string
  create_date: string
  update_date: string
}

export type PaymentEx = any