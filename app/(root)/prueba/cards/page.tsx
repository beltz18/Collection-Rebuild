'use client'

import { useState } from "react"
import { CardPayment } from "@com/card/payment"
import { LoanCard } from "@com/card/loan"
import { paymentMock, loanMock } from "./mock/mock-data"

export default function Cards() {
  const [_, setShowModal] = useState(false)

  const handleViewDetails = () => {
    setShowModal(true)
    console.log("View details clicked")
  }

  return (
    <>
      <div className="h-screen flex flex-row gap-20 justify-center items-center">
        <LoanCard 
          loanRequest={ loanMock } 
          onViewDetails={ handleViewDetails } 
        />

        <CardPayment 
          payment={ paymentMock } 
          onViewDetails={ handleViewDetails } 
        />
      </div>
    </>
  )
}