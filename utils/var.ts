const SERVER_URI  = process.env.NEXT_PUBLIC_SERVER
const APPNAME     = process.env.NEXT_PUBLIC_APPNAME || ''
const DESCRIPTION = process.env.NEXT_PUBLIC_DESCRIPTION
const LOGO_FOOTER = process.env.NEXT_PUBLIC_FOOTER || '/assets/footer.png'
const LOGO_ENTITY = process.env.NEXT_PUBLIC_ENTITY || '/assets/entity.png'
const CONTRAST    = process.env.NEXT_PUBLIC_ENTITY_CONTRAST || '/assets/entity.png'

const PAGES = {
  login: 'Login',
  home: 'Home',
  payment: 'Payments',
  loan: 'Loans',
  strategy: 'Payment strategies',
  processor: 'Payment processors',
  step: 'Payment steps',
}

export {
  SERVER_URI,
  LOGO_ENTITY,
  LOGO_FOOTER,
  CONTRAST,
  APPNAME,
  DESCRIPTION,
  PAGES,
}