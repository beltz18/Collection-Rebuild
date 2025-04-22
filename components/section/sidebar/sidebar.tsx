import { Icon } from '@com/icon'
import { useTheme } from '@ctx/themeContext'
import { CustomPopover } from '@com/popover/popover'
import { Tooltip } from '@com/tooltip'
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

function Trigger({ click }: { click: (newState: boolean) => void }) {
  const { open, toggle } = useContext(SidebarContext)
  const { theme } = useTheme()

  return (
    <button
      onClick={() => {
        click(!open)
        toggle(!open)
      }}
      className={`rounded-br-md fixed top-0 left-0 z-50 h-[60px] px-4`}
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
        flex justify-between flex-col transition-all duration-300 pt-14
        ${ open ? 'translate-x-0 w-[17rem]' : '-translate-x-0 w-[60px]' }`
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

function Item({ 
  children, 
  active, 
  expanded, 
  setActive, 
  setExpanded, 
  icon, 
  hasChildren, 
  childItems, 
  activeChild,
}: SidebarItems) {
  const { open } = useContext(SidebarContext)
  const isExpandable = hasChildren && open

  const handleClick = () => {
    if (hasChildren) {
      setExpanded && setExpanded()
    } else {
      setActive && setActive()
    }
  }

  const shouldShowExpanded = expanded && open

  if (open) {
    return (
      <div
        className={`my-[2px] p-3 flex gap-4 text-[18px] rounded-md cursor-pointer 
          transition-all duration-200 ease-in-out hover:bg-white
          ${active && !expanded && "bg-white text-theme-hover-text"}
          ${open && "mx-2"}
        `}
        onClick={handleClick}
      >
        <div className="flex items-center gap-4 w-full">
          {icon}
          <span className="flex-1">{children}</span>
          {isExpandable && (
            <div className="transition-transform duration-300 ease-in-out">
              {shouldShowExpanded ? (
                <ChevronDown size={16} className="transition-transform duration-300 ease-in-out rotate-180" />
              ) : (
                <ChevronRight size={16} className="transition-transform duration-300 ease-in-out" />
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (hasChildren && childItems && childItems.length > 0) {
    return (
      <CustomPopover placement="right" offset={10}>
        <CustomPopover.Trigger>
          <div
            className={`my-[2px] w-full flex items-center justify-center p-3 rounded-md cursor-pointer hover:bg-white hover:text-theme-popover-text
              ${active && "bg-white text-current"}
            `}
          >
            {icon}
          </div>
        </CustomPopover.Trigger>
        <CustomPopover.Content className="py-2 px-1 bg-theme-primary rounded-md shadow-lg min-w-[180px]">
          <div className="mt-1 relative">
            <div className="absolute left-[21.7px] top-0 h-full w-[1px] bg-default-400/40"></div>

            {childItems.map((child, childIdx) => (
              <div className="pl-9 py-1 relative" key={childIdx} onClick={() => child.setActive()}>
                {activeChild === child.label && (
                  <div className="absolute left-[19px] top-[18px] w-2 h-2 rounded-full bg-default-500 z-10"></div>
                )}
                <div
                  className={`flex items-center gap-3 w-full pl-2 pr-3 py-2 rounded-md text-[16px] cursor-pointer transition-all duration-300 ease-in-out hover:text-theme-hover-text text-white
                    ${activeChild === child.label ? "bg-white text-theme-hover-text/70" : "hover:bg-white"}`}
                >
                  {child.icon}
                  <span>{child.label}</span>
                </div>
              </div>
            ))}
          </div>
        </CustomPopover.Content>
      </CustomPopover>
    )
  }

  return (
    <>
      {/* <div className="relative">
        <Tooltip placement="right">
          <Tooltip.Trigger>
            <div
              className={`my-[2px] w-full flex items-center justify-center p-3 rounded-md cursor-pointer hover:bg-white hover:text-theme-hover-text
            ${active && "bg-white text-theme-hover-text"}
          `}
              onClick={handleClick}
            >
              {icon}
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content className="z-[9999] !bg-zinc-900 !text-white shadow-lg">{children}</Tooltip.Content>
        </Tooltip>
      </div> */}
      <div
        className={`my-[2px] w-full flex items-center justify-center p-3 rounded-md cursor-pointer hover:bg-white hover:text-theme-hover-text
          ${active && "bg-white text-theme-hover-text"}
        `}
        onClick={handleClick}
      >
        {icon}
      </div>
    </>
  )
}

function SubItem({ children, active, setActive, icon, parentExpanded }: SidebarSubItems) {
  const { open } = useContext(SidebarContext)

  if (!parentExpanded && open) return null

  return (
    <div
      className={`pl-10 py-1 relative
        ${open ? "mx-2" : "px-3"}
      `}
      onClick={setActive}
    >
      <div className="absolute left-[21.7px] top-0 h-full w-[1px] bg-default-400/40"></div>
      {active && <div className="absolute left-[19px] top-[18px] w-2 h-2 rounded-full bg-default-500 z-10"></div>}
      <div
        className={`flex items-center gap-3 w-full pl-2 pr-3 py-2 rounded-md text-[16px] cursor-pointer transition-all duration-300 ease-in-out
          ${active ? "bg-white text-theme-text/70" : "hover:bg-white"}`}
      >
        {icon}
        <span>{children}</span>
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