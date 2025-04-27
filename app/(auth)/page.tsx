'use client'

import { DefaultLayout } from '@lay/default'
import AuthLayout from './layout'
import { useTokenStore } from '@sts/useTokenStore'
import LoansTable from './query-loan-container'
import PaymentsTable from './query-payment-container'

export default function App() {
  const { logout } = useTokenStore()

  const borrarToken = () => {
    logout()
    alert("Token borrado")
  }

  return (
    <AuthLayout>
      <DefaultLayout>
        <div className='flex flex-col gap-5 w-full'>
          <LoansTable />
          <PaymentsTable />
        </div>
      </DefaultLayout>
    </AuthLayout>
  )
}