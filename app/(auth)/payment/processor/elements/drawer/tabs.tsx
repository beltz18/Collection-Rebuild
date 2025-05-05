"use client"

import { navItems } from "./constants"
import { useTheme } from "@ctx/themeContext"
import { useResponsive } from "@uti/useResponsive"
import { ScrollShadow } from "@heroui/scroll-shadow"

interface NavigationTabsProps {
  selectedOption: string
  setSelectedOption: (option: string) => void
}

export function NavigationTabs({ selectedOption, setSelectedOption }: NavigationTabsProps) {
  const { theme } = useTheme()
  const { isMobile, isTablet } = useResponsive()

  const tabsContent = (
    <div
      className={`flex justify-start items-center ${isMobile ? "gap-2" : "gap-4"} h-16 px-4 ${isMobile ? "w-max" : "w-full"}`}
    >
      {navItems.map((item) => {
        const isActive = selectedOption === item.href.slice(1)
        return (
          <button
            key={item.href}
            className={`${isMobile ? "min-w-[110px]" : "min-w-[130px]"} px-4 outline-none flex justify-center h-full gap-2 items-center transition-colors 
              ${
                isActive
                  ? theme === "light" || theme === "dark"
                    ? "border-b-2 border-b-theme-primary text-default-600"
                    : "border-b-2 border-b-theme-primary text-theme-text-title"
                  : "text-gray-600 hover:text-gray-800"
              }
            `}
            onClick={() => setSelectedOption(item.href.slice(1))}
          >
            <item.icon size={18} className="flex-shrink-0" />
            <span className={`font-medium ${isMobile ? "text-xs" : "text-sm"} text-start whitespace-nowrap`}>
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )

  return (
    <nav className="w-full p-0 flex justify-start">
      <div className="container">
        {isMobile || isTablet ? (
          <ScrollShadow hideScrollBar orientation="horizontal" className="w-full">
            {tabsContent}
          </ScrollShadow>
        ) : (
          tabsContent
        )}
      </div>
    </nav>
  )
}