'use client'

import { DefaultLayout } from '@lay/default'
import { TableQueryContainer } from './query-container'
import {
  useEffect,
  useState,
} from 'react'

export default function App() {
  // Checking if the component is mounted to avoid hydration issues
  const [mounted, setMounted] = useState(false)
  // useEffect to set mounted state to true after the component mounts
  useEffect(() => setMounted(true), [])
  // if the component is not mounted, return null to avoid rendering issues
  if (!mounted) return null

  return (
    <DefaultLayout>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Rerum doloremque amet delectus blanditiis vitae modi, qui
        ipsam nisi nam optio odio expedita odit nesciunt, iste
        possimus? Dolorem reprehenderit provident facilis.
      </p>
      <TableQueryContainer />
    </DefaultLayout>
  )
}