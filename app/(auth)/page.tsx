'use client'

import { DefaultLayout } from '@lay/default'
import AuthLayout from './layout'
import LoansTable from './query-loan-container'
import PaymentsTable from './query-payment-container'

export default function App() {
  return (
    <AuthLayout>
      <DefaultLayout>
        <div className='flex flex-col gap-5 w-full p-4'>
          <LoansTable />
          <PaymentsTable />
        </div>
      </DefaultLayout>
    </AuthLayout>
  )
}