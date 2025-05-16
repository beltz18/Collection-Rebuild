"use client"

import React from "react"
import { Button, Accordion, AccordionItem, Chip, Divider } from "@heroui/react"
import { DollarSign, Calendar, User, Building, CreditCard, Clock } from "lucide-react"
import { getStatusColor, paymentStatus, type Status } from "@typ/payment-status"
import { formatCurrency, formatDate } from "../../format"

type Props = { payments: any[] }

export const PaymentList = ({ payments }: Props) => {
  const [expandedKeys, setExpandedKeys] = React.useState<string[]>([])

  return (

    <Accordion
      className="w-full"
      selectedKeys={expandedKeys}
      onSelectionChange={(keys) => setExpandedKeys(Array.from(keys) as string[])}
    >
      {payments.map((payment: any) => (
        <AccordionItem
          key={`payment-${payment.loan_payment_id}`}
          aria-label={`Payment #${payment.number_payment}`}
          classNames={{
            base: "rounded-lg overflow-hidden",
            heading: "py-3",
            trigger: "py-0",
            content: "p-4 pt-0",
          }}
          title={
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <h3 className="text-md text-default-800 font-medium">Payment #{payment.number_payment}</h3>
                <Chip className={getStatusColor(payment.payment_status.unique_description as Status)}>
                  <span className="font-semibold text-[11px]">
                    {paymentStatus[payment?.payment_status?.unique_description as Status]}
                  </span>
                </Chip>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm text-default-600">Due: {formatDate(payment.due_date)}</span>
                  <span className="font-semibold">{formatCurrency(payment.amount)}</span>
                </div>
              </div>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-4">
              <h4 className="text-lg text-default-800 font-semibold mb-3">Payment Details</h4>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-default-500">Total Amount: </span>
                  <span className="font-medium">{formatCurrency(payment.amount)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-default-500">Capital: </span>
                  <span className="font-medium">{formatCurrency(payment.capital)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-default-500">Interest: </span>
                  <span className="font-medium">{formatCurrency(payment.interest_amount)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-default-500">Arrears: </span>
                  <span className="font-medium">{formatCurrency(payment.arrears_amount)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-default-500">Other Debts: </span>
                  <span className="font-medium">{formatCurrency(payment.other_debts)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-default-500">Remaining Amount: </span>
                  <span className="font-medium">{formatCurrency(payment.remaining_amount)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg text-default-800 font-semibold mb-3">Additional Information</h4>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-default-500">Due Date: </span>
                  <span className="font-medium">{formatDate(payment.due_date)}</span>
                </div>
                {payment.real_payment_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-default-500">Payment Date: </span>
                    <span className="font-medium">{formatDate(payment.real_payment_date)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-default-500">Customer: </span>
                  <span className="font-medium">
                    {payment.person.first_name} {payment.person.last_name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-primary" />
                  <span className="text-default-500">Company: </span>
                  <span className="font-medium">{payment.company_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span className="text-default-500">Loan Number: </span>
                  <span className="font-medium">{payment.loan_request_number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-default-500">Created: </span>
                  <span className="font-medium">{formatDate(payment.create_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-default-500">Updated: </span>
                  <span className="font-medium">{formatDate(payment.update_date)}</span>
                </div>
              </div>
            </div>
          </div>

          {payment.payment_history && payment.payment_history.length > 0 && (
            <div className="mt-6">
              <Divider className="my-4" />
              <h4 className="text-lg text-default-800 font-semibold mb-3">Payment History</h4>
              <div className="bg-default-50 p-4 rounded-lg">
                <p className="text-default-600">This payment has {payment.payment_history.length} history records.</p>
                <Button
                  color="primary"
                  variant="flat"
                  className="mt-2"
                  onClick={() => console.log("View payment history")}
                >
                  View History
                </Button>
              </div>
            </div>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  )
}