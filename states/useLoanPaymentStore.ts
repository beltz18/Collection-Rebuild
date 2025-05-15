import { create } from 'zustand'
import { 
  Loan, 
  Payment 
} from '@typ/home-tables'
import { persist } from 'zustand/middleware'

interface Props {
  loanData: Loan | null
  paymentData: Payment | null
  setLoanData: (data: Loan) => void
  setPaymentData: (data: Payment) => void
  clearData: VoidFunction
}

const initialState = {
  loanData: null,
  paymentData: null
}

export const useLoanPayment = create<Props>()(
  persist(
    (set) => ({
      ...initialState,
      setLoanData: (data) => set({ loanData: data }),
      setPaymentData: (data) => set({ paymentData: data }),
      clearData: () => set({
        loanData: null,
        paymentData: null,
      })
    }),
    { name: 'LoanPaymentData' }
  )
)