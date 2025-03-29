import Image from 'next/image'
import { IconProps } from './logo.types'

export const Logo = ({ className = '', width = 100, height = 100, src, alt }: IconProps) => {
  return <Image className={className} src={src} width={width} height={height} alt={alt} priority />
}
