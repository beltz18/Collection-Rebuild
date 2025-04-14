"use client"

import { cn } from "@uti/cn"
import { X, AlertCircle, Check, Info } from "lucide-react"

type IconType = "cross" | "check" | "info" | "alert"
type IconSize = "sm" | "md" | "lg"

interface IconProps {
  icon: IconType
  size?: IconSize
  className?: string
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
}

export const Icon = ({ icon, size = "md", className }: IconProps) => {
  const sizeClass = sizeMap[size]

  const renderIcon = () => {
    switch (icon) {
      case "cross":
        return <X className={cn(sizeClass, className)} />
      case "check":
        return <Check className={cn(sizeClass, className)} />
      case "info":
        return <Info className={cn(sizeClass, className)} />
      case "alert":
        return <AlertCircle className={cn(sizeClass, className)} />
      default:
        return null
    }
  }

  return renderIcon()
}