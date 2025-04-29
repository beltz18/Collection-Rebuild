import Link from 'next/link'
import { CustomTable } from '@com/index'
import { VerticalDotsIcon } from '@uti/consts'
import { SYSTEM_ROUTES } from '@api/cache'
import { format } from 'date-fns'
import {
  useState,
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
  Payment,
  Column,
} from '@typ/home-tables'
import {
  getStatusColor,
  paymentStatus,
} from '@typ/payment-status'

type Props = {
  data: Payment[]
  columns: Column[]
}

const renderUserCell = (payment: Payment, columnKey: Key) => {
  switch (columnKey) {
    case 'id':
      return (
        <Link
          href={ SYSTEM_ROUTES.goToAPayment(payment.loan_payment_id) }
          className='text-blue-600 underline'
        >
          { payment.loan_payment_id }
        </Link>
      )

    case 'name':
      return (
        <Link
          href={ payment.customer_details_url }
          className='capitalize text-blue-600 underline'
        >
          {`${payment.person.first_name} ${payment.person.last_name}`}
        </Link>
      )
    
    case 'status':
      return (
        <Chip className={ getStatusColor(payment.payment_status.unique_description) }>
          { paymentStatus[payment.payment_status.unique_description] }
        </Chip>
      )

    case 'amount':
      return <span>
        { payment.amount }
      </span>

    case 'capital':
      return <span>
        { payment.capital }
      </span>

    case 'interest':
      return <span>
        { payment.interest_amount }
      </span>

    case 'due_date':
      return <span className='capitalize'>
        { format(payment.due_date, 'PP') ?? 'No Date' }
      </span>

    case 'pay_date':
      return <span className='capitalize'>
        { payment.real_payment_date || "Not paid yet" }
      </span>

    case 'company':
      return <span>
        { payment.company_name ?? 'No company' }
      </span>

    case 'pay_num':
      return <span>
        { payment.number_payment }
      </span>

    case 'actions':
      return (
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size='sm' variant='light'>
              <VerticalDotsIcon className='text-default-300' />
            </Button>
          </DropdownTrigger>

          <DropdownMenu>
            <DropdownItem
              key='view'
            >
              View payment
            </DropdownItem>
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
    'id',
    'name',
    'status',
    'amount',
    'capital',
    'interest',
    'due_date',
    'pay_date',
    'company',
    'pay_num',
    'actions',
  ]

  // const selectedUserIds = useMemo(() => {
  //   return Array.from(selectedKeys).map(key => Number(key))
  // }, [selectedKeys])

  // useEffect(() => {
  //   const selectedUsers = data.filter(el => selectedUserIds.includes(el.id))
  //   console.log(selectedUsers)
  // }, [selectedUserIds])

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