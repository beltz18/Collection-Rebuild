import Image from 'next/image'

export type IconProps = {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export const Logo = ({ className = '', width = 100, height = 100, src, alt }: IconProps) => {
  return <Image className={className} src={src} width={width} height={height} alt={alt} priority />
}
