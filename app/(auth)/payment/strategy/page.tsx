import AuthLayout from '../../layout'
import { DefaultLayout } from '@lay/default'
import { Wrapper } from './wrapper'
import { PAGES } from '@uti/var'

export const metadata = {
  title: PAGES.strategy,
}

export default function PaymentStrategiesTable() {
  return (
    <AuthLayout>
      <DefaultLayout>
        <Wrapper />
      </DefaultLayout>
    </AuthLayout>
  )
}