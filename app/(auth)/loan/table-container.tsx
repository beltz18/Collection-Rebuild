import {
  useState,
  Key,
} from 'react'
import {
  Button,
  Selection,
} from '@heroui/react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react'
import { 
  Loan, 
  Column,
} from '@typ/home-tables'
import Link from 'next/link'
import { Chip } from '@com/chip'
import { CustomTable } from '@com/index'
import { VerticalDotsIcon } from '@uti/consts'
import { getStatusColor } from '@typ/loans-status'
import { SYSTEM_ROUTES } from '@api/cache'
import { format } from 'date-fns'
import { loanRequestStatus } from '@typ/loans-status'

type Props = {
  data: Loan[]
  columns: Column[]
}

const renderUserCell = (loans: Loan, columnKey: Key) => {
  switch (columnKey) {
    case 'id':
      return (
        <Link
          href={ SYSTEM_ROUTES.goToALoan(loans.loan_request_id) }
          className='text-blue-600 underline'
        >
          { loans.loan_request_id }
        </Link>
      )

    case 'customer':
      return (
        <Link
          href={ loans.customer_details_url }
          className='capitalize text-blue-600 underline'
        >
          {`${loans.person.first_name} ${loans.person.last_name}`}
        </Link>
      )

    case 'approved_amount':
      return (
        <span>{`${loans.approved_amount} ${loans.currency.code}`}</span>
      )
    
    case 'request_date':
      return (
        <span className=''>
          { loans.request_date ? format(loans.request_date, 'dd-MM-yyyy') : 'No date' }
        </span>
      )

    case 'term':
      return <span className='capitalize'>{ loans.term }</span>

    case 'status':
      return (
        <Chip className={ getStatusColor(loans.status.unique_description) }>
          { loanRequestStatus[loans.status.unique_description] }
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
            <DropdownItem
              key='view'
              as={ Link }
              href={ SYSTEM_ROUTES.goToALoan(loans.loan_request_id) }
            >
              View loan
            </DropdownItem>

            <DropdownItem
              key='edit'
              as={ Link }
              href={ SYSTEM_ROUTES.goToAPayment(loans.loan_request_id) }
            >
              View payments
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )

    default:
      return (loans as any)[columnKey as string]
  }
}

export const TableContainer = ({
  data,
  columns,
}: Props) => {
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const visibleColumns = ['id', 'customer', 'approved_amount', 'request_date', 'term', 'status', 'actions']

  // console.log(data, columns)

  // const selectedUserIds = useMemo(() => {
  //   return Array.from(selectedKeys).map(key => Number(key))
  // }, [selectedKeys])

  // useEffect(() => {
  //   const selected = data.filter(el => selectedUserIds.includes(el.loan_request_id))
  //   console.log(selected)
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