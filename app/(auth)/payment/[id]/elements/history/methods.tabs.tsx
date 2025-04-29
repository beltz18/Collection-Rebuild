"use client"

import type React from "react"

import { Tabs, Tab } from "@heroui/react"
import { CreditCard } from "lucide-react"
import { PAYMENT_METHODS } from "../constants"
import { useResponsive } from '@uti/useResponsive'
import { ScrollShadow } from "@heroui/scroll-shadow"

interface PaymentMethodTabsProps {
  selectedKey: string
  onSelectionChange: (key: string) => void
}

export const PaymentMethodTabs: React.FC<PaymentMethodTabsProps> = ({ selectedKey, onSelectionChange }) => {
  const { isTablet } = useResponsive()
  
  const tabsContent = (
    <Tabs
      selectedKey={selectedKey}
      onSelectionChange={(key) => onSelectionChange(key as string)}
      aria-label="Payment Methods"
      className="mb-6"
      classNames={{
        tabList: `${!isTablet ? 'sticky top-2 overflow-y-auto' : 'max-w-screen overflow-x-auto'}`,
      }}
    >
      <Tab
        key="all"
        title={
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span>All Methods</span>
          </div>
        }
      />
      {Object.entries(PAYMENT_METHODS).map(([key, { label, icon: Icon }]) => (
        <Tab
          key={key}
          title={
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </div>
          }
        />
      ))}
    </Tabs>
  )

  if (isTablet) {
    return (
      <ScrollShadow className="w-full" hideScrollBar={true} size={100} orientation="horizontal">
        {tabsContent}
      </ScrollShadow>
    )
  }

  return tabsContent
}