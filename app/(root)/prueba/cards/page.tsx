'use client'

import { useState } from "react"
import { CardPayment } from "@com/card/payment"
import { paymentMock } from "./mock/mock-data"

export default function Cards() {
  const [_, setShowModal] = useState(false)

  const handleViewDetails = () => {
    setShowModal(true)
    console.log("View details clicked")
  }

  return (
    <>
      <div>
        <CardPayment 
          payment={ paymentMock } 
          onViewDetails={ handleViewDetails } 
        />
      </div>
    </>
  )
}