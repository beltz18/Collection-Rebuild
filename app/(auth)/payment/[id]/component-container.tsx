"use client"

import { DollarSign, Calendar, RefreshCw, CreditCard, Building, User, Mail, FileText } from "lucide-react"
import { Card } from "@com/card/card-payment"
import { getStatusColor, paymentStatus, type Status } from "@typ/payment-status"
import { Chip } from "@heroui/react"

export interface PaymentComponentProps {
  paymentDetails: {
    loan_payment_id: number
    loan_request_id: number
    loan_request_number: string
    person: {
      first_name: string
      last_name: string
      email: string
    }
    company_name: string
    amount: string
    capital: string
    interest_amount: string
    arrears_amount: string
    other_debts: string
    balance_date: string | null
    remaining_amount: string
    due_date: string
    real_payment_date: string
    payment_status: {
      description: string
      unique_description?: Status
    }
    number_payment: number
    loan_details_url: string
    customer_details_url: string
  },
  paymentId: string | undefined
}

export const PaymentComponent = ({ paymentDetails, paymentId }: PaymentComponentProps) => {
  console.log(paymentId)
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const paymentStatusKey = (paymentDetails.payment_status.unique_description as Status) || "PENDING"

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <Card.Header>
          <h2 className="text-xl text-default-800 font-semibold">Current Payment Information</h2>
        </Card.Header>

        <Card.Body className="grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-default-500">Amount</p>
              <p className="text-lg text-default-700 font-semibold">${paymentDetails.amount} USD</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-success/10 rounded-lg">
              <CreditCard className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-default-500">Capital</p>
              <p className="text-lg text-default-700 font-semibold">${paymentDetails.capital} USD</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <RefreshCw className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-default-500">Interest</p>
              <p className="text-lg text-default-700 font-semibold">${paymentDetails.interest_amount} USD</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Calendar className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-default-500">Due Date</p>
              <p className="text-lg text-default-700 font-semibold">{formatDate(paymentDetails.due_date)}</p>
            </div>
          </div>
        </Card.Body>

        <Card.Footer className="flex w-full justify-center items-center">
          <div className="w-full flex justify-between bg-default-50 rounded-lg p-4">
            <div>
              <p className="text-sm text-default-500">Payment Status</p>
              <Chip className={`mt-1 ${getStatusColor(paymentStatusKey)}`}>
                <span className="font-bold text-[11px]">
                  {paymentStatus[paymentStatusKey] || paymentDetails.payment_status.description}
                </span>
              </Chip>
            </div>
            <div className="text-right">
              <p className="text-sm text-default-500">Remaining Amount</p>
              <p className="text-lg text-default-700 font-semibold">${paymentDetails.remaining_amount} USD</p>
            </div>
          </div>
        </Card.Footer>
      </Card>

      <Card className="w-full">
        <Card.Header>
          <h2 className="text-xl text-default-800 font-semibold">Payment Details</h2>
        </Card.Header>

        <Card.Body className="grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 mb-2">
            <div className="p-2 bg-default-100 rounded-lg">
              <FileText className="w-5 h-5 text-default-600" />
            </div>
            <div>
              <p className="text-sm text-default-500">Loan Number</p>
              <p className="text-base text-default-700 font-medium">{paymentDetails.loan_request_number}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-2">
            <div className="p-2 bg-default-100 rounded-lg">
              <User className="w-5 h-5 text-default-600" />
            </div>
            <div>
              <p className="text-sm text-default-500">Customer Name</p>
              <p className="text-base text-default-700 font-medium">
                {paymentDetails.person.first_name} {paymentDetails.person.last_name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-2">
            <div className="p-2 bg-default-100 rounded-lg">
              <Mail className="w-5 h-5 text-default-600" />
            </div>
            <div>
              <p className="text-sm text-default-500">Customer Email</p>
              <p className="text-base text-default-700 font-medium break-words">{paymentDetails.person.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-2">
            <div className="p-2 bg-default-100 rounded-lg">
              <Building className="w-5 h-5 text-default-600" />
            </div>
            <div>
              <p className="text-sm text-default-500">Company Name</p>
              <p className="text-base text-default-700 font-medium">{paymentDetails.company_name}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}