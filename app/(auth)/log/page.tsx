'use client'

import { useEffect, useState, useMemo } from 'react'
import { LogsQueryContainer } from './query-container'
import AuthLayout from '../../layout'
import { DefaultLayout } from '@lay/default'
import { Card } from '@heroui/card'
import { useSidebarStore } from '@sts/useSidebarStore'
import { Button } from '@heroui/button'
import { Icon } from '@com/icon'
import { WeeklyPerformanceChart } from './elements/weekly-performance-chart'
import { mockLogsData } from './mock/mock-data'
import { WeekSelector } from './elements/week-selector'
import { MonthSelector } from './elements/month-selector'
import { useResponsive } from '@uti/useResponsive'

const monthToNumber = (month: string): number => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return months.indexOf(month) + 1
}

function getCalendarWeekOfMonth(date: Date): number {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const dayOfWeek = firstDayOfMonth.getDay() // 0 (Domingo) - 6 (Sábado)
  const offset = (dayOfWeek === 0 ? 6 : dayOfWeek - 1) // Ajuste para que lunes sea 0

  const adjustedDate = date.getDate() + offset
  return Math.ceil(adjustedDate / 7)
}

export default function LogsDashboard() {
  const [mounted, setMounted] = useState(false)
  const { isDesktopL } = useResponsive()
  const [currentPeriod, setCurrentPeriod] = useState({
    month: 'April',
    week: `Week 1`,
  })

  const { setActiveTab, setActiveChildrenTab, setActiveChildrenIndex } =
    useSidebarStore()

  const weeklyPerformanceData = useMemo(() => {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
    const currentMonthNum = monthToNumber(currentPeriod.month)
    
    return weeks.map((week) => {
      const weekNumber = parseInt(week.replace('Week ', ''))
      const weekLogs = mockLogsData.filter((log) => {
        const logDate = new Date(log.timestamp)
        const logMonth = logDate.getMonth() + 1
        const logWeek = Math.ceil(logDate.getDate() / 7)
        return logMonth === currentMonthNum && logWeek === weekNumber
      })

      return {
        week,
        success: weekLogs.filter((log) => log.status === 'Success').length,
        failed: weekLogs.filter((log) => log.status === 'Failed').length,
      }
    })
  }, [currentPeriod.month])

  useEffect(() => {
    setMounted(true)
    setActiveTab('Logs')
    setActiveChildrenTab('Activity Logs')
    setActiveChildrenIndex(3)
  }, [])

  const handleMonthChange = (month: string) => {
    setCurrentPeriod((prev) => ({ ...prev, month }))
  }

  const handleWeekChange = (week: string) => {
    setCurrentPeriod((prev) => ({ ...prev, week }))
  }

  if (!mounted) return null

  return (
    <AuthLayout>
      <DefaultLayout>
        <div className='p-4 space-y-4'>
          <Card className='flex flex-col gap-6 p-4'>
            <div className='flex flex-row flex-wrap justify-between items-center gap-2'>
              <h1 className='text-xl font-bold'>Logs Dashboard</h1>
              <Button color='primary'>
                <Icon icon='fileDown' size='sm' />
                Generate PDF Report
              </Button>
            </div>
            <MonthSelector
              currentMonth={currentPeriod.month}
              onMonthChange={handleMonthChange}
            />
            <div
              className={`w-full flex ${!isDesktopL ? 'flex-col' : 'flex-row'}`}
            >
              <WeekSelector
                currentWeek={currentPeriod.week}
                currentMonth={currentPeriod.month}
                onWeekChange={handleWeekChange}
              />
              <WeeklyPerformanceChart data={weeklyPerformanceData} />
            </div>
          </Card>

          <Card className='p-4'>
            <LogsQueryContainer currentPeriod={currentPeriod} />
          </Card>
        </div>
      </DefaultLayout>
    </AuthLayout>
  )
}
