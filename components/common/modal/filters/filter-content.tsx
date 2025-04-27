"use client"

import { motion, AnimatePresence } from "framer-motion"
import { FilterIcon } from "lucide-react"
import type { FilterContentProps, FilterValue } from "./types"

function FilterContentComponent<T extends Record<string, FilterValue>>(props: FilterContentProps<T>) {
  const { activeFilter, filterOptions, filters, handleInputChange } = props

  const activeFilterOption = filterOptions.find((option) => option.id === activeFilter)

  if (!activeFilter || !activeFilterOption) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-full flex-col items-center justify-center text-center"
      >
        <div className="mb-4 rounded-full bg-default-100 p-4">
          <FilterIcon className="h-8 w-8 text-default-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-default-700/70">No Filter Selected</h3>
        <p className="max-w-md text-default-500/70">
          Select a filter category from the sidebar to configure your search parameters.
        </p>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeFilter}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="h-full w-full"
      >
        <div>
          <h2 className="mb-4 text-lg font-semibold text-default-700">Filter by {activeFilterOption.label}</h2>
          {activeFilterOption.component({
            filter: activeFilterOption,
            values: filters,
            onChange: handleInputChange,
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export const FilterContent = FilterContentComponent as typeof FilterContentComponent