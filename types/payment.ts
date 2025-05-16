import { Payment } from './home-tables'

export type FilterProps = Partial<{
  page: number
  page_size: number
  search: string
  loan_payment_id?: string | number
  loan_request_id?: string | number
}>

export type PaymentResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Payment[]
}