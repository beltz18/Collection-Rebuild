'use client'

import { useCallback } from 'react'
import { Pagination as Pag } from '@heroui/pagination'
import { PaginationProps } from './pagination.types'
import { useTheme } from '@ctx/themeContext'
import { variants } from '@uti/consts'

export const PaginationC: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  isCompact = true,
  total,
}) => {
  const { theme } = useTheme()

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
      color={ variants[theme] ?? 'primary' }
      onChange={ handlePageChange }
    />
  )
}

PaginationC.displayName = 'PaginationC'