import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TokenStore = {
  token: string | null
  setToken: (token: string) => void
  logout: VoidFunction
}

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    { name: 'token-storage' }
  )
)