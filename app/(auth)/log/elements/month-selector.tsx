'use client'

import { useRef, useState } from 'react'
import { ScrollShadow } from '@heroui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Icon } from '@com/icon'
import { cn } from '@uti/cn'

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

interface MonthSelectorProps {
  currentMonth: string
  onMonthChange: (month: string) => void
}

export const MonthSelector = ({ currentMonth, onMonthChange }: MonthSelectorProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = useState({
    showLeft: false,
    showRight: true,
  })

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setScrollState({
        showLeft: scrollLeft > 0,
        showRight: scrollLeft < scrollWidth - clientWidth,
      })
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 160
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className='flex flex-col gap-2 relative'>
      <h3 className='text-lg font-bold'>Months</h3>
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
            {months.map((month) => (
              <div
                key={month}
                onClick={() => onMonthChange(month)}
                className={cn(
                  'cursor-pointer p-6 shadow-lg rounded-lg flex flex-row items-center gap-4 bg-theme-background min-w-[180px]',
                  currentMonth === month && 'bg-theme-primary text-theme-text-inverse'
                )}
              >
                <Icon icon='folder' size='lg' />
                <div className='flex flex-col gap-0.5'>
                  <p className='font-bold'>{month}</p>
                  <p>2025</p>
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