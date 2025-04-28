import { PaginationProps as PagProps } from '@heroui/pagination'

export interface PaginationProps extends PagProps {
  className?: string,
  currentPage?: number,
  onPageChange?: (page: number) => void
}