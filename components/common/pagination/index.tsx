'use client'

import { Pagination as Pag } from "@heroui/pagination"
import { PaginationProps } from "./pagination.types"
import React, { useCallback } from "react"

export const PaginationC: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  isCompact = false,
  color
}) => {
  const totalPages = Math.ceil((totalItems || 0) / (itemsPerPage || 1)) || 10

  const handlePageChange = useCallback(
    (page: number) => {
      onPageChange?.(page)
    },
    [onPageChange]
  )

  return (
    <Pag
      isCompact={isCompact}
      showControls
      total={totalPages}
      page={currentPage}
      color={color}
      onChange={handlePageChange}
    />
  )
}

PaginationC.displayName = "PaginationC"