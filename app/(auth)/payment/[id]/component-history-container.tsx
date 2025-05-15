"use client"

import { PaymentHistoryView } from "./elements"
import { Heading } from "@com/heading"
import { useEffect, useState } from "react"
import { PaymentComponentProps } from "./component-container"
import { NoResults } from "@uti/home-utils"

type Props = { 
  paymentDetails: PaymentComponentProps | any
  id: number | undefined
}

export default function PaymentHistory({ paymentDetails }: Props) {
  const [paymentHistory, setPaymentHistory] = useState<any>(null)
  
  useEffect(() => {
    if (!paymentDetails || !paymentDetails.payment_history || paymentDetails.payment_history.length === 0) {
      setPaymentHistory(null)
    } else {
      setPaymentHistory(paymentDetails)
    }
  }, [paymentDetails])

  return (
    <div className="container mx-auto pt-4 pb-4">
      {
        paymentHistory ? (
          <>
            <Heading level={1} className="text-2xl font-bold mb-3">Payment Information</Heading>
            <PaymentHistoryView paymentData={paymentHistory} />
          </>
        ) : (
          <NoResults 
            title='Payment history'
            description='This payment has no history'
          />
        )
      }
    </div>
  )
}