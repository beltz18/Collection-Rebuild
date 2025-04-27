import { Skeleton as Ske } from '@heroui/skeleton'
import { SkeletonProps } from '@heroui/skeleton'
import { TableSkeletonProps } from './skeleton.types'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/react'
import { cn } from '@uti/cn'

export const Skeleton = ({
  className,
  children,
  ...props
} : SkeletonProps) => {
  return (
    <Ske
      className={`${className}`}
      { ...props }
    >
      { children }
    </Ske>
  )
}

export const SkeletonDefault = ({ className }: SkeletonProps) => {
  return (
    <div className={ cn('w-full space-y-4 p-4 rounded-lg h-20', className) }>
      <Skeleton className='rounded-lg h-full w-full'>
        <div className='h-full w-full rounded-lg bg-secondary' />
      </Skeleton>
    </div>
  )
}

export const SkeletonContent = ({ className }: SkeletonProps) => {
  return (
    <div className='w-full space-y-4 p-4 rounded-lg' >
      <Skeleton className={ cn('rounded-lg w-full h-20', className) }>
        <div className='h-full w-full rounded-lg bg-secondary' />
      </Skeleton>

      <div className='space-y-3'>
        <Skeleton className='w-3/5 rounded-lg'>
          <div className='h-4 rounded-lg bg-secondary' />
        </Skeleton>

        <Skeleton className='w-4/5 rounded-lg'>
          <div className='h-4 rounded-lg bg-secondary-300' />
        </Skeleton>

        <Skeleton className='w-2/5 rounded-lg'>
          <div className='h-4 rounded-lg bg-secondary-200' />
        </Skeleton>
      </div>
    </div>
  )
}

export const SkeletonTable = ({
  rows = 5,
  columns,
}: TableSkeletonProps) => {
  return (
    <Table
      aria-label='Loading data'
      selectionMode='multiple'
      isHeaderSticky
    >
      <TableHeader columns={ columns }>
        {
          (column) => (
            <TableColumn key={ column.uid }>
              { column.name }
            </TableColumn>
          )
        }
      </TableHeader>

      <TableBody>
        {
          Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>
              {
                columns.map((column) => (
                  <TableCell
                    key={`${rowIndex}-${column.uid}`}
                    className='w-96'
                  >
                    <Skeleton className='w-full h-8 rounded-lg' />
                  </TableCell>
                ))
              }
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}