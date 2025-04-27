import {
  ArrowRight,
  Briefcase,
  Calendar,
  ChartNoAxesColumn,
  CreditCard,
  DollarSign,
  Download,
  Eraser,
  Eye,
  IdCard,
  Info,
  List,
  Plus,
  RefreshCcw,
  RefreshCw,
  Search,
  Sliders,
} from 'lucide-react'
import {
  ChangeTheme,
  Logout,
  Home,
  Loans,
  ArrowLeft,
  Payments,
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
  dollarSign: {
    SVG: ({ size }: SizeT) => { return <DollarSign size={ size } /> }
  },
  refreshCw: {
    SVG: ({ size }: SizeT) => { return <RefreshCw size={ size } /> }
  },
  creditCard: {
    SVG: ({ size }: SizeT) => { return <CreditCard size={ size } /> }
  },
  calendar: {
    SVG: ({ size }: SizeT) => { return <Calendar size={ size } /> }
  },
  eraser: {
    SVG: ({ size }: SizeT) => { return <Eraser size={ size } /> }
  },
  eye: {
    SVG: ({ size }: SizeT) => { return <Eye size={ size } /> }
  },
  sliders: {
    SVG: ({ size }: SizeT) => { return <Sliders size={ size } /> }
  },
  plus: {
    SVG: ({ size }: SizeT) => { return <Plus size={ size } /> }
  },
  /* --------------------------- COMMON --------------------------- */
} as const

export type IconKeys = keyof typeof CommonIcons

const ArrIcons = Object.keys({ ...CommonIcons })

export { ArrIcons }
export default CommonIcons