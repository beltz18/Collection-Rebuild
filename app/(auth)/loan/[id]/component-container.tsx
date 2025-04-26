import { CustomAccordion } from '@com/accordion/accordion'
import { Icon } from '@com/icon'
import { Tabs } from '@com/tabs/tabs'

interface LoanComponentProps {
  about: {
    title: string
    description: string
    learnMoreLink: string
  }
  services: {
    title: string
    items: string[]
  }
  statistics: {
    title: string
    stats: Array<{ value: string; label: string }>
  }
  loanDetails: {
    loan_request_id: number
    loan_details_url: string
    customer_details_url: string
    payment_frequency: {
      description: string
    }
    request_date: string
    requested_amount: string
    approved_amount: string
    term: number
    base_rate: string
    insurance_rate: string
    tax_rate: string
    person: {
      first_name: string
      last_name: string
      email: string
    }
    loan_destination: {
      description: string
    }
    status: {
      description: string
    }
    currency: {
      code: string
    }
    customerNetIncome?: string
  }
}

export const LoanComponent = ({ loanDetails }: LoanComponentProps) => {
  return (
    <div className='w-full px-2 space-y-2'>
      <h1 className='text-theme-text-default font-bold text-lg pt-2'>Loan Info</h1>
      <div className='bg-theme-background w-full rounded-lg space-y-4 shadow-lg'>
        <div className='flex flex-row flex-wrap justify-between px-4 py-3 border-b border-b-neutral-400 '>
          <p>
            {'ID: '}
            <a className='text-blue-500 underline'>{`#${loanDetails.loan_request_id}`}</a>
          </p>
          <p>
            {'Status: '}
            <span className='text-blue-500'>{loanDetails.status.description}</span>
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pt-1 pb-4 border-b border-b-neutral-400'>
          <div className='space-y-2'>
            <p className='font-bold'>Customer:</p>
            <p>{`${loanDetails.person.first_name} ${loanDetails.person.last_name}`}</p>
          </div>
          <div className='space-y-2'>
            <p className='font-bold'>Request Date:</p>
            <p>{loanDetails.request_date}</p>
          </div>
          <div className='space-y-2'>
            <p className='font-bold'>Requested Amount:</p>
            <p>{`$${loanDetails.requested_amount} ${loanDetails.currency.code}`}</p>
          </div>
          <div className='space-y-2'>
            <p className='font-bold'>Approved Amount:</p>
            <p>{`$${loanDetails.approved_amount} ${loanDetails.currency.code}`}</p>
          </div>
          <div className='space-y-2'>
            <p className='font-bold'>Term:</p>
            <p>{loanDetails.term} months</p>
          </div>
          <div className='space-y-2'>
            <p className='font-bold'>Loan Destination:</p>
            <p>{loanDetails.loan_destination.description}</p>
          </div>
        </div>
        <div className='flex flex-row flex-wrap justify-between px-2 shadow-lg'>
          <CustomAccordion>
            <CustomAccordion.Item className='text-theme-text-default font-bold' title='Additional Information'>
              <div className='text-theme-text-default font-normal grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <p className='font-bold'>Base Rate:</p>
                  <p>{`${loanDetails.base_rate}%`}</p>
                </div>
                <div className='space-y-2'>
                  <p className='font-bold'>Insurance Rate:</p>
                  <p>{`${loanDetails.insurance_rate}%`}</p>
                </div>
                <div className='space-y-2'>
                  <p className='font-bold'>Tax Rate:</p>
                  <p>{`${loanDetails.tax_rate}%`}</p>
                </div>
                <div className='space-y-2'>
                  <p className='font-bold'>Payment Frequency:</p>
                  <p>{loanDetails.payment_frequency.description}</p>
                </div>
                <div className='space-y-2'>
                  <p className='font-bold'>Customer Email:</p>
                  <p className='break-words'>{loanDetails.person.email}</p>
                </div>
                {loanDetails.customerNetIncome && (
                  <div className='space-y-2'>
                    <p className='font-bold'>Customer Net Income:</p>
                    <p>{loanDetails.customerNetIncome}</p>
                  </div>
                )}
                <div className='space-y-2'>
                  <p className='font-bold'>Customer:</p>
                  <p>{`${loanDetails.person.first_name} ${loanDetails.person.last_name}`}</p>
                </div>
                <div className='space-y-2'>
                  <p className='font-bold'>Customer Net Income:</p>
                  <p>{`$USD NAN`}</p>
                </div>
              </div>
            </CustomAccordion.Item>
          </CustomAccordion>
        </div>
      </div>
    </div>
  )
}
