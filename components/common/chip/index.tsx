import { Chip as Span, ChipProps } from "@heroui/chip"

export function Chip({ className, children }: ChipProps) {
  return(
    <Span className={className}>{children}</Span>
  )
}