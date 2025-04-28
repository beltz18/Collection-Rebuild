import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { MenuPropsContext } from "@sec/menufilters/menu.types"
import type { Loan, Payment } from "@typ/home-tables"

interface MenuStore extends MenuPropsContext {
  setSearch: (search: string) => void
  setTabs: (tabs: "table" | "cards") => void
  setRows: (rows: number[]) => void
  setSelectedRow: (selectedRow: number) => void

  addFilter: (key: string, value: any) => void
  removeFilter: (key: string) => void
  clearFilters: () => void

  setSelectedCells: (cells: Loan[] | Payment[]) => void
  removeSelectedCell: (id: string) => void
  clearSelectedCells: () => void

  resetState: () => void
}

const initialState: MenuPropsContext = {
  search: "",
  tabs: "table",
  rows: [4, 8, 12],
  selectedRow: 0,
  filters: [],
  selectedCells: [],
}

export const useMenuStore = create<MenuStore>()(
  persist(
    (set) => ({
      ...initialState,
      setSearch: (search) => set({ search }),
      setTabs: (tabs) => set({ tabs }),
      setRows: (rows) => set({ rows }),
      setSelectedRow: (selectedRow) => set({ selectedRow }),

      addFilter: (key, value) =>
        set((state) => {
          const existingFilterIndex = state.filters.findIndex((filter) => filter.key === key)
          if (existingFilterIndex >= 0) {
            const updatedFilters = [...state.filters]
            updatedFilters[existingFilterIndex] = { key, value }
            return { filters: updatedFilters }
          } else {
            return { filters: [...state.filters, { key, value }] }
          }
        }),

      removeFilter: (key) =>
        set((state) => ({
          filters: state.filters.filter((filter) => filter.key !== key),
        })),
      clearFilters: () => set({ filters: [] }),

      setSelectedCells: (selectedCells) => set({ selectedCells }),
      removeSelectedCell: (id) =>
        set((state) => ({
          selectedCells: (state.selectedCells as any[]).filter((cell) => !("id" in cell) || cell.id !== id),
        })),
      clearSelectedCells: () => set({ selectedCells: [] }),

      resetState: () => set(initialState),
    }),
    {
      name: "menu-storage",
      partialize: (state) => ({
        search: state.search,
        tabs: state.tabs,
        selectedRow: state.selectedRow,
        filters: state.filters,
      }),
    },
  ),
)