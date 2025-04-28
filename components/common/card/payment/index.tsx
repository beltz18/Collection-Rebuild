"use client"

import { DollarSign, Calendar, User, Briefcase, Hash, MoreVertical, FileOutputIcon } from "lucide-react"
import { Button } from "@heroui/button"
import { Card } from "../card-payment"
import { format } from "date-fns"
import { type Status, paymentStatus, getStatusColor } from "@typ/payment-status"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react'
import type { Payment } from "@typ/home-tables"

interface CardPaymentProps {
  payment: Payment
  onViewDetails?: () => void
}

export function CardPayment({ payment, onViewDetails }: CardPaymentProps) {
  const amount     = Number.parseFloat(payment.amount).toFixed(2)
  const statusCode = payment.payment_status.unique_description as Status
  const statusName = paymentStatus[statusCode]
  const personName = `${payment.person.first_name} ${payment.person.last_name}`
  const dueDate    = payment.due_date ? format(new Date(payment.due_date), "PP") : "Not set"

  return (
    <Card className="w-full max-w-sm font-medium text-default-600 border border-[#00000018] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <Card.Header className="p-5 bg-currentColor font-medium text-default-600">
        <div>
          <h5 className="text-xl font-semibold text-default-700">Payment #{payment.loan_payment_id}</h5>
          <p className="text-md text-default-700">Loan #{payment.loan_request_id}</p>
        </div>
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size='sm' variant='light'>
                <MoreVertical className='text-default-700 w-5 h-5' />
              </Button>
            </DropdownTrigger>

            <DropdownMenu>
              <DropdownItem key='view'>
                <div className="flex flex-row gap-2 items-center text-gray-700">
                  <FileOutputIcon size={16} />
                  Export Data
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Card.Header>

      <Card.Body className="p-5 pt-0 bg-currentColor font-medium text-default-600 flex flex-col space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-500 mr-2" />
            <span className="text-3xl font-semibold text-default-700">{amount}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-md font-semibold ${getStatusColor(statusCode)}`}>
            {statusName}
          </span>
        </div>

        <div className="space-y-2">
          <p className="flex items-center text-md text-default-600 dark:text-default-500">
            <User className="w-4 h-4 mr-2" />
            {personName}
          </p>
          <p className="flex items-center text-md text-default-600 dark:text-default-500">
            <Briefcase className="w-4 h-4 mr-2" />
            {payment.company_name}
          </p>
          <p className="flex items-center text-md text-default-600 dark:text-default-500">
            <Calendar className="w-4 h-4 mr-2" />
            Due: {dueDate}
          </p>
          <p className="flex items-center text-md text-default-600 dark:text-default-500">
            <Hash className="w-4 h-4 mr-2" />
            Payment Number: {payment.number_payment}
          </p>
        </div>
      </Card.Body>

      <Card.Footer className="p-5 pt-0 bg-currentColor font-medium text-default-600">
        <div className="flex justify-between">
          <Button color="primary" onPress={onViewDetails}>
            View Details
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}