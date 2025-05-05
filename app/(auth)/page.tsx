import { DefaultLayout } from '@lay/default'
import AuthLayout from './layout'
import LoansTable from './query-loan-container'
import PaymentsTable from './query-payment-container'
import { Wrapper } from './wrapper'
import { PAGES } from '@uti/var'

export const metadata = {
  title: PAGES.home,
}

export default function App() {
  return (
    <AuthLayout>
      <Wrapper>
        <DefaultLayout>
          <div className='flex flex-col gap-5 w-full p-4'>
            <LoansTable />
            <PaymentsTable />
          </div>
        </DefaultLayout>
      </Wrapper>
    </AuthLayout>
  )
}