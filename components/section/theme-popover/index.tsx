"use client"

import type React from "react"
import { useEffect } from "react"
import { useTheme } from "@ctx/themeContext"
import { CustomPopover } from "@com/popover/popover"
import { ThemePopoverProps } from "./theme-popover-types"

type ThemeOption = {
  name: "light" | "dark" | "blue" | "red"
  color: string
  textColor: string
  bgColor: string
}

const themeOptions: ThemeOption[] = [
  { name: "light", color: "#f8fafc", textColor: "text-gray-900", bgColor: "bg-white" },
  { name: "dark", color: "#1e293b", textColor: "text-white", bgColor: "bg-neutral-900" },
  { name: "blue", color: "#023047", textColor: "text-white", bgColor: "bg-[#023047]" },
  { name: "red", color: "#b91c1c", textColor: "text-white", bgColor: "bg-red-700" },
]

export const ThemeSelector = ({ children, placementOpen = true }: ThemePopoverProps) => {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    document.documentElement.classList.remove("theme-light", "theme-dark", "theme-blue", "theme-red")
    document.documentElement.classList.add(`theme-${theme}`)
  }, [theme])

  return (
    <CustomPopover placement={ placementOpen ? 'top' : 'right-start' } className="z-50">
      <CustomPopover.Trigger className="w-full">{children}</CustomPopover.Trigger>

      <CustomPopover.Content className="w-[15.5rem] p-2 rounded-md shadow-lg z-50">
        <div className="space-y-2 w-full">
          <h3 className="text-sm font-medium py-1">Select Theme</h3>
          <div className="grid grid-cols-4 gap-2">
            {themeOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => setTheme(option.name)}
                className={`flex items-center justify-between p-2 rounded-md transition-colors
                  ${option.bgColor} ${option.textColor}
                  ${
                    theme === option.name
                      ? theme === "light"
                        ? "ring-1 ring-offset-1 ring-[#5b5b5b34]"
                        : theme === "dark"
                        ? "ring-1 ring-offset-1 ring-[rgba(134,133,133,0.08)]"
                        : ""
                      : ""
                  }
                `}
              />
            ))}
          </div>
        </div>
      </CustomPopover.Content>
    </CustomPopover>
  )
}