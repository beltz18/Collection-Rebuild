import Common, { IconKeys } from './icons/common'
import { cn } from '@uti/cn'
import {
  iconSize,
  IconSizeKeys,
} from './icons/common.const'

export type IconProps = {
  icon: IconKeys,
  className?: string,
  size?: IconSizeKeys,
}

export const Icon = ({
  icon,
  size='sm',
  className,
}: IconProps) => {
  const Ic = Common[icon].SVG
  return (
    <div className={cn('', className)}>
      <Ic size={ iconSize[size] } />
    </div>
  )
}