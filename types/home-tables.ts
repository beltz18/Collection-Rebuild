import { LoanRequestStatus } from "@typ/loans-status"
import { 
  Status as PaymentStatus, 
} from "@typ/payment-status"

export type LoanEx = {
  id: number
  person_id?: number
  customer: string
  status: LoanRequestStatus
  statusName?: string
  date: string
  requested?: string
  approved?: string
  term: string
  url_loan?: string
  url_user?: string
  fullLoan?: any
}

export type ColumnEx = {
  uid: string
  name: string
}

export type PaymentEx = {
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