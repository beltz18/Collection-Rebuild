import { PaginationProps as PagProps } from '@heroui/pagination'

export interface PaginationProps extends PagProps {
  className?: string,
  totalItems?: number,
  itemsPerPage?: number,
  currentPage?: number,
  onPageChange?: (page: number) => void
}