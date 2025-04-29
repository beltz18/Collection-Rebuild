'use client'

import { LogsTableContainer } from './table-container'
import { PaginationC } from '@com/index'
import { mockLogsData } from './mock/mock-data'
import { ActivityLog, ColumnEx } from './types'
import { useMemo } from 'react'
import { getCalendarWeekOfMonth, monthToNumber } from '@uti/calendar'

type Props = {
  search?: string
  currentPeriod?: {
    month: string
    week: string
  }
  onSelectionChange?: (keys: Set<number>) => void
}

export const LogsQueryContainer = ({
  search,
  currentPeriod,
  onSelectionChange,
}: Props) => {
  const filteredLogs = useMemo(() => {
    if (!currentPeriod) return mockLogsData

    const monthNum = monthToNumber(currentPeriod.month)
    const weekNum = parseInt(currentPeriod.week.replace('Week ', ''))

    return mockLogsData.filter((log) => {
      const logDate = new Date(log.timestamp)
      return (
        logDate.getMonth() + 1 === monthNum &&
        getCalendarWeekOfMonth(logDate) === weekNum
      )
    })
  }, [currentPeriod])

  const activityLogs: ActivityLog[] = filteredLogs.map((log) => ({
    id: log.id,
    status: log.status,
    action: log.action,
    message: log.message,
    date: log.timestamp,
    userId: log.userId,
  }))

  const columns: ColumnEx[] = [
    { uid: 'status', name: 'Status', sortable: true },
    { uid: 'action', name: 'Action', sortable: true },
    { uid: 'message', name: 'Message', sortable: false },
    { uid: 'date', name: 'Date', sortable: true },
  ]

  return (
    <div className='w-full flex flex-col gap-6'>
      <LogsTableContainer
        data={activityLogs}
        columns={columns}
        currentPeriod={currentPeriod}
        onSelectionChange={onSelectionChange}
      />
      <div className='flex justify-center'>
        <PaginationC total={activityLogs.length} />
      </div>
    </div>
  )
}
