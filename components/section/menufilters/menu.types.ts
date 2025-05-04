import { Loan, Payment } from '@typ/home-tables'

export interface MenuPropsContext {
  search: string
  tab: 'table' | 'card'
  filters: {
    key: string
    value: any
  }[]
  selectedCells: Loan[] | Payment[]
}