import { useState } from 'react'

import Image from 'next/image'
import { LOGO_FOOTER } from '@uti/var'

export const Footer = () => {
  const [useFallback, setUseFallback] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <footer className='bg-[#161616e0] h-[3.5rem] w-full flex justify-center items-center py-2'>
      <Image
        src={ LOGO_FOOTER }
        width={100}
        height={100}
        alt='Lendecy'
        priority
        unoptimized={ useFallback }
        onError={() => setUseFallback(true)}
        onLoad={() => setLoaded(true)}
        className={
          `transition-opacity duration-300 ease-in-out
          ${loaded ? 'opacity-100' : 'opacity-0'}`
        }
      />
    </footer>
  )
}