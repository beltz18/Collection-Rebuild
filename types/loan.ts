import { Loan } from './home-tables'

export type FilterProps = Partial<{
  page: number
  page_size: number
  search: string
  loan_request_id?: string | number
}>

export type LoanResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Loan[]
}