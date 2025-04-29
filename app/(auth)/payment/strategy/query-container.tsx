"use client"

import { TableContainer } from "./table-container"
import { useGetStrategies } from "@api/routes/strategy"
import { useTokenStore } from "@sts/useTokenStore"
import type { ColumnEx } from "./types"
import { NoResults, LoadingComp } from "@uti/home-utils"
import { errorToast } from "@com/index"
import { useEffect, useState } from "react"

const columns: ColumnEx[] = [
  { uid: "name", name: "Name" },
  { uid: "status", name: "Status" },
  { uid: "company", name: "Company ID" },
  { uid: "store", name: "Store" },
  { uid: "days_before_due", name: "Days Before Due" },
  { uid: "strict_mode", name: "Mode" },
  { uid: "is_default", name: "Default" },
  { uid: "actions", name: "Actions" },
]

export const TableQueryContainer = () => {
  const { token, logout } = useTokenStore()
  
  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState<number>(10)
  
  const { data, isLoading, isFetching, isError, error } = useGetStrategies(token)
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
        title="Payment Strategies"
        columns={columns}
        options={options}
        selected={selected}
        setSelected={setSelected}
      />
    )
  }

  if (!data || data.length === 0) return <NoResults title="Payment Strategies" />

  const strategies = data.map((strategy) => ({
    ...strategy,
  }))

  return (
    <>
      <TableContainer 
        data={ strategies } 
        columns={columns} 
      />
    </>
  )
}