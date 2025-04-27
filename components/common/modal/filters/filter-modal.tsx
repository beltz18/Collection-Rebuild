"use client"

import { useState } from "react"
import { Button } from "@heroui/button"
import { FilterIcon } from "lucide-react"
import { FilterDialog } from "./filter-dialog"
import type { FilterModalProps, FilterValue } from "./types"

export default function FilterModal<T extends Record<string, FilterValue>>({
  filterOptions,
  initialFilters,
  onFiltersApplied,
  buttonLabel = "Filter",
}: FilterModalProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<T | null>(null)

  const handleApplyFilters = (filters: T) => {
    setAppliedFilters(filters)
    setIsOpen(false)
    onFiltersApplied?.(filters)
  }

  const activeFiltersCount = appliedFilters
    ? Object.entries(appliedFilters).filter(([_, value]) => {
        if (value === undefined || value === null || value === "") {
          return false
        }

        if (typeof value === "object" && "from" in value) {
          return !!value.from
        }

        return true
      }).length
    : 0

  return (
    <div>
      <Button
        onPress={() => setIsOpen(true)}
        color="primary"
        variant="shadow"
        startContent={<FilterIcon className="h-4 w-4 outline-none" />}
        className="font-medium shadow-lg transition-transform hover:scale-105"
        endContent={
          activeFiltersCount > 0 ? (
            <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-primary">
              {activeFiltersCount}
            </span>
          ) : null
        }
      >
        {buttonLabel}
      </Button>

      <FilterDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onApplyFilters={handleApplyFilters}
        filterOptions={filterOptions}
        initialFilters={initialFilters}
      />
    </div>
  )
}