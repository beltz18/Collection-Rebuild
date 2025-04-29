'use client'

import { useEffect, useState, useMemo } from 'react'
import { LogsQueryContainer } from './query-container'
import AuthLayout from '../../layout'
import { DefaultLayout } from '@lay/default'
import { Card } from '@heroui/card'
import { useSidebarStore } from '@sts/useSidebarStore'
import { Button } from '@heroui/button'
import { Icon } from '@com/icon'
import { WeeklyPerformanceChart } from './weekly-performance-chart'
import { mockLogsData } from './mock/mock-data'
import { WeekSelector } from './week-selector'
import { MonthSelector } from './month-selector'
import { useResponsive } from '@uti/useResponsive'

export default function LogsDashboard() {
  const [mounted, setMounted] = useState(false)
  const { isDesktopL } = useResponsive()
  const [currentPeriod, setCurrentPeriod] = useState({
    month: 'April',
    week: `Week 4`,
  })

  const { setActiveTab, setActiveChildrenTab, setActiveChildrenIndex } =
    useSidebarStore()

  const weeklyPerformanceData = useMemo(() => {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']

    return weeks.map((week) => {
      const weekNumber = parseInt(week.replace('Week ', ''))
      const weekLogs = mockLogsData.filter((log) => {
        const logDate = new Date(log.timestamp)
        const logWeek = Math.ceil(logDate.getDate() / 7)
        return logWeek === weekNumber
      })

      return {
        week,
        success: weekLogs.filter((log) => log.status === 'Success').length,
        failed: weekLogs.filter((log) => log.status === 'Failed').length,
      }
    })
  }, [])

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
