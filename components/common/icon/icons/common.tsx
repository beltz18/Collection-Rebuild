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
} from "./svg/index"

export type SizeT = { size: string }

const CommonIcons = {
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
} as const

export type IconKeys = keyof typeof CommonIcons

const ArrIcons = Object.keys({ ...CommonIcons })

export { ArrIcons }
export default CommonIcons 