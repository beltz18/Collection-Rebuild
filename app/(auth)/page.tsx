'use client'

import { DefaultLayout } from '@lay/default'
import AuthLayout from './layout'
import { useTokenStore } from '@sts/useTokenStore'
import HomePage from '@sec/home'

export default function App() {
  const { clear } = useTokenStore()

  const borrarToken = () => {
    clear()
    alert("Token borrado")
  }

  return (
    <AuthLayout>
      <DefaultLayout>
        <HomePage />
      </DefaultLayout>
    </AuthLayout>
  )
}