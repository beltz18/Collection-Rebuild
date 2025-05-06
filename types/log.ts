export type LogStatus = 'Success' | 'Failed'

export type LogAction =
  | 'Login'
  | 'Logout'
  | 'Create'
  | 'Update'
  | 'Delete'
  | 'Access'
  | string

export interface ColumnEx {
  uid: string
  name: string
  sortable?: boolean
}

export interface ActivityLog {
  id: number
  status: LogStatus
  action: LogAction
  message: string
  date: string
  userId?: number
}

export interface WeekData {
  weekNumber: number
  startDate: string
  endDate: string
  logs: ActivityLog[]
}

export interface MonthData {
  monthName: string
  monthNumber: number
  year: number
  weeks: WeekData[]
}

export type TableData<T = ActivityLog> = {
  columns: ColumnEx[]
  data: T[]
  currentPeriod?: {
    month: string
    week: string
  }
}