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
  open: false,
  toggle: () => {},
})

export const Sidebar = ({ children }: SidebarNodes) => {
  const [open, toggle] = useState(false)

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
      className={`rounded-md fixed top-2 left-2 z-50 ${
        open ? 'bg-gray-500 text-theme-text' : 'bg-gray-200 text-theme-hover-text'
      }`}
    >
      { open ? 'Close Sidebar' : 'Open Sidebar' }
    </button>
  )
}

function Content ({ children }: SidebarNodes) {
  const { open } = useContext(SidebarContext)

  return (
    <div
      className={`bg-theme-primary text-theme-text fixed top-0 left-0 h-full flex justify-between flex-col transition-transform ${
        open ? 'translate-x-0' : '-translate-x-full'
      } w-[17rem]`}
    >
      { children }
    </div>
  )
}

function Header ({ children }: SidebarNodes) {
  return (
    <div className='p-4 mt-10'>
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
    <div className='p-4'>
      { children }
    </div>
  )
}

function Item ({ children, active }: SidebarItems) {
  return (
    <div
      className={`p-4 cursor-pointer hover:bg-white hover:text-theme-hover-text
        ${ active &&  'bg-white text-theme-hover-text' }`}
    >
      { children }
    </div>
  )
}

Sidebar.Toggle  = Trigger
Sidebar.Content = Content
Sidebar.Header  = Header
Sidebar.Body    = Body
Sidebar.Footer  = Footer
Sidebar.Item    = Item