import Link from 'next/link'
import { CustomTable } from '@com/index'
import { cn } from '@uti/cn'
import {
  useMemo,
  useState,
  useEffect,
  Key,
} from 'react'
import {
  Button,
  Chip,
  Selection,
} from '@heroui/react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react'
import {
  UserEx,
  ColumnEx,
} from '@typ/base'

type Props = {
  data: UserEx[]
  columns: ColumnEx[]
}

const VerticalDotsIcon = ({
  size = 24,
  width,
  height,
  className,
  ...props
}: {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <svg
      aria-hidden='true'
      fill='none'
      focusable='false'
      height={ size || height }
      role='presentation'
      viewBox='0 0 24 24'
      width={ size || width }
      className={ cn('', className) }
      { ...props }
    >
      <path
        d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
        fill='currentColor'
      />
    </svg>
  )
}

const renderUserCell = (user: UserEx, columnKey: Key) => {
  switch (columnKey) {
    case 'name':
      return <b>{ user.name }</b>

    case 'email':
      return <Link href={`mailto:${user.email}`}>{ user.email }</Link>
    
    case 'role':
      return <span className='capitalize'>{ user.role }</span>
    
    case 'status':
      return (
        <Chip
          color={
            user.status === 'active'
              ?
            'success'
              :
            user.status === 'paused'
                ?
              'warning'
                :
              'danger'
          }
          size='sm'
          variant='flat'
        >
          { user.status }
        </Chip>
      )

    case 'actions':
      return (
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size='sm' variant='light'>
              <VerticalDotsIcon className='text-default-300' />
            </Button>
          </DropdownTrigger>

          <DropdownMenu>
            <DropdownItem key='view'>View</DropdownItem>
            <DropdownItem key='edit'>Edit</DropdownItem>
            <DropdownItem key='delete'>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )

    default:
      return (user as any)[columnKey as string]
  }
}

export const TableContainer = ({
  data,
  columns,
}: Props) => {
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const visibleColumns = ['name', 'email', 'role', 'status', 'actions']

  const selectedUserIds = useMemo(() => {
    return Array.from(selectedKeys).map(key => Number(key))
  }, [selectedKeys])

  useEffect(() => {
    const selectedUsers = data.filter(el => selectedUserIds.includes(el.id))
    console.log(selectedUsers)
  }, [selectedUserIds])

  return (
    <div className='w-full'>
      <CustomTable
        columns={ columns }
        data={ data }
        filterValue={ filterValue }
        visibleColumns={ visibleColumns }
        selectedKeys={ selectedKeys }
        renderCell={ renderUserCell }
        topActions={ <Button color='primary'>Add User</Button> }
        onSearchChange={ setFilterValue }
        onClearSearch={() => setFilterValue('')}
        onSelectionChange={ setSelectedKeys }
      />
    </div>
  )
}