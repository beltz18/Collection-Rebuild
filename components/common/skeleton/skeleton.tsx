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
} from "@heroui/react"

export const Skeleton = ({className, children, ...props} : SkeletonProps) => {
  return (
    <Ske className={`${className}`} {...props}>{children}</Ske>
  )
}

export const TableSkeleton = ({ 
  rows = 5, 
  columns, 
}: TableSkeletonProps) => {
  return (
    <Table aria-label="Loading data" selectionMode="multiple" isHeaderSticky>
      <TableHeader  columns={columns}>
        {(column) => (
          <TableColumn key={column.uid}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((index, rowIndex) => (
          <TableRow key={`row-${rowIndex}`}>
            {columns.map((column) => (
              <TableCell className='w-96' key={`${rowIndex}-${column.uid}`}>
                <Skeleton className="w-full h-8 rounded-lg" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const ContentSkeleton = () => {
  return (
    <div className="w-full space-y-4 p-4 rounded-lg" >
      <Skeleton className="rounded-lg h-32 w-full">
        <div className="h-full w-full rounded-lg bg-secondary" />
      </Skeleton>

      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-4 rounded-lg bg-secondary" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-4 rounded-lg bg-secondary-300" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-4 rounded-lg bg-secondary-200" />
        </Skeleton>
      </div>
    </div>
  )
}