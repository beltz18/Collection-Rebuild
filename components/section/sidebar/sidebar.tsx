import { Icon } from '@com/icon'
import {
  useState,
  createContext,
  useContext,
} from 'react'
import {
  SidebarContext as Ctx,
  SidebarNodes,
  SidebarItems,
} from './sidebar.types'

const SidebarContext = createContext<Ctx>({
  open: true,
  toggle: () => {},
})

export const Sidebar = ({ children }: SidebarNodes) => {
  const [open, toggle] = useState(true)

  return (
    <SidebarContext.Provider value={{ open, toggle }}>
      { children }
    </SidebarContext.Provider>
  )
}

function Trigger() {
  const { open, toggle } = useContext(SidebarContext)

  return (
    <button
      onClick={() => toggle(!open)}
      className={`rounded-br-md fixed top-0 left-0 z-50 px-3 py-2 bg-theme-primary`}
      title={`${ open ? 'Close sidebar' : 'Open sidebar' }`}
    >
      <Icon
        icon='hamburger'
        size='lg'
        className='text-white'
      />
    </button>
  )
}

function Content ({ children }: SidebarNodes) {
  const { open } = useContext(SidebarContext)

  return (
    <div
      className={`bg-theme-primary text-theme-text fixed top-0 left-0 h-full flex justify-between flex-col transition-transform
        ${ open ? 'translate-x-0' : '-translate-x-[calc(100%-60px)]' }
        w-[17rem] pt-12`
      }
    >
      { children }
    </div>
  )
}

function Body ({ children }: SidebarNodes) {
  return (
    <div className='flex flex-col justify-start h-full'>
      { children }
    </div>
  )
}

function Footer ({ children }: SidebarNodes) {
  return (
    <div className=''>
      { children }
    </div>
  )
}

function Item ({ children, active, setActive, icon }: SidebarItems) {
  const { open } = useContext(SidebarContext)

  return (
    <div
      className={`my-[2px] mx-2 p-3 flex gap-4 text-[18px] rounded-md cursor-pointer hover:bg-white hover:text-theme-hover-text
        ${ active &&  'bg-white text-theme-hover-text' }`}
      onClick={ setActive }
    >
      {
        open
          ?
        <>
          { icon }
          { children }
        </>
          :
        <div className='w-full flex items-end justify-end'>
          { icon }
        </div>
      }
    </div>
  )
}

Sidebar.Toggle  = Trigger
Sidebar.Content = Content
Sidebar.Body    = Body
Sidebar.Footer  = Footer
Sidebar.Item    = Item