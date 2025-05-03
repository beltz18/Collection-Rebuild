'use client'

import { TableQueryContainer } from './query-container'
import AuthLayout from '../layout'
import { DefaultLayout } from '@lay/default'
import { Wrapper } from './wrapper'

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