import { Logo } from '@com/index'
import { LOGO_ENTITY } from '@uti/var'
import { cn } from '@uti/cn'

export const Navbar = ({ className }: { className?: string }) => {
  return (
    <div className='bg-theme-primary w-full h-[60px] py-2 px-6 flex justify-end'>
      <Logo
        className={ cn('h-full w-auto', className) }
        src={ LOGO_ENTITY }
        alt='logo'
      />
    </div>
  )
}