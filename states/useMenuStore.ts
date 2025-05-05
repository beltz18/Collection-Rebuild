import { create } from 'zustand'
import type { MenuPropsContext } from '@sec/menufilters/menu.types'
import type { Loan, Payment } from '@typ/home-tables'

// Store Loan
interface MenuStoreLoan extends MenuPropsContext {
  setSearch: (search: string) => void
  setTab: (tab: 'table' | 'card') => void
  setSelectedCells: (cells: Loan[] | Payment[]) => void
  clearSelectedCells: () => void
}

const initialStateLoan: MenuPropsContext = {
  search: '',
  tab: 'table',
  filters: [],
  selectedCells: [],
}

export const useMenuStoreLoan = create<MenuStoreLoan>()(
  (set) => ({
    ...initialStateLoan,
    setSearch: (search) => set({ search }),
    setTab: (tab) => set({ tab }),
    clearFilters: () => set({ filters: [] }),
    setSelectedCells: (cells) => set({ selectedCells: cells }),
    clearSelectedCells: () => set({ selectedCells: [] }),
  })
)

// Store Payment
interface MenuStorePayment extends MenuPropsContext {
  setSearch: (search: string) => void
  setTab: (tab: 'table' | 'card') => void
  setSelectedCells: (cells: Loan[] | Payment[]) => void
  clearSelectedCells: () => void
}

const initialStatePayment: MenuPropsContext = {
  search: '',
  tab: 'table',
  filters: [],
  selectedCells: [],
}

export const useMenuStorePayment = create<MenuStorePayment>()(
  (set) => ({
    ...initialStatePayment,
    setSearch: (search) => set({ search }),
    setTab: (tab) => set({ tab }),
    clearFilters: () => set({ filters: [] }),
    setSelectedCells: (cells) => set({ selectedCells: cells }),
    clearSelectedCells: () => set({ selectedCells: [] }),
  })
)