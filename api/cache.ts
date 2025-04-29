export const CACHE_KEYS = {
  getLoans: 'loans',
  getPayments: 'payments',
  getStrategies: 'strategies',
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
}

export const SYSTEM_ROUTES = {
  login: '/login',
  loan: '/loan',
  payment: '/payment',
  goToALoan: (id: number) => { return `/loan/${id}` },
  goToAPayment: (id: number) => { return `/payment/${id}` },
}