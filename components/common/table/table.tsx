'use client'

import { useMemo } from 'react'
import { Loan } from '@typ/home-tables'
import { variants } from '@uti/consts'
import { useTheme } from '@ctx/themeContext'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
} from '@heroui/react'

type Column = {
  uid: string
  name: string
}

type CustomTableProps<T> = {
  columns: Column[]
  data: T[]
  filterValue: string
  visibleColumns: string[]
  selectedKeys: Selection
  topActions?: React.ReactNode
  renderCell: (item: T, columnKey: React.Key) => React.ReactNode
  onSearchChange: (val: string) => void
  onClearSearch: () => void
  onSelectionChange: (keys: any) => void
}

export function CustomTable<T>({
  data,
  columns,
  filterValue,
  visibleColumns,
  selectedKeys,
  renderCell,
  topActions,
  onSearchChange,
  onClearSearch,
  onSelectionChange,
}: CustomTableProps<T>) {
  const { theme } = useTheme()

  const headerColumns = useMemo(
    () =>
      columns.filter((column) =>
        Array.isArray(visibleColumns)
          ?
        visibleColumns.includes(column.uid)
          :
        visibleColumns === 'all',
      ),
    [columns, visibleColumns],
  )

  return (
    <div>
      <Table
        aria-label='Custom dynamic table'
        selectionMode='multiple'
        selectedKeys={ selectedKeys }
        onSelectionChange={ onSelectionChange }
        isHeaderSticky
        color={ variants[theme] ?? 'primary' }
      >
        <TableHeader columns={ headerColumns }>
          {
            (column) => (
              <TableColumn key={ column.uid }>
                { column.name }
              </TableColumn>
            )
          }
        </TableHeader>

        <TableBody items={ data }>
          {
            (item) => (
              <TableRow key={ (item as Loan).loan_request_id }>
                {
                  (columnKey) => (
                    <TableCell>
                      { renderCell(item, columnKey) }
                    </TableCell>
                  )
                }
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}