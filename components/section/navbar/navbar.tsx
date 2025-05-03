import { Logo } from '@com/index'
import { cn } from '@uti/cn'
import { useTheme } from '@ctx/themeContext'
import {
  LOGO_ENTITY,
  CONTRAST,
} from '@uti/var'

export const Navbar = ({ className }: { className?: string }) => {
  const { theme } = useTheme()

  return (
    <div className='bg-theme-primary w-full h-[60px] py-2 px-6 flex justify-end'>
      <Logo
        className={ cn('h-full w-auto', className) }
        src={ Boolean(['dark', 'red'].find((e) => e == theme)) ? CONTRAST : LOGO_ENTITY }
        alt='logo'
      />
    </div>
  )
}