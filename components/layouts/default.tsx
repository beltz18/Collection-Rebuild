import Link from 'next/link'
import { useState, useRef } from 'react'
import { Sidebar } from '@sec/index'
import { options } from '@uti/consts'
import { LayoutProps } from './layout.types'
import { Navbar } from '@sec/index'
import { Footer } from '@sec/index'
import { ThemeSelector } from '@sec/theme-popover'

export const DefaultLayout = ({ children }: LayoutProps) => {
  const [active, setActive] = useState<string>("Home")
  const [open, setOpen] = useState<boolean>(true)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [activeChildIndex, setActiveChildIndex] = useState<number>(0)

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  const isExpanded = (label: string) => expandedItems.includes(label) && open

  const handleSidebarToggle = (newOpenState: boolean) => {
    setOpen(newOpenState)
    if (!newOpenState) {
      setExpandedItems([])
    }
  }

  return (
    <>
      <div className='flex h-screen w-full'>
        <div className={`${ open ? 'w-[17rem]' : 'w-[60px]'}`}>
          <Sidebar>
            <Sidebar.Trigger click={ handleSidebarToggle } />
            
            <Sidebar.Content>
              <Sidebar.Body>
                {options.up.map(({ Icon, label, url, children }, idx) => (
                  <div key={idx}>
                    <Sidebar.Item
                      active={active === label && !children}
                      expanded={isExpanded(label)}
                      icon={Icon}
                      setActive={() => setActive(label)}
                      setExpanded={() => toggleExpanded(label)}
                      hasChildren={!!children?.length}
                      childItems={children?.map(child => ({
                        ...child,
                        setActive: () => setActive(child.label)
                      }))}
                      activeChild={active}
                    >
                      {label}
                    </Sidebar.Item>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out relative ${
                        isExpanded(label) && children?.length
                          ? "max-h-[500px] opacity-100 transform-gpu py-1"
                          : "max-h-0 opacity-0 transform-gpu"
                      }`}
                    >
                      {children?.map((child, childIdx) => (
                        <Sidebar.SubItem
                          key={`${idx}-${childIdx}`}
                          active={active === child.label}
                          setActive={() => {
                            setActive(child.label)
                            setActiveChildIndex(childIdx)
                          }}
                          icon={child.Icon}
                          parentExpanded={isExpanded(label)}
                        >
                          {child.label}
                        </Sidebar.SubItem>
                      ))}
                    </div>
                  </div>
                ))}
              </Sidebar.Body>

              <Sidebar.Footer>
                {options.down.map(({ Icon, label, url }, idx) => {
                  if (label === "Themes") {
                    return (
                      <ThemeSelector key={idx} placementOpen={open}>
                        <div onClick={() => setActive(label)}>
                          <Sidebar.Item 
                            active={active === label} 
                            icon={Icon} setActive={() => {}}
                          >
                            {label}
                          </Sidebar.Item>
                        </div>
                      </ThemeSelector>
                    )
                  }

                  return (
                    <Sidebar.Item 
                      key={idx} 
                      active={active === label} 
                      icon={Icon} 
                      setActive={() => setActive(label)}
                    >
                      {label}
                    </Sidebar.Item>
                  )
                })}
              </Sidebar.Footer>
            </Sidebar.Content>
          </Sidebar>
        </div>
        
        <div className='flex-1 flex flex-col w-full translate-x-0'>
          <Navbar />

          <main className="flex-1 overflow-auto p-4">
            { children }
          </main>

          <Footer />
        </div>
      </div>
    </>
  )
}