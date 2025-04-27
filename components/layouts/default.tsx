import Link from 'next/link'
import { useState } from 'react'
import { Sidebar } from '@sec/index'
import { options } from '@uti/consts'
import { LayoutProps } from './layout.types'
import { Navbar } from '@sec/index'
import { Footer } from '@sec/index'
import { ThemeSelector } from '@sec/theme-popover'
import { useSidebarStore } from '@sts/useSidebarStore'
import { useTokenStore } from '@sts/useTokenStore'
import {
  CompItem,
  CompSubItem,
} from './elements/element-sidebar'

export const DefaultLayout = ({ children }: LayoutProps) => {
  const {
    activeTab,
    activeChildrenTab,
    setActiveTab,
    setActiveChildrenTab,
    setActiveChildrenIndex,
    open,
    setOpen,
    clear,
  } = useSidebarStore()
  const { logout } = useTokenStore()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (label: string) =>
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))

  const isExpanded = (label: string) => expandedItems.includes(label) && open

  const handleSidebarToggle = (newOpenState: boolean) => {
    setOpen(newOpenState)
    if (!newOpenState)
      setExpandedItems([])
  }

  return (
    <div className='flex h-screen w-full'>
      <div className={`${ open ? 'w-[17rem]' : 'w-[60px]'} z-50`}>
        <Sidebar>
          <Sidebar.Trigger click={ handleSidebarToggle } />
          
          <Sidebar.Content>
            <Sidebar.Body>
              {
                options.up.map(({ Icon, label, url, children }, idx) => (
                  <div key={ idx }>
                    {
                      url
                        ?
                      <Link href={ url }>
                        <CompItem
                          activeTab={ activeTab }
                          label={ label }
                          isExpanded={ isExpanded }
                          Icon={ Icon }
                          setActiveTab={ setActiveTab }
                          children={ children }
                          setActiveChildrenTab={ setActiveChildrenTab }
                          setActiveChildrenIndex={ setActiveChildrenIndex }
                          toggleExpanded={ toggleExpanded }
                        />
                      </Link>
                        :
                      <CompItem
                        activeTab={ activeTab }
                        label={ label }
                        isExpanded={ isExpanded }
                        Icon={ Icon }
                        setActiveTab={ setActiveTab }
                        children={ children }
                        setActiveChildrenTab={ setActiveChildrenTab }
                        setActiveChildrenIndex={ setActiveChildrenIndex }
                        toggleExpanded={ toggleExpanded }
                      />
                    }

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out relative ${
                        isExpanded(label) && children?.length
                          ? 'max-h-[500px] opacity-100 transform-gpu py-1'
                          : 'max-h-0 opacity-0 transform-gpu'
                      }`}
                    >
                      {
                        children?.map((child, childIdx) => (
                          <div key={`${idx}-${childIdx}`}>
                            {
                              child.url
                                ?
                              <Link href={ child.url }>
                                <CompSubItem
                                  activeChildrenTab={ activeChildrenTab }
                                  child={ child }
                                  setActiveTab={ setActiveTab }
                                  label={ label }
                                  setActiveChildrenTab={ setActiveChildrenTab }
                                  isExpanded={ isExpanded }
                                />
                              </Link>
                                :
                              <CompSubItem
                                activeChildrenTab={ activeChildrenTab }
                                child={ child }
                                setActiveTab={ setActiveTab }
                                label={ label }
                                setActiveChildrenTab={ setActiveChildrenTab }
                                isExpanded={ isExpanded }
                              />
                            }
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </Sidebar.Body>

            <Sidebar.Footer>
              {
                options.down.map(({ Icon, label }, idx) => {
                  if (label === 'Themes') {
                    return (
                      <ThemeSelector
                        key={ idx }
                        placementOpen={ open }
                      >
                        <div>
                          <Sidebar.Item
                            active={ activeTab === label }
                            icon={ Icon }
                          >
                            { label }
                          </Sidebar.Item>
                        </div>
                      </ThemeSelector>
                    )
                  }

                  return (
                    <Sidebar.Item
                      key={ idx }
                      active={ activeTab === label }
                      icon={ Icon }
                      setActive={() => {
                        clear()
                        logout()
                      }}
                    >
                      { label }
                    </Sidebar.Item>
                  )
                })
              }
            </Sidebar.Footer>
          </Sidebar.Content>
        </Sidebar>
      </div>
      
      <div className={`flex flex-col translate-x-0 z-0
        ${open ? 'w-[calc(100%-17rem)]' : 'w-[calc(100%-60px)]'}
      `}>
        <Navbar />

        <main className='w-full overflow-y-auto overflow-x-hidden'>
          { children }
        </main>

        <Footer />
      </div>
    </div>
  )
}