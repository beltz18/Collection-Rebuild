import { ReactNode } from "react"
import { cn } from "@uti/cn"
import { LabelProps } from "./label.types"

export function Label({ children, className }: LabelProps) {
  return(
    <span className={cn('text-small text-default-500', className)}>
      {children}
    </span>
  )
}