'use client'

import { TableContainer } from './table-container'
import { PaginationC } from '@com/index'
import {
  UserEx,
  ColumnEx,
} from '@typ/base'

type Props = {
  search?: string
}

const users: UserEx[] = [
  { id: 1, name: 'Alice', email: 'alice@mail.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Bob', email: 'bob@mail.com', role: 'editor', status: 'paused' },
  { id: 3, name: 'Charlie', email: 'charlie@mail.com', role: 'viewer', status: 'deleted' },
]

const columns: ColumnEx[] = [
  { uid: 'name',    name: 'Name' },
  { uid: 'email',   name: 'Email' },
  { uid: 'role',    name: 'Role' },
  { uid: 'status',  name: 'Status' },
  { uid: 'actions', name: 'Actions' },
]

export const TableQueryContainer = ({ search }: Props) => {
  return (
    <div className='w-full flex items-center flex-col gap-4'>
      <TableContainer
        data={ users }
        columns={ columns }
      />
      <PaginationC total={ 10 } />
    </div>
  )
}