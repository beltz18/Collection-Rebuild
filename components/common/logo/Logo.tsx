import { cn } from '@uti/cn'
import Image from 'next/image'
import { IconProps } from './logo.types'

export const Logo = ({
  className,
  width = 100,
  height = 100,
  src,
  alt,
}: IconProps) => {
  return (
    <Image
      src={ src }
      width={ width }
      height={ height }
      alt={ alt }
      className={ cn('', className) }
    />
  )
}