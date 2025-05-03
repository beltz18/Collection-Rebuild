'use client'

import AuthLayout from '../../layout'
import { DefaultLayout } from '@lay/default'
import { Wrapper } from './wrapper'

export default function LoanIdPage() {
  return (
    <AuthLayout>
      <DefaultLayout>
        <Wrapper />
      </DefaultLayout>
    </AuthLayout>
  )
}