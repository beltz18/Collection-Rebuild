"use client"

import { TableContainer } from "./payments-table/table-container"
import { PaginationC } from "@com/pagination"
import type { ColumnEx } from "@typ/home-tables"
import { type Status, paymentStatus } from "@typ/payment-status"
import { format } from "date-fns"
import { Card } from "@heroui/card"
import MenuOptions from "@sec/menufilters"
import { useGetPayments } from "@api/routes/payment"
import { useTokenStore } from "@sts/useTokenStore"
import { SkeletonTable, errorToast } from "@com/index"
import { useEffect, useState } from "react"

const columns: ColumnEx[] = [
  { uid: "id", name: "ID" },
  { uid: "name", name: "Person Name" },
  { uid: "status", name: "Status" },
  { uid: "amount", name: "Amount" },
  { uid: "capital", name: "Capital" },
  { uid: "interest", name: "Interest" },
  { uid: "due_date", name: "Due Date" },
  { uid: "pay_date", name: "Payment Date" },
  { uid: "loan_num", name: "Loan Number" },
  { uid: "company", name: "Company Name" },
  { uid: "pay_num", name: "Payment Number" },
  { uid: "actions", name: "Actions" },
]

export default function PaymentTable() {
  const { token, logout } = useTokenStore()

  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState<number>(8)
  const [current, setCurrent] = useState<number>(1)

  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useGetPayments(token, { page_size: selected, page: current })

  console.log(data);
  

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  if (isError) {
    console.log(error)
    errorToast({
      title: (error as any).response?.data?.error ?? "Error",
      body: (error as any).response?.data?.message ?? "Unexpected error. Logging out",
    })
    logout()
    return null
  }

  if (isLoading) {
    return (
      <Card className="flex flex-col gap-4 p-4">
        <div className="text-default-600 flex justify-between items-center text-lg">
          <MenuOptions title="Payments" options={[4, 8, 12]} selected={selected} setSelected={setSelected} />
        </div>

        <SkeletonTable columns={columns} rows={selected} />
      </Card>
    )
  }

  if (!data?.results || data.results.length === 0) return null

  const payments = data.results.map((item) => {
    const statusCode = item.payment_status.unique_description as Status

    return {
      id: item.loan_payment_id,
      personName: `${item.person.first_name} ${item.person.last_name}`,
      amount: `$${Number.parseFloat(item.amount).toFixed(2)}`,
      capital: `$${Number.parseFloat(item.capital).toFixed(2)}`,
      interestAmount: `$${Number.parseFloat(item.interest_amount).toFixed(2)}`,
      status: statusCode,
      statusName: paymentStatus[statusCode],
      dueDate: item.due_date ? format(new Date(item.due_date), "PP") : "Not set",
      paymentDate: item.real_payment_date ? format(new Date(item.real_payment_date), "PP") : "Not paid yet",
      loanRequestNumber: item.loan_request_id,
      companyName: item.company_name,
      numberPayment: item.number_payment,
    }
  })

  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="text-default-600 flex justify-between items-center text-lg">
        <MenuOptions title="Payments" options={[4, 8, 12]} selected={selected} setSelected={setSelected} />
      </div>

      <TableContainer data={payments} columns={columns} />

      <div className="w-full flex items-center justify-center">
        <PaginationC total={Math.floor(data.count / selected)} currentPage={current} onPageChange={setCurrent} />
      </div>
    </Card>
  )
}