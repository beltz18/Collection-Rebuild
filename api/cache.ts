export const CACHE_KEYS = {
  getLoans: 'loans',
  getPayments: 'payments',
  getStrategies: 'strategies',
  getSteps: 'steps',
  getProcessors: 'processors',
  getCompanies: 'companies',
  getBranches: 'branches',
  getMethods: 'methods',
}

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'
export const METHODS: Record<HttpMethod, HttpMethod> = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete',
  patch: 'patch',
}

export const API_ROUTES = {
  login: '/login/',
  loan: '/loan-requests/',
  payment: '/loan-payments/',
  strategy: '/api/payment-strategies/',
  steps: '/api/payment-steps/',
  processor: '/payment-processors/',
  company: '/api/companies/',
  branch: '/api/branches/',
  method: '/api/payment-methods/',
}

export const SYSTEM_ROUTES = {
  login: '/login',
  loan: '/loan',
  payment: '/payment',
  goToALoan: (id: number) => { return `/loan/${id}` },
  goToAPaymentFromLoan: (id: number) => { return `/loan/${id}?tab=payment` },
  goToAPayment: (id: number) => { return `/payment/${id}` },
}