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
  Payment,
  Column,
} from '@typ/home-tables'
import {
  getStatusColor,
  paymentStatus,
} from '@typ/payment-status'
import Link from 'next/link'
import { CustomTable } from '@com/index'
import { VerticalDotsIcon } from '@uti/consts'
import { SYSTEM_ROUTES } from '@api/cache'
import { format } from 'date-fns'
import { cn } from '@uti/cn'
import { useMenuStorePayment } from '@sts/useMenuStore'
import { useLoanPayment } from '@sts/useLoanPaymentStore'

type Props = {
  data: Payment[]
  columns: Column[]
}

const renderUserCell = (
  payment: Payment, 
  columnKey: Key,
  setPayment: (payment: Payment) => void
) => {
  switch (columnKey) {
    case 'id':
      return (
        <Link
          href={ SYSTEM_ROUTES.goToAPayment(payment.loan_payment_id) }
          className='text-blue-600 underline'
          onClick={() => setPayment(payment)}
        >
          { payment.loan_payment_id }
        </Link>
      )

    case 'name':
      return (
        <Link
          href={ payment.customer_details_url }
          className='capitalize text-blue-600 underline w-full h-full overflow-hidden text-ellipsis whitespace-nowrap'
        >
          {`${payment.person.first_name} ${payment.person.last_name}`}
        </Link>
      )
    
    case 'status':
      return (
        <div className='max-w-[250px]'>
          <Chip
            className={
              cn(
                'w-full h-full overflow-hidden text-ellipsis whitespace-nowrap',
                getStatusColor(payment.payment_status.unique_description)
              )
            }
          >
            { paymentStatus[payment.payment_status.unique_description] }
          </Chip>
        </div>
      )

    case 'amount':
      return (
        <span className='text-theme-text-default'>
          { payment.amount }
        </span>
      )

    case 'interest':
      return (
        <span className='text-theme-text-default'>
          { payment.interest_amount }%
        </span>
      )

    case 'due_date':
      return (
        <span className='text-theme-text-default w-full h-full overflow-hidden text-ellipsis whitespace-nowrap'>
          { format(payment.due_date, 'PP') }
        </span>
      )

    case 'pay_date':
      return (
        <span className='text-theme-text-default'>
          {
            payment.real_payment_date
              ?
            format(payment.real_payment_date, 'PP')
              :
            'Not paid yet'
          }
        </span>
      )

    case 'company':
      return (
        <span className='text-theme-text-default'>
          { payment.company_name ?? 'No company' }
        </span>
      )

    case 'pay_num':
      return (
        <span className='text-theme-text-default'>
          { payment.number_payment }
        </span>
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
            <DropdownItem
              key='view'
              as={ Link }
              href={ SYSTEM_ROUTES.goToAPayment(payment.loan_payment_id) }
              onClick={() => setPayment(payment)}
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
  const { setSelectedCells } = useMenuStorePayment()
  const { setPaymentData } = useLoanPayment()

  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const visibleColumns = [
    'id',
    'name',
    'status',
    'amount',
    'interest',
    'due_date',
    'pay_date',
    'company',
    'pay_num',
    'actions',
  ]

  const selectedElements = useMemo(() => {
    return Array.from(selectedKeys).map(key => Number(key))
  }, [selectedKeys])
  
  const handleSelectionChange = (keys: Selection) =>
    setSelectedKeys(keys)

  useEffect(() => {
    const selected = data.filter(el => selectedElements.includes(el.id))
    setSelectedCells(selected)

    if (selectedKeys == 'all')
      setSelectedCells(data)
  }, [selectedElements])

  return (
    <div className='w-full'>
      <CustomTable
        columns={ columns }
        data={ data }
        filterValue={ filterValue }
        visibleColumns={ visibleColumns }
        selectedKeys={ selectedKeys }
        renderCell={( item: Payment, columnKey: Key ) => renderUserCell(item, columnKey, setPaymentData)}
        onSearchChange={ setFilterValue }
        onClearSearch={() => setFilterValue('')}
        onSelectionChange={ handleSelectionChange }
      />
    </div>
  )
}