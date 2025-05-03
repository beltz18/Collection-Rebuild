import AuthLayout from '../../layout'
import { DefaultLayout } from '@lay/default'
import { Wrapper } from './wrapper'

export default function PaymentTable() {
  return (
    <AuthLayout>
      <DefaultLayout>
        <Wrapper />
      </DefaultLayout>
    </AuthLayout>
  )
}
