"use client"

import type React from "react"

import { DollarSign, CreditCard, Hash, Clock, Info } from "lucide-react"
import { Chip } from "@heroui/react"
import { 
  formatDateTime, 
  formatCurrency, 
  getAssociatedPaymentStatusColor, 
  getAssociatedPaymentStatus 
} from "./utils"

interface PaymentAttemptDetailsProps {
  attempt: any
}

export const PaymentAttemptDetails: React.FC<PaymentAttemptDetailsProps> = ({ attempt }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" />
          <span className="text-default-500">Amount Before: </span>
          <span className="font-medium">{formatCurrency(attempt.amount_before)}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" />
          <span className="text-default-500">Amount After: </span>
          <span className="font-medium">{formatCurrency(attempt.amount_after)}</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-primary" />
          <span className="text-default-500">Payment Method: </span>
          <span className="font-medium">{attempt.payment_method}</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-primary" />
          <span className="text-default-500">Payment Processor: </span>
          <span className="font-medium">{attempt.payment_processor}</span>
        </div>
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-primary" />
          <span className="text-default-500">Transaction ID: </span>
          <span className="font-medium">{attempt.transaction_id}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-default-500">Processed At: </span>
          <span className="font-medium">{formatDateTime(attempt.processed_at)}</span>
        </div>
        {attempt.created_at && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-default-500">Created At: </span>
            <span className="font-medium">{formatDateTime(attempt.created_at)}</span>
          </div>
        )}
        {attempt.returned_at && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-default-500">Returned At: </span>
            <span className="font-medium">{formatDateTime(attempt.returned_at)}</span>
          </div>
        )}
        {attempt.successful_at && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-default-500">Successful At: </span>
            <span className="font-medium">{formatDateTime(attempt.successful_at)}</span>
          </div>
        )}
        {attempt.identifier && (
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            <span className="text-default-500">Identifier: </span>
            <span className="font-medium">{attempt.identifier}</span>
          </div>
        )}
        {attempt.identifier_2 && (
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            <span className="text-default-500">Identifier 2: </span>
            <span className="font-medium">{attempt.identifier_2}</span>
          </div>
        )}
      </div>

      {/* Associated Payment Section */}
      <div className="mt-6">
        <h5 className="text-md font-semibold mb-3">Associated Payment</h5>
        {attempt.associated_payment ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-default-50 p-4 rounded-lg">
            {Object.entries(attempt.associated_payment).map(([key, value]: [string, any]) => {
              const formattedKey = key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
              if (key === "return_code") return null

              let displayValue: React.ReactNode = value === null || value === "" ? "N/A" : value

              if (key.includes("date") || key.includes("_at")) {
                displayValue = formatDateTime(value)
              } else if (key === "status") {
                displayValue = value ? (
                  <Chip className={getAssociatedPaymentStatusColor(value)} variant="flat" size="sm">
                    <span className="font-medium text-[11px]">{getAssociatedPaymentStatus(value)}</span>
                  </Chip>
                ) : (
                  "N/A"
                )
              }

              return (
                <div key={key} className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="text-default-500">{formattedKey}: </span>
                  <span className="font-medium">{displayValue}</span>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-default-50 p-4 rounded-lg">
            <span className="text-default-500">No associated payment information available</span>
          </div>
        )}
      </div>

      {/* Return Code Section */}
      {attempt.associated_payment && attempt.associated_payment.return_code && (
        <div className="mt-6">
          <h5 className="text-md font-semibold mb-3">Return Code</h5>
          <div className="bg-default-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                <span className="text-default-500">Code: </span>
                <span className="font-medium">{attempt.associated_payment.return_code.code}</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                <span className="text-default-500">Title: </span>
                <span className="font-medium">{attempt.associated_payment.return_code.title_en}</span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-primary mt-1" />
                <span className="text-default-500">Description: </span>
                <span className="font-medium">{attempt.associated_payment.return_code.description_en}</span>
              </div>
              {attempt.associated_payment.return_code.stop_step !== undefined && (
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="text-default-500">Stop Step: </span>
                  <span className="font-medium">{attempt.associated_payment.return_code.stop_step ? "Yes" : "No"}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}