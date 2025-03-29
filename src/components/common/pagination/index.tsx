import { Pagination } from "@heroui/pagination"
import React, { useCallback } from "react"

type PaginationProps = {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
  className?: string
  isCompact?: boolean
  color?: "default" | "primary" | "secondary" | "warning" | "danger" | "success"
}

export const PaginationC: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  isCompact = false,
  color
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1

  const handlePageChange = useCallback(
    (page: number) => {
      onPageChange(page)
    },
    [onPageChange]
  )

  return (
      <Pagination
        isCompact={isCompact}
        showControls
        total={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color={color}
      />
  )
}

PaginationC.displayName = "PaginationC"