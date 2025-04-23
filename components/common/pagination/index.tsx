'use client'

import { useCallback } from 'react'
import { Pagination as Pag } from '@heroui/pagination'
import { PaginationProps } from './pagination.types'

export const PaginationC: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  isCompact = false,
  color,
  total,
}) => {
  const handlePageChange = useCallback(
    (page: number) =>
      onPageChange?.(page)
    ,
    [onPageChange]
  )

  return (
    <Pag
      showControls
      isCompact={ isCompact }
      total={ total }
      page={ currentPage }
      color={ color }
      onChange={ handlePageChange }
    />
  )
}

PaginationC.displayName = 'PaginationC'