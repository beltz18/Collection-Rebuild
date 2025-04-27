"use client"

import { DayPicker } from "react-day-picker"
import type { DateRange } from "react-day-picker"
import type { FilterContentItemProps, FilterValue } from "../types"

export function DateRangeFilter<T extends Record<string, FilterValue>>({
  filter,
  values,
  onChange,
}: FilterContentItemProps<T>) {
  const dateRange = values[filter.key] as DateRange | undefined

  return (
    <div className="flex flex-col items-center rounded-xl border border-default-200 bg-default-50 p-4 dark:bg-default-50/20">
      <DayPicker
        mode="range"
        selected={dateRange}
        onSelect={(range) => onChange(filter.key, range)}
        className="rounded-lg bg-white p-3 shadow-sm dark:bg-default-100/50"
        classNames={{
          day_selected: "bg-primary text-white",
          day_today: "text-red-500 font-bold",
        }}
        footer={
          dateRange?.from ? (
            <div className="mt-3 rounded-lg bg-primary-50 p-2 text-center font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              {dateRange.from.toLocaleDateString()}
              {dateRange.to && ` - ${dateRange.to.toLocaleDateString()}`}
            </div>
          ) : (
            <div className="mt-3 rounded-lg bg-default-100 p-2 text-center text-default-600">
              Please select a date range
            </div>
          )
        }
      />
      <p className="mt-4 text-center text-sm text-default-500">
        Select a date range to filter by {filter.label.toLowerCase()}
      </p>
    </div>
  )
}