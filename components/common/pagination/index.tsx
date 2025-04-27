'use client'

import { useCallback } from 'react'
import { Pagination as Pag } from '@heroui/pagination'
import { PaginationProps } from './pagination.types'
import { useTheme } from '@ctx/themeContext'

export const PaginationC: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  isCompact = false,
  color,
  total,
}) => {
  const { theme } = useTheme()

  const handlePageChange = useCallback(
    (page: number) =>
      onPageChange?.(page)
    ,
    [onPageChange]
  )

  const variants: Record<string, 'default' | 'secondary' | 'primary' | 'danger'> = {
    light: 'default',
    dark: 'secondary',
    blue: 'primary',
    red: 'danger',
  }

  return (
    <Pag
      showControls
      isCompact={ isCompact }
      total={ total }
      page={ currentPage }
      color={ variants[theme] ?? 'primary' }
      onChange={ handlePageChange }
    />
  )
}

PaginationC.displayName = 'PaginationC'