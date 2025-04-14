import { create } from "zustand"
import { 
  persist, 
  createJSONStorage 
} from "zustand/middleware"

type TokenStore = {
  token: string | null
  setToken: (token: string) => void
  clear: VoidFunction
}

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clear: () => set({ token: null }),
    }),
    {
      name: "token-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)