'use client'

import { LogsTableContainer } from './table-container'
import { PaginationC } from '@com/index'
import { mockLogsData } from './mock/mock-data'
import { ActivityLog, ColumnEx, LogAction, LogStatus } from '../../../types/log'

type Props = {
  search?: string
  currentPeriod?: {
    month: string
    week: string
  }
  onSelectionChange?: (keys: Set<number>) => void
}

const activityLogs: ActivityLog[] = mockLogsData.map((log) => ({
  id: log.id,
  status: log.status as LogStatus,
  action: log.action as LogAction,
  message: log.message,
  date: log.timestamp,
  userId: log.userId ?? undefined,
}))

const columns: ColumnEx[] = [
  {
    uid: 'status',
    name: 'Status',
    sortable: true,
  },
  {
    uid: 'action',
    name: 'Action',
    sortable: true,
  },
  {
    uid: 'message',
    name: 'Message',
    sortable: false,
  },
  { uid: 'date', name: 'Date', sortable: true },
]

export const LogsQueryContainer = ({
  search,
  currentPeriod,
  onSelectionChange,
}: Props) => {
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
