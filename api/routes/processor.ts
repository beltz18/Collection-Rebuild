import {
  CACHE_KEYS,
  METHODS,
  API_ROUTES,
} from '@api/cache'
import {
  useCollectionQuery,
  genericAuthRequest,
  useCollectionMutation
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

type secCode = "ppd" | "ccd" | "web" | "tel" | "pop" | "arc"  |"boc" | "rck" | "icl" | "ic2" | "rtp"

type processor = "debit" | "credit" | "both"

type SendProps = {
  name: string
  description?: string
  processor_type?: processor
  user?: string
  password?: string
  url?: string
  sftp_host?: string
  sftp_username?: string
  sftp_password?: string
  store_id?: string
  client_id?: string
  location_id?: string
  sec_code: secCode
  use_same_day_ach?: boolean
  enabled_for_lender_web?: boolean
  active?: boolean
}

export const usePostProcessors = (token: string | null) => {
  return useCollectionMutation<SendProps, {}>({
    fetcher: async (data) =>
      await genericAuthRequest(
      METHODS.post, 
      API_ROUTES.processor, data,
      token ? { Authorization: `Bearer ${token}` } : undefined,
    )
  })
}