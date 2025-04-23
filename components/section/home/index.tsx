'use client'

import App from './loans-table/page'
import PaymentTable from './payments-table/page'

export default function HomePage() {return (
    <div className='flex flex-col gap-5 w-full'>
      <App />
      <PaymentTable />
    </div>
  )
}