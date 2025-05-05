import AuthLayout from '../../layout'
import { DefaultLayout } from '@lay/default'
import { Wrapper } from './wrapper'
import { PAGES } from '@uti/var'

export const metadata = {
  title: PAGES.loan,
}

export default function LoanIdPage() {
  return (
    <AuthLayout>
      <DefaultLayout>
        <Wrapper />
      </DefaultLayout>
    </AuthLayout>
  )
}