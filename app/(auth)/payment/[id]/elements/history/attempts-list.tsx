"use client"

import type React from "react"
import { Accordion, AccordionItem, Chip } from "@heroui/react"
import { CheckCircle, XCircle, FileCheck, AlertCircle } from "lucide-react"
import { PaymentAttemptDetails } from "./attempt-details"
import { getAssociatedPaymentStatusColor, getAssociatedPaymentStatus } from "./utils"
import { PAYMENT_METHODS } from "../constants"

interface PaymentAttemptsListProps {
  filteredAttempts: any[]
  selectedKey: string
  forceUpdate: number
  expandedItems: Record<string, string[]>
  setExpandedItems: (value: React.SetStateAction<Record<string, string[]>>) => void
  handleGenerateReceipt?: (attempt: any) => Promise<void>
  theme: string
}

export const PaymentAttemptsList: React.FC<PaymentAttemptsListProps> = ({
  filteredAttempts,
  selectedKey,
  forceUpdate,
  expandedItems,
  setExpandedItems,
  handleGenerateReceipt,
  theme,
}) => {
  if (filteredAttempts.length === 0) {
    return (
      <div className="text-center p-8 bg-default-50 rounded-lg">
        <AlertCircle className="w-12 h-12 text-default-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-default-600 mb-2">No Payment Attempts Found</h3>
        <p className="text-default-500">
          {selectedKey === "all"
            ? "There are no payment attempts to display."
            : `There are no payment attempts using ${PAYMENT_METHODS[selectedKey as keyof typeof PAYMENT_METHODS]?.label}.`}
        </p>
      </div>
    )
  }

  return (
    <Accordion
      key={`accordion-${selectedKey}-${forceUpdate}`}
      selectedKeys={expandedItems[selectedKey] || []}
      onSelectionChange={(keys) =>
        setExpandedItems((prev) => ({ ...prev, [selectedKey]: Array.from(keys) as string[] }))
      }
    >
      {filteredAttempts.map((attempt: any, index: number) => {
        const itemKey = `${attempt.transaction_id}-${index}-${selectedKey}`
        const isProcessed =
          attempt.success && attempt.associated_payment && attempt.associated_payment.status === "processed"

        return (
          <AccordionItem
            key={itemKey}
            aria-label={`Attempt ${attempt.attempt_number}`}
            title={
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  {attempt.success ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-danger" />
                  )}
                  <span className="font-medium">
                    Attempt {attempt.attempt_number} - {attempt.payment_method}
                  </span>
                  {attempt.associated_payment?.status === "processed" && isProcessed && (
                    <div className="text-[10px] pl-4 flex items-center justify-center">
                      <Chip
                        color="primary"
                        className={`bg-theme-primary text-white p-2 rounded-xl
                          ${theme === "light" ? "bg-[#161616e0] text-[#ededed]" : "bg-theme-primary"}
                        `}
                        startContent={<FileCheck className="w-4 h-4" />}
                        onClick={() => console.log(attempt)}
                      >
                        Receipt
                      </Chip>
                    </div>
                  )}
                </div>

                <div className="flex justify-center items-center gap-4">
                  <div className="text-[10px] w-[120px] flex">
                    Attempt:&nbsp;
                    <Chip
                      variant="flat"
                      size="sm"
                      className={`${attempt.success ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100"}`}
                    >
                      {attempt.success ? "Success" : "Failed"}
                    </Chip>
                  </div>

                  <div className="text-[10px] w-[120px] flex justify-between items-center">
                    Payment:
                    {attempt.associated_payment ? (
                      <Chip 
                        size="sm"
                        className={getAssociatedPaymentStatusColor(attempt.associated_payment.status)}
                      >
                        {getAssociatedPaymentStatus(attempt.associated_payment.status)}
                      </Chip>
                    ) : (
                      <Chip size="sm" className="text-red-800 bg-red-100">Failed</Chip>
                    )}
                  </div>
                </div>
              </div>
            }
          >
            <PaymentAttemptDetails attempt={attempt} />
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}