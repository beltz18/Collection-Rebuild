import type { SkeletonProps as SkeletonT } from '@heroui/skeleton'
type Column = {
  uid: string
  name: string
}

export interface SkeletonProps extends SkeletonT {
  className?: string
}

export interface TableSkeletonProps {
  rows?: number
  columns: Column[]
  showHeader?: boolean
}