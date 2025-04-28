import { Loan, Payment } from "@typ/home-tables"

export interface MenuPropsContext {
  search: string
  tabs: 'table' | 'cards'
  rows: number[]
  selectedRow: number
  filters: {
    key: string
    value: any
  }[]
  selectedCells: Loan[] | Payment[]
}