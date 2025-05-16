import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Props {
  receipt: any | null
  setReceipt: (data: any) => void
  clearData: VoidFunction
}

const initialState = { receipt: null }

export const usePaymentReceipt = create<Props>()(
  persist(
    (set) => ({
      ...initialState,
      setReceipt: (data) => set({ receipt: data }),
      clearData: () => set({ receipt: null })
    }),
    { name: 'receipt-store' }
  )
)