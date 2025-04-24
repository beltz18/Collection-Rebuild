import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { SERVER_URI } from '@uti/var'

const SERVER = SERVER_URI

export const collectionAPI = axios.create({
  baseURL: SERVER,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export const genericAuthRequest = async (
  method: 'get' | 'post' | 'put' | 'delete' | 'patch', 
  path: string, 
  data?: Record<string, unknown> | unknown[]
) => {
  const response = await collectionAPI({
    method,
    url: path,
    withCredentials: true,
    params: method === 'get' ? data : undefined,
    data: method !== 'get' ? data : undefined
  })

  return response.data
}

type CollectionAPIProps<T> = {
  fetcher: () => Promise<T>
  queryKey: unknown[]
  options?: Omit<UseQueryOptions<T, Error, T, unknown[]>, 'queryKey' | 'queryFn' | 'initialData' | 'retry' | 'refetchOnWindowFocus' | 'staleTime'>,
}

export const useCollectionQuery = <T>({
  fetcher,
  queryKey,
  options,
}: CollectionAPIProps<T | null>) => {
  const query = useQuery({
    queryKey: queryKey.filter(x => x),
    queryFn: async () => {
      try { return await fetcher() }
      catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404 && error.response.statusText === 'Not Found')
            return null
        }

        throw error
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1 * 1000 * 15,
    ...options,
  })

  if (query.error)
    console.log('error here at hook', query.error)

  return query
}

type CollectionMutation<PayloadRequest, Response> = {
  fetcher: (data: PayloadRequest) => Promise<Response>
  options?: UseMutationOptions<Response, Error, PayloadRequest, unknown[]>
}

export const useCollectionMutation = <PayloadRequest, Response>({
  fetcher,
  options,
}: CollectionMutation<PayloadRequest, Response>) => {
  const mutation = useMutation({
    mutationFn: (data) => fetcher(data),
    ...options,
  })

  if (mutation.isError)
    console.log('error here at hook', mutation.error)

  return mutation
}