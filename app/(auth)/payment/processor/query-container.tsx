'use client'

import {
  useState,
  useEffect,
} from 'react'
import {
  NoResults,
  LoadingComp,
} from '@uti/home-utils'
import { TableContainer } from './table-container'
import { useGetProcessors } from '@api/routes/processor'
import { useTokenStore } from '@sts/useTokenStore'
import { errorToast } from '@com/index'
import { ColumnEx } from './types'

type Props = {
  search?: string
  setSearch: (search: string) => void
}

const columns: ColumnEx[] = [
  { uid: 'name', name: 'Name', sortable: true },
  { uid: 'description', name: 'Description' },
  { uid: 'processor_type', name: 'Type', sortable: true },
  { uid: 'status', name: 'Status', sortable: true },
  { uid: 'store_id', name: 'Store ID' },
  { uid: 'client_id', name: 'Client ID' },
  { uid: 'location_id', name: 'Location ID' },
]

export const QueryContainer = ({
  search,
  setSearch,
}: Props) => {
  const { token, logout } = useTokenStore()

  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState<number>(10)

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetProcessors(
    token,
    {
      search,
    },
  )

  const options = data ? Array(data.length).fill(0) : []

  useEffect(() => {
    setMounted(true)
    if (isError) {
      console.log(error)
      errorToast({
        title: 'Error',
        body: 'Session expired or unexpected error. Please sign in again',
        duration: 5000,
      })
      logout()
    }
  }, [isError, error, logout])

  if (!mounted) return null

  if (isLoading || isFetching) {
    return (
      <LoadingComp
        title='Payment Processors'
        columns={ columns }
        options={ options }
        selected={ selected }
        setSelected={ setSelected }
        input={ search ?? '' }
        setInput={ setSearch }
        headless
      />
    )
  }

  if (!data || data.length === 0) {
    return (
      <NoResults
        title='Payment Processors'
        description='No results found'
      />
    )
  }

  const processors = data.map((processor) => ({
    ...processor,
  }))

  return (
    <TableContainer
      data={ processors }
      columns={ columns }
    />
  )
}