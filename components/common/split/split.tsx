import { cn } from '@uti/cn'

type Props = {
  children: React.ReactNode,
  className?: string,
}

export const Split = ({
  children,
  className,
}: Props) => {
  return (
    <div className={ cn('flex', className) }>
      { children }
    </div>
  )
}