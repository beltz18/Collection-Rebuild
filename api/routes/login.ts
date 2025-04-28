import {
  API_ROUTES,
  METHODS,
} from '@api/cache'

import {
  genericAuthRequest,
  useCollectionMutation,
} from '@api/config'

type ResponseProps = {
  message: string
  data: {
    token: string
  }
}

type SendProps = {
  username: string
  password: string
}

export const useAuthenticateUser = () => {
  return useCollectionMutation<SendProps, ResponseProps>({
    fetcher: async (data) =>
      await genericAuthRequest(METHODS.post, API_ROUTES.login, data)
  })
}