"use client"

import { TableQueryContainer } from "./query-container"
import { Card } from "@heroui/card"
import MenuPayment from "@sec/menufilters/menuPayment"
import AuthLayout from "../../layout"
import { DefaultLayout } from "@lay/default"
import { useSidebarStore } from "@sts/useSidebarStore"
import { useEffect, useState } from "react"

export default function PaymentStrategiesTable() {
  const [mounted, setMounted] = useState(false)
  const { setActiveTab, setActiveChildrenTab, setActiveChildrenIndex } = useSidebarStore()

  useEffect(() => {
    setMounted(true)
    setActiveTab("Payments")
    setActiveChildrenTab("Payment Strategies")
    setActiveChildrenIndex(2)
  }, [])

  if (!mounted) return null

  return (
    <AuthLayout>
      <DefaultLayout>
        <div className='p-4'>
          <Card className='flex flex-col gap-4 p-4'>
            <div className='text-default-600 flex justify-between items-center text-lg'>
              <MenuPayment title='Payment Strategies' />
            </div>
            <TableQueryContainer />
          </Card>
        </div>
      </DefaultLayout>
    </AuthLayout>
  )
}