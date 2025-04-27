'use client'

import {
  useEffect,
  useState,
} from 'react'
import AuthLayout from '../layout'
import { DefaultLayout } from '@lay/default'

export default function Log () {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <AuthLayout>
      <DefaultLayout>
        <div className='p-4'>
          <h1>Hello</h1>
        </div>
      </DefaultLayout>
    </AuthLayout>
  )
}