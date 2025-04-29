"use client"

import { TableContainer } from "./table-container"
import { useGetProcessors } from "@api/routes/processor"
import { useTokenStore } from "@sts/useTokenStore"
import { NoResults, LoadingComp } from "@uti/home-utils"
import { errorToast } from "@com/index"
import { mockData } from "./mock/mock-data"
import { PaymentEx, ColumnEx } from "./types"
import { useState, useEffect } from "react"

type Props = {
  search?: string
  onSelectionChange?: (keys: Set<number>) => void
}

const columns: ColumnEx[] = [
  { uid: "name", name: "Name", sortable: true },
  { uid: "description", name: "Description" },
  { uid: "processor_type", name: "Type", sortable: true },
  { uid: "status", name: "Status", sortable: true },
  { uid: "store_id", name: "Store ID" },
  { uid: "client_id", name: "Client ID" },
  { uid: "location_id", name: "Location ID" },
]

export const TableQueryContainer = ({ onSelectionChange }: Props) => {
  const { token, logout } = useTokenStore()

  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState<number>(10)

  const { data, isLoading, isFetching, isError, error } =
    useGetProcessors(token)
  const options = data ? Array(data.length).fill(0) : []

  useEffect(() => {
    setMounted(true)
    if (isError) {
      console.log(error)
      errorToast({
        title: "Error",
        body: "Session expired or unexpected error. Please sign in again",
        duration: 5000,
      })
      logout()
    }
  }, [isError, error, logout])

  if (!mounted) return null

  if (isLoading || isFetching) {
    return (
      <LoadingComp
        title="Payment Processors"
        columns={columns}
        options={options}
        selected={selected}
        setSelected={setSelected}
      />
    )
  }

  if (!data || data.length === 0)
    return <NoResults title="Payment Processors" />

  const processors = data.map((processor) => ({
    ...processor,
  }))

  return (
    <div className="w-full flex items-center flex-col gap-4">
      <TableContainer data={processors} columns={columns} />
    </div>
  )
}