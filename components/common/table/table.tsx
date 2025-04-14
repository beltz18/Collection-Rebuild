'use client'

import { Button } from '@com/index'
import { CustomCheckbox } from '@com/index'
import { Split } from '@com/index'
import { Icon } from '@com/icon'
import { cn } from '@uti/cn'
import { Tooltip } from '@com/index'
import Link from 'next/link'
import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  CellContext,
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  HeaderContext,
  Row,
  RowData,
  useReactTable,
} from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    centerHeader?: boolean,
    headerClassName?: string,
    centerCell?: boolean,
    cellClassName?: string,
    tooltip?: boolean,
  }
}

interface TableProps<T> {
  data: Array<T>,
  columns: Array<ColumnDef<T, unknown>>,
  actions?: Partial<{
    multiselect: boolean,
    delete: boolean,
    deleteFn: (value: number[]) => Promise<void>,
    keyId: keyof T,
  }>
  pageCount: number,
  getSubRows?: (row: T) => T[],
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement,
  getRowCanExpand?: (row: Row<T>) => boolean,
}

export const Table = <T extends object>({
  data,
  columns,
  actions,
  getSubRows,
  renderSubComponent,
  getRowCanExpand,
}: TableProps<T>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [expanded, setExpanded] = useState<ExpandedState>({})
  // const [isLoading, setIsLoading] = useState(false)

  const table = useReactTable({
    data,
    columns: [
      actions?.multiselect && {
        id: 'select',
        header: ({ table }: HeaderContext<T, string>) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }: CellContext<T, unknown>) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        )
      }, 
      ...columns].filter(x => x) as Array<ColumnDef<T, unknown>>,
    filterFns: {},
    state: {
      columnFilters,
      rowSelection,
      expanded,
    },
    enableRowSelection: true,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand, 
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    manualPagination: true,
    // manualFiltering: true,
    // manualSorting: true,
    getSubRows,
    // enableSortingRemoval: false,
  })

  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => Number(row.original[actions?.keyId as keyof T]))

  return (
    <>
      {actions && (
        <Split className='items-center gap-2'>
          {actions.delete && (
            <>
              <Button
                type='button'
                size='sm'
                disabled={selectedIds.length === 0}
                onPress={async () => {
                  if (actions.deleteFn)
                    await actions.deleteFn(selectedIds)
                }}
              >
                <Icon icon='trash' />
              </Button>

              {/* <Modal>
                <ModalTrigger>
                  <Button
                    type='button'
                    size='sm'
                    disabled={ selectedIds.length === 0 }
                    placeholder=''
                  >
                    <Icon icon='basura' />
                  </Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader className='justify-end' />
                  <ModalBody className='items-center'>
                    <Icon icon='trash' size='2xl' />
                    <Stack>
                      <h3 className='font-bold text-black'>
                        Se eliminarán y/o desvincularán {selectedIds.length}{' '}
                        elemento(s)
                      </h3>
                      <p>
                        Los elementos seleccionados y sus vinculaciones se
                        eliminarán permanentemente y no podrá recuperar su
                        información.
                      </p>
                    </Stack>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant='primary-outline'
                      onClick={() => closeModal()}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant='danger-outline'
                      onClick={async () => {
                        if (actions.deleteFn) {
                          setIsLoading(true)
                          await actions.deleteFn(selectedIds)
                          closeModal()
                          table.resetRowSelection()
                          setIsLoading(false)
                        }
                      }}
                      disabled={isLoading}
                    >
                      <Icon icon='basura' size='sm' />
                      Eliminar
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal> */}
            </>
          )}
        </Split>
      )}

      <table className='w-full'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={ headerGroup.id }>
              {
                headerGroup.headers.map(header => {
                  const isSorted = header.column.getIsSorted()
                  const canSort = header.column.getCanSort()
                  const meta = header.column.columnDef.meta

                  return (
                    <th
                      key={ header.id }
                      className='text-start text-gray-90 font-semibold py-4 border-b-[1px] border-gray-30 first:pl-1'
                    >
                      {
                        header.isPlaceholder
                          ?
                        null
                          : 
                        <div 
                          className={ cn('flex items-center gap-2', canSort && 'cursor-pointer', meta?.centerHeader && 'justify-center', meta?.headerClassName) }
                          onClick={ canSort ? header.column.getToggleSortingHandler() : undefined }
                        >
                          {
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          }
                          {canSort && {
                            asc: (
                              <Icon
                                icon='filter'
                                size='md'
                              />
                            ),
                            desc: (
                              <Icon
                                icon='filter'
                                size='md'
                                className='rotate-180'
                              />
                            ),
                            false: (
                              <Icon
                                icon='filter'
                                size='md'
                                className='invisible'
                              />
                            ),
                          }[String(isSorted)]}
                        </div>
                      }
                    </th>
                  )
                })
              }
            </tr>
          ))}
        </thead>

        <tbody>
          {
            table.getRowModel().rows.map(row => {
              return (
                <Fragment key={ row.id }>
                  <tr
                    key={ row.id }
                    className='border-b-[1px] border-gray-70 group transition-all'
                  >
                    {
                      row.getVisibleCells().map(cell => {
                        const meta = cell.column.columnDef.meta

                        return (
                          <td key={cell.id} className='text-gray-90 font-normal group-hover:bg-gray-20 first:pl-1 max-w-[10rem]'>
                            <div className={cn('flex items-center gap-2 truncate w-[95%]', meta?.centerCell && 'justify-center', meta?.cellClassName )}>
                              {
                                meta?.tooltip
                                  ?
                                (
                                  <Tooltip label={ `${cell.getValue()}` }>
                                    {
                                      cell.getValue()
                                        ?
                                      <Link
                                        href={`${cell.getValue()}`}
                                        className='text-blue-600 underline'
                                        target='_blank'
                                      >
                                        {`${cell.getValue()}`}
                                      </Link>
                                        :
                                      flexRender(cell.column.columnDef.cell, cell.getContext())
                                    }
                                  </Tooltip>
                                )
                                  :
                                flexRender(cell.column.columnDef.cell, cell.getContext())
                              }
                            </div>
                          </td>
                        )
                      })
                    }
                  </tr>

                  {
                    renderSubComponent
                      ?
                    row.getIsExpanded() && (
                      <tr>
                        <td colSpan={row.getVisibleCells().length}>
                          {renderSubComponent({ row })}
                        </td>
                      </tr>
                    )
                      :
                    null
                  }
                </Fragment>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean }
    & Omit<React.ComponentPropsWithoutRef<typeof CustomCheckbox>, 'ref'>)
{
  return (
    <CustomCheckbox
      name='multi-select-checkbox'
      className={ cn('cursor-pointer mr-2', className) }
      { ...rest }
    />
  )
}

export function getHeadersFromColumn<T>(columns: Array<ColumnDef<T, unknown>>): string[] {
  return ['', ...columns.map((col) => (typeof col.header === 'string' ? col.header : ''))]
}