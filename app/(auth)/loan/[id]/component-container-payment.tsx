"use client"

import type React from "react"
import { PaymentView } from "./elements/history/payment-view"
import { AlertCircle } from "lucide-react"

interface PaymentsViewProps {
  payments?: any[]
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({ payments = [] }) => {
  if (!payments || payments.length === 0) {
    return (
      <div className="text-center p-8 bg-default-50 rounded-lg mt-4">
        <AlertCircle className="w-12 h-12 text-default-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-default-600 mb-2">No Payments Found</h3>
        <p className="text-default-500">There are no payments to display for this loan.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto pt-4 pb-4">
      <PaymentView paymentData={payments} />
    </div>
  )
}