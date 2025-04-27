import { useState } from 'react'
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
  const [useFallback, setUseFallback] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      src={ src }
      width={ width }
      height={ height }
      alt={ alt }
      priority
      unoptimized={ useFallback }
      onError={() => setUseFallback(true)}
      onLoadingComplete={() => setLoaded(true)}
      className={
        cn('transition-opacity duration-300 ease-in-out',
        loaded ? 'opacity-100' : 'opacity-0', className)
      }
    />
  )
}