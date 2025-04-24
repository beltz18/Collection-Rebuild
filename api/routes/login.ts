import {
  ROUTES,
  METHODS,
} from '@api/cache'

import {
  genericAuthRequest,
  useCollectionMutation,
} from '@api/config'

export const useAuthenticateUser = () => {
  return useCollectionMutation<{}, { message: string, data: { token: string } }>({
    fetcher: async (data) =>
      await genericAuthRequest(METHODS.post, ROUTES.login, data)
  })
}