"use client"

import { Input } from "@heroui/input"
import type { FilterContentItemProps, FilterValue } from "../types"

export function AmountRangeFilter<T extends Record<string, FilterValue>>({
  filter,
  values,
  onChange,
}: FilterContentItemProps<T>) {
  const minKey = `min${String(filter.key).charAt(0).toUpperCase() + String(filter.key).slice(1)}` as keyof T
  const maxKey = `max${String(filter.key).charAt(0).toUpperCase() + String(filter.key).slice(1)}` as keyof T
  console.log(minKey);
  console.log(maxKey);
  

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Input
        type="number"
        label={`Minimum ${filter.label}`}
        placeholder="0.00"
        value={(values[minKey] as string) || ""}
        onChange={(e) => onChange(minKey, e.target.value)}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-small text-default-400">$</span>
          </div>
        }
        variant="bordered"
        classNames={{
          label: "text-default-600 font-medium",
          input: "text-default-800",
        }}
        description={`Minimum ${filter.label.toLowerCase()}`}
      />

      <Input
        type="number"
        label={`Maximum ${filter.label}`}
        placeholder="0.00"
        value={(values[maxKey] as string) || ""}
        onChange={(e) => onChange(maxKey, e.target.value)}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-small text-default-400">$</span>
          </div>
        }
        variant="bordered"
        classNames={{
          label: "text-default-600 font-medium",
          input: "text-default-800",
        }}
        description={`Maximum ${filter.label.toLowerCase()}`}
      />
    </div>
  )
}