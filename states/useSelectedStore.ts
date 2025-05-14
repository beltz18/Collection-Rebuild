import { create } from 'zustand'
import { StrategyT } from '@typ/strategy'
import { ProcessorT } from '@typ/processor'

interface SelectedProps {
  selectedCells: StrategyT[]
  setSelectedCells: (cells: StrategyT[]) => void
  selectedCellsP: ProcessorT[]
  setSelectedCellsP: (cells: ProcessorT[]) => void
  clearSelectedCells: () => void
}

const initialStateLoan = {
  selectedCells: [],
  selectedCellsP: []
}

export const useSelected = create<SelectedProps>()(
  (set) => ({
    ...initialStateLoan,
    setSelectedCells: (cells) => set({ selectedCells: cells }),
    setSelectedCellsP: (cells) => set({ selectedCellsP: cells }),
    clearSelectedCells: () => set({ selectedCells: [] }),
  })
)