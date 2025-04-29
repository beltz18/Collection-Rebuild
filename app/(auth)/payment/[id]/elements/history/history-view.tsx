"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { format } from "date-fns"
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Chip,
} from "@heroui/react"
import { Download, RotateCw } from "lucide-react"
import { useTheme } from "@ctx/themeContext"
import { PaymentMethodTabs } from "./methods.tabs"
import { PaymentAttemptsList } from "./attempts-list"
import { PAYMENT_METHODS } from "../constants"
import { getStatusColor, paymentStatus, type Status } from "@typ/payment-status"
import type { PaymentHistoryViewProps } from "./types"
import { useResponsive } from '@uti/useResponsive'

export const PaymentHistoryView: React.FC<PaymentHistoryViewProps> = ({ paymentData, token, id }) => {
  const { theme } = useTheme()
  const [selectedKey, setSelectedKey] = useState<string>("all")
  const [filteredAttempts, setFilteredAttempts] = useState<any[]>([])
  const [expandedItems, setExpandedItems] = useState<Record<string, string[]>>({})
  const [forceUpdate, setForceUpdate] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { isMobile } = useResponsive()

  const filterAttemptsByMethod = useCallback((attempts: any[], methodKey: string) => {
    if (methodKey === "all") return attempts

    const methodConfig = PAYMENT_METHODS[methodKey as keyof typeof PAYMENT_METHODS]
    if (!methodConfig) return attempts

    return attempts.filter((attempt) => methodConfig.methods.includes(attempt.payment_method))
  }, [])

  useEffect(() => {
    const newFilteredAttempts = filterAttemptsByMethod(paymentData.payment_history, selectedKey)
    setFilteredAttempts(newFilteredAttempts)
    setExpandedItems((prev) => ({ ...prev, [selectedKey]: [] }))
    setForceUpdate((prev) => prev + 1)
  }, [selectedKey, paymentData.payment_history, filterAttemptsByMethod])

  const getProcessedAttemptsCount = (attempts: any[]) => {
    return attempts.filter(
      (attempt) => attempt.success && attempt.associated_payment && attempt.associated_payment.status === "processed",
    ).length
  }

  return (
    <div className="space-y-6">
      <div className={`w-full flex ${isMobile ? 'flex-col items-start gap-2' : 'flex-row justify-end items-center gap-4'}`}>
        <Button
          color="primary"
          startContent={<RotateCw className={`mr-1 ${isRefreshing ? "animate-spin" : ""}`} size={15} />}
          disabled={isRefreshing}
        >
          Refresh
        </Button>
        <Dropdown>
          <DropdownTrigger>
            <Button
              color="primary"
              className={`bg-theme-primary text-white
                ${theme === "light" ? "bg-[#161616e0] text-[#ededed]" : "bg-theme-primary"}
              `}
              startContent={<Download className="mr-1" size={15} />}
            >
              Generate Report
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Generate Report">
            <DropdownItem key="pdf" onClick={() => console.log("pdf")}>
              PDF
            </DropdownItem>
            <DropdownItem key="csv" onClick={() => console.log("csv")}>
              CSV
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <Card key={paymentData.loan_payment_id} className="w-full">
        <CardHeader className="flex justify-between items-center bg-default-50">
          <h3 className="text-xl text-default-800 font-bold">Payment #{paymentData.number_payment}</h3>
          <div className="flex items-center gap-4">
            <Chip className={getStatusColor(paymentData.payment_status.unique_description as Status)}>
              <span className="font-semibold text-[11px]">
                {paymentStatus[paymentData.payment_status.unique_description as Status]}
              </span>
            </Chip>
            <Chip color="primary" variant="flat">
              <span className="font-semibold text-[11px]">
                Processed Payments: {getProcessedAttemptsCount(paymentData.payment_history)}
              </span>
            </Chip>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <h4 className="text-lg text-default-800 font-semibold mb-3">Payment Attempts</h4>

          <PaymentMethodTabs selectedKey={selectedKey} onSelectionChange={setSelectedKey} />

          <PaymentAttemptsList
            filteredAttempts={filteredAttempts}
            selectedKey={selectedKey}
            forceUpdate={forceUpdate}
            expandedItems={expandedItems}
            setExpandedItems={setExpandedItems}
            theme={theme}
          />
        </CardBody>
      </Card>
    </div>
  )
}