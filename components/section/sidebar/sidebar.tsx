import Link from 'next/link'
import { Icon } from '@com/icon'
import { useTheme } from '@ctx/themeContext'
import { CustomPopover } from '@com/popover/popover'
import { useSidebarStore } from '@sts/useSidebarStore'
import { 
  ChevronDown, 
  ChevronRight 
} from 'lucide-react'
import {
  useState,
  createContext,
  useContext,
} from 'react'
import {
  SidebarContext as Ctx,
  SidebarNodes,
  SidebarItems,
  SidebarSubItems
} from './sidebar.types'

const SidebarContext = createContext<Ctx>({
  open: true,
  setOpen: () => {},
})

export const Sidebar = ({ children }: SidebarNodes) => {
  const { open, setOpen } = useSidebarStore()

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      { children }
    </SidebarContext.Provider>
  )
}

function Trigger({ click }: { click: (newState: boolean) => void }) {
  const { open, setOpen } = useContext(SidebarContext)
  const { theme } = useTheme()

  return (
    <button
      onClick={() => {
        click(!open)
        setOpen(!open)
      }}
      className='fixed top-0 left-0 z-50 h-[60px] px-4'
      title={`${ open ? 'Close sidebar' : 'Open sidebar' }`}
    >
      <Icon
        icon='hamburger'
        size='lg'
        className={ theme == 'light' ? 'text-black' : 'text-white'}
      />
    </button>
  )
}

function Content ({ children }: SidebarNodes) {
  const { open } = useContext(SidebarContext)

  return (
    <div
      className={`bg-theme-primary text-theme-text fixed top-0 left-0 h-full
        flex justify-between flex-col transition-all duration-300 pt-[60px]
        ${ open ? 'translate-x-0 w-[17rem]' : '-translate-x-0 w-[60px] px-1' }
      `}
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

function Item({ 
  children, 
  active, 
  expanded, 
  setActive, 
  setExpanded, 
  icon, 
  hasChildren, 
  childItems, 
}: SidebarItems) {
  const {
    activeChildrenTab,
    activeChildrenIndex,
    setActiveChildrenIndex,
  } = useSidebarStore()
  const { open } = useContext(SidebarContext)
  const isExpandable = hasChildren && open

  const handleClick = () => {
    if (hasChildren) setExpanded && setExpanded()
    else setActive && setActive()
  }

  const shouldShowExpanded = expanded && open

  if (open) {
    return (
      <div
        className={`my-[2px] p-3 flex gap-4 text-[18px] rounded-md cursor-pointer
          transition-all duration-200 ease-in-out hover:bg-white hover:text-theme-text-hover
          ${active && !expanded ? "bg-white text-theme-text-hover" : "text-theme-text-on-primary"}
          ${open && "mx-2"}
        `}
        onClick={ handleClick }
      >
        <div className="flex items-center gap-4 w-full">
          { icon }
          <span className="flex-1">
            { children }
          </span>
          {
            isExpandable && (
              <div className="transition-transform duration-300 ease-in-out">
                {
                  shouldShowExpanded
                    ?
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-300 ease-in-out rotate-180"
                  />
                    :
                  <ChevronRight
                    size={16}
                    className="transition-transform duration-300 ease-in-out"
                  />
                }
              </div>
            )
          }
        </div>
      </div>
    )
  }

  if (hasChildren && childItems && childItems.length > 0) {
    return (
      <CustomPopover placement="right" offset={10}>
        <CustomPopover.Trigger>
          <div
            className={`my-[2px] w-full flex items-center justify-center p-3 rounded-md cursor-pointer
            transition-all duration-200 ease-in-out hover:bg-white hover:text-theme-text-hover
              ${active ? "bg-white text-theme-text-hover" : "hover:bg-white text-theme-text-on-primary"}
            `}
          >
            { icon }
          </div>
        </CustomPopover.Trigger>

        <CustomPopover.Content className="py-2 px-1 bg-theme-primary rounded-md shadow-lg min-w-[180px]">
          <div className="mt-1 relative">
            <div className="absolute left-[21.7px] top-0 h-full w-[1px] bg-theme-text-on-primary/40" />
            <div
              className="absolute left-[19px] w-2 h-2 rounded-full bg-theme-text-on-primary z-10 transition-all duration-300 ease-in-out"
              style={{ top: `${activeChildrenIndex * 42 + 20}px` }} 
            />

            {
              childItems.map((child, childIdx) => (
                <div key={ childIdx }>
                  {
                    child.url
                      ?
                    <Link href={ child.url }>
                      <div
                        className="pl-9 py-1 relative"
                        onClick={() => {
                          child.setActive()
                          setActiveChildrenIndex(childIdx)
                        }}
                      >
                        <div
                          className={`flex items-center gap-3 w-full pl-2 pr-3 py-2 rounded-md text-[16px] cursor-pointer transition-all duration-300 ease-in-out hover:text-theme-text-hover
                            ${activeChildrenTab === child.label ? "bg-white text-theme-text-hover" : "hover:bg-white text-theme-text-on-primary"}`}
                        >
                          { child.icon }
                          <span>
                            { child.label }
                          </span>
                        </div>
                      </div>
                    </Link>
                      :
                    <div
                      className="pl-9 py-1 relative"
                      onClick={() => {
                        child.setActive()
                        setActiveChildrenIndex(childIdx)
                      }}
                    >
                      <div
                        className={`flex items-center gap-3 w-full pl-2 pr-3 py-2 rounded-md text-[16px] cursor-pointer transition-all duration-300 ease-in-out hover:text-theme-text-hover
                          ${activeChildrenTab === child.label ? "bg-white text-theme-text-hover" : "hover:bg-white text-theme-text-on-primary"}`}
                      >
                        { child.icon }
                        <span>
                          { child.label }
                        </span>
                      </div>
                    </div>
                  }
                </div>
                
              ))
            }
          </div>
        </CustomPopover.Content>
      </CustomPopover>
    )
  }

  return (
    <div
      className={`my-[2px] w-full flex items-center justify-center p-3 rounded-md cursor-pointer hover:bg-white hover:text-theme-text-hover
        ${active ? "bg-white text-theme-text-hover" : "text-theme-text-on-primary"}
      `}
      onClick={ handleClick }
    >
      { icon }
    </div>
  )
}

function SubItem({ children, active, setActive, icon, parentExpanded }: SidebarSubItems) {
  const { open } = useContext(SidebarContext)

  if (!parentExpanded && open) return null

  return (
    <div
      className={`pl-10 py-1 relative
        ${open ? "mx-2 text-theme-text-on-primary" : "px-3"}
      `}
      onClick={ setActive }
    >
      <div className="absolute left-[21.7px] top-0 h-full w-[1px] bg-theme-text-on-primary/40" />
      
      {
        active &&
          <div className="absolute left-[19px] top-[18px] w-2 h-2 rounded-full bg-theme-text-on-primary z-10" />
      }

      <div
        className={`flex items-center gap-3 w-full pl-2 pr-3 py-2 rounded-md text-[16px] cursor-pointer transition-all duration-300 ease-in-out
          ${active ? "bg-white text-theme-text-hover" : "hover:bg-white hover:text-theme-text-hover"}`}
      >
        { icon }
        <span>
          { children }
        </span>
      </div>
    </div>
  )
}

Sidebar.Trigger = Trigger
Sidebar.Content = Content
Sidebar.Body    = Body
Sidebar.Footer  = Footer
Sidebar.Item    = Item
Sidebar.SubItem = SubItem