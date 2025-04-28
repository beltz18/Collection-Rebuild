"use client"

import Link from "next/link"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, LinkIcon } from "lucide-react"
import { Card } from "../card-loan"
import { Chip } from "@heroui/chip"
import { Accordion, AccordionItem } from "@heroui/accordion"
import { Divider } from "@com/divider"
import type { Loan } from "@typ/home-tables"

interface CardLoanProps {
  loanRequest: Loan
  onViewDetails?: () => void
}

export const LoanCard = ({ loanRequest }: CardLoanProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Card className="mx-4 mb-4 max-w-sm">
      <Card.Header>
        <h4 className="text-large font-bold">
          <span className="font-thin">ID:</span>&nbsp;
          <Link href='' className="text-blue-600 underline">
            #{loanRequest.loan_request_id}
          </Link>
        </h4>

        <Chip color="primary" variant="flat">
          <span className="text-gray">Status:</span>&nbsp;
          {loanRequest.status.description}
        </Chip>
      </Card.Header>

      <Card.Body>
        <span className="w-full pb-2 truncate flex gap-2 items-center">
          <b>URL:</b>
          <Link href={loanRequest.loan_details_url} target="_blank" className="text-blue-600 underline">
            <LinkIcon size={18} />
          </Link>
        </span>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-small text-default-500">Customer:</span>
            <Link
              href={loanRequest.customer_details_url}
              target="_blank"
              className="text-blue-600 underline text-medium"
              title={`${loanRequest.person.first_name} ${loanRequest.person.first_name}.`}
            >
              {`${loanRequest.person.first_name} ${loanRequest.person.last_name}.`}
            </Link>
          </div>

          <div className="flex flex-col">
            <span className="text-small text-default-500">Request Date: </span>
            <span className="text-medium truncate" title={loanRequest.request_date ? format(new Date(loanRequest.request_date), "PP") : "N/A"}>
              {loanRequest.request_date ? format(new Date(loanRequest.request_date), "PP") : "N/A"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-small text-default-500">Requested Amount:</span>
            <span
              className="text-medium truncate"
              title={`${loanRequest.currency.code} ${Number.parseFloat(String(loanRequest.requested_amount)).toFixed(2)}`}
            >
              {loanRequest.currency.code} {Number.parseFloat(String(loanRequest.requested_amount)).toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-small text-default-500">Approved Amount:</span>
            <span
              className="text-medium truncate"
              title={`${loanRequest.currency.code} ${Number.parseFloat(String(loanRequest.approved_amount)).toFixed(2)}`}
            >
              {loanRequest.currency.code} {Number.parseFloat(String(loanRequest.approved_amount)).toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-small text-default-500">Term:</span>
            <span className="text-medium truncate" title={`${loanRequest.term}`}>
              {loanRequest.term}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-small text-default-500">Loan Destination:</span>
            <span className="text-medium truncate" title={loanRequest.loan_destination.description}>
              {loanRequest.loan_destination.description}
            </span>
          </div>
        </div>

        <Divider className="my-4" />

        <Accordion>
          <AccordionItem
            key="1"
            aria-label="Additional Info"
            title="Additional Info"
            indicator={({ isOpen }) => (isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            onPress={() => setIsOpen(!isOpen)}
          >
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col">
                <span className="text-small text-default-500">Base Rate:</span>
                <span className="text-medium truncate" title={`${loanRequest.base_rate}%`}>
                  {loanRequest.base_rate}%
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-small text-default-500">Insurance Rate:</span>
                <span className="text-medium truncate" title={`${loanRequest.insurance_rate}%`}>
                  {loanRequest.insurance_rate}%
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-small text-default-500">Tax Rate:</span>
                <span className="text-medium truncate" title={`${loanRequest.tax_rate}%`}>
                  {loanRequest.tax_rate}%
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-small text-default-500">Customer:</span>
                <Link
                  href={loanRequest.customer_details_url}
                  target="_blank"
                  className="text-blue-600 underline text-medium"
                  title={`${loanRequest.person.first_name} ${loanRequest.person.last_name}`}
                >
                  {`${loanRequest.person.first_name} ${loanRequest.person.last_name}`}
                </Link>
              </div>

              <div className="flex flex-col">
                <span className="text-small text-default-500">Payment Frecuency:</span>
                <span className="text-medium truncate" title={`${loanRequest.payment_frequency?.description ?? ""}`}>
                  {loanRequest.payment_frequency?.description ?? ""}
                </span>
              </div>

              <div className="col-span-2">
                <p className="text-small text-default-500">Customer Email:</p>
                <p className="text-medium truncate" title={loanRequest.person.email ?? undefined}>
                  {loanRequest.person.email}
                </p>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </Card.Body>
    </Card>
  )
}