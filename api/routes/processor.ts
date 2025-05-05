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
  ProcessorT,
  ProcessorType,
  SEC_Code,
} from '@typ/processor'

type ProcessorsResponse = ProcessorT[]

type FilterProps = Partial<{
  search: string
  processor_type: ProcessorType
  active: boolean
  sec_code: SEC_Code
  use_same_day_ach: boolean
  unique_name: string
}>

export const useGetProcessors = (token: string | null, filters?: FilterProps) => {
  return useCollectionQuery<ProcessorsResponse>({
    fetcher: async () => await genericAuthRequest(METHODS.get,
      API_ROUTES.processor, { ...filters },
      token ? { Authorization: `Bearer ${token}` } : undefined
    ),
    queryKey: [CACHE_KEYS.getProcessors, filters],
  })
}