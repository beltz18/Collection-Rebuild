import { ArrowRight, Briefcase, ChartNoAxesColumn, Download, IdCard, Info, List, Search } from 'lucide-react'
import {
  ChangeTheme,
  Logout,
  Home,
  Loans,
  ArrowLeft,
  Payments,
  NoPayment,
  ChevronDown,
  Hamburger,
  Cross,
  History,
  Filter,
  Trash,
} from "./svg/index"

export type SizeT = { size: string }

const CommonIcons = {
  /* --------------------------- COMMON --------------------------- */
  changeTheme: {
    SVG: ({ size }: SizeT) => { return <ChangeTheme size={ size } /> }
  },
  logout: {
    SVG: ({ size }: SizeT) => { return <Logout size={ size } /> }
  },
  home: {
    SVG: ({ size }: SizeT) => { return <Home size={ size } /> }
  },
  loans: {
    SVG: ({ size }: SizeT) => { return <Loans size={ size } /> }
  },
  arrowLeft: {
    SVG: ({ size }: SizeT) => { return <ArrowLeft size={ size } /> }
  },
  arrowRight: {
    SVG: ({ size }: SizeT) => { return <ArrowRight size={ size } /> }
  },
  payments: {
    SVG: ({ size }: SizeT) => { return <Payments size={ size } /> }
  },
  noPayment: {
    SVG: ({ size }: SizeT) => { return <NoPayment size={ size } /> }
  },
  chevronDown: {
    SVG: ({ size }: SizeT) => { return <ChevronDown size={ size } /> }
  },
  hamburger: {
    SVG: ({ size }: SizeT) => { return <Hamburger size={ size } /> }
  },
  cross: {
    SVG: ({ size }: SizeT) => { return <Cross size={ size } /> }
  },
  history: {
    SVG: ({ size }: SizeT) => { return <History size={ size } /> }
  },
  filter: {
    SVG: ({ size }: SizeT) => { return <Filter size={ size } /> }
  },
  trash: {
    SVG: ({ size }: SizeT) => { return <Trash size={ size } /> }
  },
  list: {
    SVG: ({ size }: SizeT) => { return <List size={ size } /> }
  },
  idCard: {
    SVG: ({ size }: SizeT) => { return <IdCard size={ size } /> }
  },
  download: {
    SVG: ({ size }: SizeT) => { return <Download size={ size } /> }
  },
  search: {
    SVG: ({ size }: SizeT) => { return <Search size={ size } /> }
  },
  info: {
    SVG: ({ size }: SizeT) => { return <Info size={ size } /> }
  },
  briefcase: {
    SVG: ({ size }: SizeT) => { return <Briefcase size={ size } /> }
  },
  chartNoAxesColumn: {
    SVG: ({ size }: SizeT) => { return <ChartNoAxesColumn size={ size } /> }
  },
  /* --------------------------- COMMON --------------------------- */
} as const

export type IconKeys = keyof typeof CommonIcons

const ArrIcons = Object.keys({ ...CommonIcons })

export { ArrIcons }
export default CommonIcons