"use client"

import { PaymentHistoryView } from "./elements"
import { mockData } from "./mock/mock-data"
import { Heading } from "@com/heading"
import { useState } from "react"

export default function PaymentHistory() {
  const [token] = useState<string | null>("example-token")

  return (
    <div className="container mx-auto pt-4 pb-4">
      <Heading level={1} className="text-2xl font-bold mb-3">Payment Information</Heading>
      <PaymentHistoryView
        paymentData={mockData.paymentDetails}
        token={token}
        id={mockData.paymentDetails.loan_payment_id}
      />
    </div>
  )
}