"use client"

import { Input } from "@heroui/input"
import type { FilterContentItemProps, FilterValue } from "../types"

function TextFilterComponent<T extends Record<string, FilterValue>>(props: FilterContentItemProps<T>) {
  const { filter, values, onChange } = props

  return (
    <Input
      type="text"
      label={`${filter.label}`}
      placeholder={`Enter ${filter.label}`}
      value={(values[filter.key] as string) || ""}
      onChange={(e) => onChange(filter.key, e.target.value)}
      variant="bordered"
      classNames={{
        label: "text-default-600 font-medium",
        input: "text-default-800",
      }}
      description={`Search by ${filter.label.toLowerCase()}`}
    />
  )
}

export const TextFilter = TextFilterComponent as typeof TextFilterComponent