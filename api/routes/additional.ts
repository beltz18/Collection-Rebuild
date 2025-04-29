import {
  CACHE_KEYS,
  METHODS,
  API_ROUTES,
} from '@api/cache'
import {
  useCollectionQuery,
  genericAuthRequest,
} from '@api/config'
import {
  Company,
  Branch,
  Method,
} from '@typ/base'

type FilterCompanies = Partial<{
  active: boolean
  name: string
  code: string
  is_financial_entity: boolean
}>

export const useGetCompanies = (token: string | null, filters?: FilterCompanies) => {
  return useCollectionQuery<Company[]>({
    fetcher: async () => await genericAuthRequest(METHODS.get,
      API_ROUTES.company, { ...filters },
      token ? { Authorization: `Bearer ${token}` } : undefined,
    ),
    queryKey: [CACHE_KEYS.getCompanies],
  })
}

type FilterBranches = Partial<{
  active: boolean
  name: string
  company_id: number | string | null
  default: boolean
}>

export const useGetBranches = (
  token: string | null,
  filters?: FilterBranches,
  options?: { enabled: boolean },
) => {
  return useCollectionQuery<Branch[]>({
    fetcher: async () => await genericAuthRequest(METHODS.get,
      API_ROUTES.branch, { ...filters },
      token ? { Authorization: `Bearer ${token}` } : undefined,
    ),
    queryKey: [CACHE_KEYS.getBranches],
    ...options,
  })
}

type FilterMethods = Partial<{
  active: boolean
  uses_bank_account: boolean
  actually_charges: boolean
  name: string
}>

export const useGetMethods = (
  token: string | null,
  filters?: FilterMethods,
  options?: { enabled: true },
) => {
  return useCollectionQuery<Method[]>({
    fetcher: async () => await genericAuthRequest(METHODS.get,
      API_ROUTES.method, { ...filters },
      token ? { Authorization: `Bearer ${token}` } : undefined,
    ),
    queryKey: [CACHE_KEYS.getMethods],
    ...options,
  })
}