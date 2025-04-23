"use client"

import React from "react"
import { SearchIcon } from "lucide-react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Selection,
} from "@heroui/react"

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
  const headerColumns = React.useMemo(
    () =>
      columns.filter((column) =>
        Array.isArray(visibleColumns)
          ?
        visibleColumns.includes(column.uid)
          :
        visibleColumns === "all",
      ),
    [columns, visibleColumns],
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          isClearable
          placeholder="Search..."
          value={ filterValue }
          onClear={ onClearSearch }
          onValueChange={ onSearchChange }
          startContent={ <SearchIcon size={ 18 } /> }
          className="max-w-xs"
        />
        { topActions }
      </div>

      <Table
        aria-label="Custom dynamic table"
        selectionMode="multiple"
        selectedKeys={ selectedKeys }
        onSelectionChange={ onSelectionChange }
        isHeaderSticky
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
              <TableRow key={ (item as any).id }>
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