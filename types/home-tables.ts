import { LoanRequestStatus } from '@typ/loans-status'
import { Status as PaymentStatus } from '@typ/payment-status'

export interface Loan {
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
  closure_amount: number
  insurance_amount: number
  requested_amount: number
  approved_amount: number
  term: number
  base_rate: number
  insurance_rate: number
  tax_rate: number
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

export type ColumnEx = {
  uid: string
  name: string
}

export interface Payment {
  loan_payment_id: number
  loan_request_id: number
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
  balance_date: string
  remaining_amount: string
  due_date: string
  real_payment_date: string
  payment_status: {
    loan_payment_status_id: number
    description: string
    unique_description: PaymentStatus
  }
  number_payment: number
  payment_history: {
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
  }[]
  loan_details_url: string
  customer_details_url: string
  create_date: string
  update_date: string

  id: number
  personName: string
  interestAmount: string
  status: PaymentStatus
  statusName: string
  dueDate: string
  paymentDate: string
  loanRequestNumber: string
  companyName: string
  numberPayment: number
  url_loan: string
  url_user: string
}

export type PaymentEx = any