import { cn } from '@uti/cn'
import { 
  colsN, 
  ColsKeys 
} from '@com/icon/icons/common.const'

type Props = {
  children: React.ReactNode,
  cols?: ColsKeys,
  className?: string,
}

export const Grid = ({
  children,
  cols=1,
  className,
}: Props) => {
  return (
    <div className={cn(`grid ${colsN[cols]}`, className)}>
      { children }
    </div>
  )
}