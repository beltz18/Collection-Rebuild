import { useTokenStore } from '@sts/useTokenStore'

export const getSession = () => {
  const token = useTokenStore.getState().token
  return token ? { token } : null
}