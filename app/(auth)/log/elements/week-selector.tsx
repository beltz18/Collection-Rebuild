'use client'

import { useRef, useState, useMemo } from 'react'
import { ScrollShadow } from '@heroui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Icon } from '@com/icon'
import { cn } from '@uti/cn'
import { monthToNumber } from '@uti/calendar'

interface WeekSelectorProps {
  currentWeek: string
  currentMonth: string
  onWeekChange: (week: string) => void
}

const monthAbbr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const getMondayOfFirstWeek = (year: number, monthIndex: number): Date => {
  const firstDay = new Date(year, monthIndex, 1)
  const dayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  const monday = new Date(firstDay)
  monday.setDate(firstDay.getDate() - dayOfWeek)
  return monday
}

const getWeekRanges = (
  monthName: string
): { number: string; range: string }[] => {
  const monthIndex = monthToNumber(monthName) - 1
  const year = 2025
  const firstMonday = getMondayOfFirstWeek(year, monthIndex)

  return Array.from({ length: 5 }, (_, i) => {
    const weekStart = new Date(firstMonday)
    weekStart.setDate(weekStart.getDate() + i * 7)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    const format = (d: Date) => `${monthAbbr[d.getMonth()]} ${d.getDate()}`
    return {
      number: `Week ${i + 1}`,
      range: `${format(weekStart)} - ${format(weekEnd)}`,
    }
  })
}

export const WeekSelector = ({
  currentWeek,
  currentMonth,
  onWeekChange,
}: WeekSelectorProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = useState({
    showLeft: false,
    showRight: false,
  })

  const weeks = useMemo(() => getWeekRanges(currentMonth), [currentMonth])

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setScrollState({
        showLeft: scrollLeft > 0,
        showRight: scrollLeft < scrollWidth - clientWidth,
      })
    }
  }

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -160 : 160,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className='flex flex-col gap-2 relative'>
      <h3 className='text-lg font-bold'>Weeks</h3>
      <div className='relative group'>
        {scrollState.showLeft && (
          <button
            onClick={() => scroll('left')}
            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-theme-background text-theme-text-default p-1 rounded-full'
          >
            <ChevronLeft className='h-5 w-5' />
          </button>
        )}
        <ScrollShadow
          ref={scrollRef}
          className='w-full p-2'
          orientation='horizontal'
          size={100}
          onScroll={handleScroll}
          hideScrollBar
          visibility={
            scrollState.showLeft && scrollState.showRight
              ? 'both'
              : scrollState.showLeft
                ? 'left'
                : scrollState.showRight
                  ? 'right'
                  : 'none'
          }
        >
          <div className='flex flex-row gap-4 pb-2'>
            {weeks.map((week) => (
              <div
                key={week.number}
                onClick={() => onWeekChange(week.number)}
                className={cn(
                  'cursor-pointer p-6 shadow-lg rounded-lg flex flex-col items-center gap-4 bg-theme-background min-w-[120px]',
                  currentWeek === week.number &&
                    'bg-theme-primary text-theme-text-inverse'
                )}
              >
                <Icon icon='calendar' size='md' />
                <div className='flex flex-col items-center gap-0.5'>
                  <p className='font-bold'>{week.number}</p>
                  <p className='text-xs text-nowrap'>{week.range}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollShadow>
        {scrollState.showRight && (
          <button
            onClick={() => scroll('right')}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-theme-background text-theme-text-default p-1 rounded-full'
          >
            <ChevronRight className='h-5 w-5' />
          </button>
        )}
      </div>
    </div>
  )
}
