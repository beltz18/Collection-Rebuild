"use client"

import { ScrollShadow } from "@heroui/scroll-shadow"
import { Badge } from "@heroui/badge"
import { motion } from "framer-motion"
import { cn } from "@uti/cn"
import type { FilterSidebarProps, FilterValue } from "./types"

function FilterSidebarComponent<T extends Record<string, FilterValue>>(props: FilterSidebarProps<T>) {
  const { filterOptions, activeFilter, setActiveFilter, filters } = props

  const hasFilterValue = (key: keyof T) => {
    const value = filters[key]

    if (value === undefined || value === null || value === "") {
      return false
    }

    if (typeof value === "object" && "from" in value) {
      return !!value.from
    }

    return true
  }

  return (
    <div className="w-64 border-r border-default-200 dark:border-default-100/40">
      <ScrollShadow className="h-full">
        <div className="py-2">
          <h3 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-default-500">
            Filter Categories
          </h3>
          <ul className="mt-1">
            {filterOptions.map((option) => (
              <li key={option.id}>
                <button
                  onClick={() => setActiveFilter(option.id)}
                  className={cn(
                    "relative flex w-full items-center gap-3 px-4 py-3 text-left transition-all",
                    activeFilter === option.id
                      ? "bg-theme-primary/20 text-default-600 dark:bg-primary-900/20 dark:text-primary-400"
                      : "hover:bg-default-100 dark:hover:bg-default-100/10",
                    "focus:outline-none focus-visible:bg-default-100 dark:focus-visible:bg-default-100/10",
                  )}
                >
                  {activeFilter === option.id && (
                    <motion.div
                      layoutId="sidebar-active-indicator"
                      className="absolute left-0 top-0 h-full w-1 bg-theme-text-hover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  <option.icon size={18} className={activeFilter === option.id ? "text-default-600" : "text-default-500"} />
                  <span className="text-sm font-medium">{option.label}</span>

                  {hasFilterValue(option.key) && (
                    <Badge color="success" variant="shadow" className="ml-auto top-1 h-3 min-w-3 px-1 text-xs" size="sm">
                      ✓
                    </Badge>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </ScrollShadow>
    </div>
  )
}

export const FilterSidebar = FilterSidebarComponent as typeof FilterSidebarComponent