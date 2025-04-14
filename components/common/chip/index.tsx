import { Chip as Span, ChipProps } from "@heroui/chip"
import { cn } from "@uti/cn"

export function Chip({ className, children }: ChipProps) {
  return(
    <Span className={ cn('', className) }>{children}</Span>
  )
}