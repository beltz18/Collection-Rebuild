"use client"

import { CustomAccordion } from "@com/accordion/accordion"
import { Card } from "@heroui/card"
import { Chip } from "@heroui/chip"
import { 
  getStatusColor, 
  loanRequestStatus, 
  type LoanRequestStatus 
} from "@typ/loans-status"
import {
  Calendar,
  DollarSign,
  Clock,
  Target,
  User,
  Mail,
  Percent,
  Shield,
  Receipt,
  CreditCard,
  FileText,
  Building,
} from "lucide-react"

export interface LoanComponentProps {
  about: {
    title: string
    description: string
    learnMoreLink: string
  }
  services: {
    title: string
    items: string[]
  }
  statistics: {
    title: string
    stats: Array<{ value: string; label: string }>
  }
  loanDetails: {
    loan_request_id: number
    loan_details_url: string
    customer_details_url: string
    payment_frequency: {
      description: string
      unique_description: string
    }
    request_date: string
    requested_amount: string
    approved_amount: string
    term: number
    base_rate: string
    insurance_rate: string
    tax_rate: string
    person: {
      first_name: string
      last_name: string
      email: string
    }
    loan_destination: {
      description: string
      unique_description: string
    }
    status: {
      description: string
      unique_description: string
    }
    currency: {
      code: string
    }
    customerNetIncome?: string
  },
  loandId: string | undefined
}

export const LoanComponent = ({ loanDetails, loandId }: LoanComponentProps) => {
  console.log(loandId);
  
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return dateString
    }
  }

  function capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const paymentStatusKey = (loanDetails.status.unique_description as LoanRequestStatus) || "PENDING"

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-default-800">Loan Information</h1>
        <Chip className={`mt-1 ${getStatusColor(paymentStatusKey)}`}>
          <span className="font-bold text-[11px]">
            {loanRequestStatus[paymentStatusKey] || loanDetails.status.unique_description}
          </span>
        </Chip>
      </div>

      <Card className="w-full overflow-hidden">
        <div className="flex justify-between items-center border-b border-default-200 p-6">
          <div className="flex items-center gap-2">
            <FileText className="text-primary h-5 w-5" />
            <h2 className="text-xl font-semibold text-default-800">Loan #{loanDetails.loan_request_id}</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-default-500">Customer</p>
                <p className="text-lg text-default-700 font-semibold">
                  {`${loanDetails.person.first_name} ${loanDetails.person.last_name}`}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-default-500">Request Date</p>
                <p className="text-lg text-default-700 font-semibold">{formatDate(loanDetails.request_date)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-default-500">Requested Amount</p>
                <p className="text-lg text-default-700 font-semibold">
                  ${loanDetails.requested_amount} {loanDetails.currency.code}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <CreditCard className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-default-500">Approved Amount</p>
                <p className="text-lg text-default-700 font-semibold">
                  ${loanDetails.approved_amount} {loanDetails.currency.code}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-info/10 rounded-lg">
                <Clock className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-default-500">Term</p>
                <p className="text-lg text-default-700 font-semibold">{loanDetails.term} months</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-danger/10 rounded-lg">
                <Target className="w-5 h-5 text-danger" />
              </div>
              <div>
                <p className="text-sm text-default-500">Loan Destination</p>
                <p className="text-lg text-default-700 font-semibold">{capitalizeFirstLetter(loanDetails.loan_destination.unique_description)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-default-200">
          <CustomAccordion>
            <CustomAccordion.Item className="text-xl font-semibold text-default-800 p-4" title="Additional Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-default-100 rounded-lg">
                    <Percent className="w-5 h-5 text-default-600" />
                  </div>
                  <div>
                    <p className="text-sm text-default-500">Base Rate</p>
                    <p className="text-base text-default-700 font-medium">{loanDetails.base_rate}%</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-default-100 rounded-lg">
                    <Shield className="w-5 h-5 text-default-600" />
                  </div>
                  <div>
                    <p className="text-sm text-default-500">Insurance Rate</p>
                    <p className="text-base text-default-700 font-medium">{loanDetails.insurance_rate}%</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-default-100 rounded-lg">
                    <Receipt className="w-5 h-5 text-default-600" />
                  </div>
                  <div>
                    <p className="text-sm text-default-500">Tax Rate</p>
                    <p className="text-base text-default-700 font-medium">{loanDetails.tax_rate}%</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-default-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-default-600" />
                  </div>
                  <div>
                    <p className="text-sm text-default-500">Payment Frequency</p>
                    <p className="text-base text-default-700 font-medium">
                      {capitalizeFirstLetter(loanDetails.payment_frequency.unique_description)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-default-100 rounded-lg">
                    <Mail className="w-5 h-5 text-default-600" />
                  </div>
                  <div>
                    <p className="text-sm text-default-500">Customer Email</p>
                    <p className="text-base text-default-700 font-medium break-words">{loanDetails.person.email}</p>
                  </div>
                </div>

                {loanDetails.customerNetIncome && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-default-100 rounded-lg">
                      <Building className="w-5 h-5 text-default-600" />
                    </div>
                    <div>
                      <p className="text-sm text-default-500">Customer Net Income</p>
                      <p className="text-base text-default-700 font-medium">{loanDetails.customerNetIncome}</p>
                    </div>
                  </div>
                )}
              </div>
            </CustomAccordion.Item>
          </CustomAccordion>
        </div>
      </Card>
    </div>
  )
}