import {
  CACHE_KEYS,
  METHODS,
  API_ROUTES,
} from '@api/cache'
import {
  useCollectionQuery,
  genericAuthRequest,
} from '@api/config'
import { ProcessorT } from '@typ/processor'

type ProcessorsResponse = ProcessorT[]

export const useGetProcessors = (token: string | null) => {
  return useCollectionQuery<ProcessorsResponse>({
    fetcher: async () => await genericAuthRequest(METHODS.get,
      API_ROUTES.processor, { },
      token ? { Authorization: `Bearer ${token}` } : undefined
    ),
    queryKey: [CACHE_KEYS.getProcessors],
  })
}