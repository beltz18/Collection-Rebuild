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
  PaymentEx,
  ColumnEx
} from '@typ/home-tables'
import { Status, getStatusColor } from '@typ/payment-status'

type Props = {
  data: PaymentEx[]
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

const renderUserCell = (payment: PaymentEx, columnKey: Key) => {
  switch (columnKey) {
    case 'id':
      return <span>{ payment.id }</span>

    case 'name':
      return <span>{ payment.personName}</span>
    
    case 'status':
      return <Chip className={getStatusColor(payment.status)}>{ payment.statusName }</Chip>

    case 'amount':
      return <span>{ payment.amount }</span>

    case 'capital':
      return <span>{ payment.capital }</span>

    case 'interest':
      return <span>{ payment.interestAmount }</span>

    case 'due_date':
      return <span className='capitalize'>{ payment.dueDate }</span>

    case 'pay_date':
      return <span className='capitalize'>{ payment.paymentDate || "Not paid yet" }</span>

    case 'loan_num':
      return <span>{ payment.loanRequestNumber }</span>

    case 'company':
      return <span>{ payment.companyName }</span>

    case 'pay_num':
      return <span>{ payment.numberPayment }</span>

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
      return (payment as any)[columnKey as string]
  }
}

export const TableContainer = ({
  data,
  columns,
}: Props) => {
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const visibleColumns = [
    'id', 'name', 'status', 
    'amount', 'capital', 'interest', 
    'due_date', 'pay_date', 'loan_num', 
    'company', 'pay_num', 'actions'
  ]

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
        onSearchChange={ setFilterValue }
        onClearSearch={() => setFilterValue('')}
        onSelectionChange={ setSelectedKeys }
      />
    </div>
  )
}