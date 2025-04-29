'use client'

import {
  useEffect,
  useState,
} from 'react'
import AuthLayout from '../layout'
import { DefaultLayout } from '@lay/default'
import { useSidebarStore } from '@sts/useSidebarStore'

export default function Log () {
  const [mounted, setMounted] = useState(false)
  const { setActiveTab, clear } = useSidebarStore()

  useEffect(() => {
    clear()
    setActiveTab('Activity Logs')
    setMounted(true)
  }, [])
  
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