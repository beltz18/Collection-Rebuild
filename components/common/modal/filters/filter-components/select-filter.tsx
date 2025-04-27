"use client"

import { Select, SelectItem } from "@heroui/select"
import { motion } from "framer-motion"
import type { FilterContentItemProps, FilterValue } from "../types"

interface SelectFilterProps<T extends Record<string, FilterValue>> extends FilterContentItemProps<T> {
  options: Record<string, string>
  getStatusColor?: (status: string) => string
}

export function SelectFilter<T extends Record<string, FilterValue>>({
  filter,
  values,
  onChange,
  options,
  getStatusColor,
}: SelectFilterProps<T>) {
  return (
    <div>
      <Select
        label={`${filter.label}`}
        placeholder={`Select a ${filter.label.toLowerCase()}`}
        value={(values[filter.key] as string) || ""}
        onChange={(e) => onChange(filter.key, e.target.value)}
        variant="bordered"
        classNames={{
          label: "text-default-600 font-medium",
          value: "text-default-800",
        }}
        description={`Filter by ${filter.label.toLowerCase()}`}
      >
        {Object.entries(options).map(([key, value]) => (
          <SelectItem key={key} data-value={key}>
            {value}
          </SelectItem>
        ))}
      </Select>

      {values[filter.key] && getStatusColor && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 rounded-lg border p-4 ${getStatusColor(values[filter.key] as string)}`}
        >
          <p className="font-medium">Selected {filter.label}:</p>
          <p className="text-lg font-semibold">{String(values[filter.key])}</p>
        </motion.div>
      )}
    </div>
  )
}