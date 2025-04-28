import { cn } from '@uti/cn'
import { ChipProps } from '@heroui/chip'

export function Chip({ className, children }: ChipProps) {
  return(
    <span className={ cn('py-1 px-3 rounded-full', className) }>
      { children }
    </span>
  )
}