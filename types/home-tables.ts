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
  id: number
  personName: string
  amount: string
  capital: string
  interestAmount: string
  status: PaymentStatus
  statusName: string
  dueDate: string
  paymentDate: string
  loanRequestNumber: string
  companyName: string
  numberPayment: number
  url_loan?: string
  url_user?: string
}

export type PaymentEx = any