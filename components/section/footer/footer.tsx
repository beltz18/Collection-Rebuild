import Image from 'next/image'
import { LOGO_FOOTER } from '@/utils/var'

export const Footer = () => {
  return (
    <footer className="bg-[#161616e0] h-[3.5rem] w-full flex justify-center items-center py-2">
      <Image
        src={ LOGO_FOOTER }
        width={100}
        height={100}
        alt="Lendecy"
        priority
      />
    </footer>
  )
}