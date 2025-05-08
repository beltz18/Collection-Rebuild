import { Loan } from './home-tables'

export type FilterProps = Partial<{
  page: number
  page_size: number
  search: string
}>

export type LoanResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Loan[]
}