import { Icon } from '@com/icon'

interface PaymentComponentProps {
  loan_payment_id: number
  loan_request_id: number
  loan_request_number: string
  person: {
    first_name: string
    last_name: string
    email: string
  }
  company_name: string
  amount: string
  capital: string
  interest_amount: string
  arrears_amount: string
  other_debts: string
  balance_date: string | null
  remaining_amount: string
  due_date: string
  real_payment_date: string
  payment_status: {
    description: string
  }
  number_payment: number
  loan_details_url: string
  customer_details_url: string
}

export const PaymentComponent = (paymentDetails: PaymentComponentProps) => {
  return (
    <div className='w-full px-2 space-y-4'>
      <h1 className='text-theme-text-default font-bold text-lg pt-2'>Payment Information</h1>
      <div className='bg-theme-background w-full rounded-lg space-y-4 p-2 shadow-lg'>
        <h2 className='text-theme-text-default font-bold text-lg'>Current Payment Information</h2>
        <div className='text-theme-text-default font-normal grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-x-3 flex flex-row items-center'>
            <Icon icon='dollarSign' size='md'/>
            <div className='flex flex-col'>
              <p>Amount</p>
              <p className='font-bold'>{`$${paymentDetails.amount} USD`}</p>
            </div>
          </div>
          <div className='space-x-3 flex flex-row items-center'>
            <Icon icon='creditCard' size='md'/>
            <div className='flex flex-col'>
              <p>Capital</p>
              <p className='font-bold'>{`$${paymentDetails.capital} USD`}</p>
            </div>
          </div>
          <div className='space-x-3 flex flex-row items-center'>
            <Icon icon='refreshCcw' size='md'/>
            <div className='flex flex-col'>
              <p>Interest</p>
              <p className='font-bold'>{`$${paymentDetails.interest_amount} USD`}</p>
            </div>
          </div>
          <div className='space-x-3 flex flex-row items-center'>
            <Icon icon='calendar' size='md'/>
            <div className='flex flex-col'>
              <p>Due Date</p>
              <p className='font-bold'>{paymentDetails.due_date}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-row flex-wrap justify-between'>
          <div className='space-y-2'>
            <p>Payment status</p>
            <p className='font-bold'>{paymentDetails.payment_status.description}</p>
          </div>
          <div className='space-y-2 flex flex-col items-start sm:items-end'>
            <p>Remaining Amount</p>
            <p className='font-bold'>{`$${paymentDetails.remaining_amount} USD`}</p>
          </div>
        </div>
      </div>
      <div className='bg-theme-background w-full rounded-lg space-y-4 p-2 shadow-lg'>
        <h2 className='text-theme-text-default font-bold text-lg'>Payment Details</h2>
        <div className='text-theme-text-default font-normal grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <p className='font-bold'>Loan Number</p>
            <p >{paymentDetails.loan_request_number}</p>
          </div>
          <div className='space-y-2'>
            <p className='font-bold'>Customer Name</p>
            <p >{`${paymentDetails.person.first_name} ${paymentDetails.person.last_name}`}</p>
          </div>
          <div className='space-y-2'>
            <p className='font-bold'>Customer Email</p>
            <p className='break-words'>{paymentDetails.person.email}</p>
          </div>
          <div className='space-y-2'>
            <p className='font-bold'>Company Name</p>
            <p>{paymentDetails.company_name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
