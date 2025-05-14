"use client"

import { useState } from "react"
import { Button } from "@heroui/button"
import { Divider } from "@heroui/divider"
import { FilterSidebar } from "./filter-sidebar"
import { FilterContent } from "./filter-content"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal"
import { RefreshCw, Check, X } from "lucide-react"
import type { FilterDialogProps, FilterValue } from "./types"

function FilterDialogComponent<T extends Record<string, FilterValue>>(props: FilterDialogProps<T>) {
  const { isOpen, onClose, onApplyFilters, filterOptions, initialFilters = {} } = props

  const [filters, setFilters] = useState<T>(() => {
    const empty: Record<string, FilterValue> = {}
    filterOptions.forEach(({ key }) => (empty[key as string] = ""))
    return { ...empty, ...initialFilters } as T
  })
  
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [isApplying, setIsApplying] = useState(false)

  const handleInputChange = (key: keyof T, value: FilterValue) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleApplyFilters = () => {
    setIsApplying(true)
    setTimeout(() => {
      onApplyFilters?.(filters)
      setIsApplying(false)
    }, 500)

    console.log(filters);
    
  }

  const handleClearFilters = () => {
    setFilters(() => {
      const cleared: Record<string, FilterValue> = {}
      filterOptions.forEach(({ key }) => (cleared[key as string] = ""))
      return cleared as T
    })
    setActiveFilter(null)
  }

  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (typeof value === "object" && value && "from" in value) {
      return Boolean(value.from)
    }
    return value !== undefined && value !== null && value !== ""
  }).length

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      size="4xl"
      classNames={{
        backdrop: "backdrop-blur-sm bg-black/30",
        base: "border border-default-200 dark:border-default-100/20",
        header: "border-b border-default-200 dark:border-default-100/40",
        footer: "border-t border-default-200 dark:border-default-100/40",
      }}
      motionProps={{
        variants: {
          enter: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" }},
          exit: { y: 20, opacity: 0, transition: { duration: 0.2, ease: "easeIn" }},
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-primary-800">Filter Options</h2>
              {!!activeFiltersCount && (
                <p className="text-xs text-default-500">
                  {activeFiltersCount} {activeFiltersCount === 1 ? "filter" : "filters"} selected
                </p>
              )}
            </ModalHeader>

            <Divider className="opacity-50" />

            <ModalBody className="overflow-hidden p-0">
              <div className="flex h-[500px]">
                <FilterSidebar
                  filterOptions={filterOptions}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  filters={filters}
                />
                <div className="flex-1 p-6">
                  <FilterContent
                    activeFilter={activeFilter}
                    filterOptions={filterOptions}
                    filters={filters}
                    handleInputChange={handleInputChange}
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="flex justify-between">
              <Button
                color="default"
                variant="ghost"
                onPress={handleClearFilters}
                startContent={<RefreshCw size={16} />}
                className="border-default-300 font-medium outline-none"
              >
                Clear Filters
              </Button>

              <div className="flex gap-3">
                <Button
                  color="danger"
                  variant="flat"
                  radius="md"
                  onPress={onClose}
                  startContent={<X size={16} />}
                  className="font-medium outline-none"
                >
                  Cancel
                </Button>

                <Button
                  color="primary"
                  onPress={handleApplyFilters}
                  startContent={!isApplying && <Check size={16} />}
                  isLoading={isApplying}
                  className="font-medium outline-none"
                >
                  {isApplying ? "Applying..." : "Apply Filters"}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export const FilterDialog = FilterDialogComponent as typeof FilterDialogComponent