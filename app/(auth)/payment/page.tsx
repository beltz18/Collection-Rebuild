import AuthLayout from '../layout'
import { TableQueryContainer } from './query-container'
import { DefaultLayout } from '@lay/default'
import { Wrapper } from './wrapper'
import { PAGES } from '@uti/var'

export const metadata = {
  title: PAGES.payment,
}

export default function PaymentTable() {
  return (
    <AuthLayout>
      <Wrapper>
        <DefaultLayout>
          <div className='p-4'>
            <TableQueryContainer />
          </div>
        </DefaultLayout>
      </Wrapper>
    </AuthLayout>
  )
}