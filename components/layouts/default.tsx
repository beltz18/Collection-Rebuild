import { useState } from 'react'
import { Sidebar } from '@sec/index'
import { options } from '@uti/consts'
import { LayoutProps } from './layout.types'
import { Navbar } from '@sec/index'
import { Footer } from '@sec/index'

export const DefaultLayout = ({ children }: LayoutProps) => {
  const [active, setActive] = useState<string>("Home")
  const [open, setOpen] = useState<boolean>(true)

  return (
    <>
      <div className='flex h-screen w-full'>
        <div className={`${ open ? 'w-[17rem]' : 'w-[60px]'}`}>
          <Sidebar>
            <Sidebar.Trigger click={ setOpen } />
            
            <Sidebar.Content>
              <Sidebar.Body>
                {
                  options.up.map(({ Icon, label, url }, idx) => (
                    <Sidebar.Item
                      key={ idx }
                      active={ active === label }
                      icon={ Icon }
                      setActive={() => setActive(label)}
                    >
                      { label }
                    </Sidebar.Item>

                  ))
                }
              </Sidebar.Body>
              
              <Sidebar.Footer>
                {
                  options.down.map(({ Icon, label, url }, idx) => (
                    <Sidebar.Item
                      key={ idx }
                      active={ active === label }
                      icon={ Icon }
                      setActive={() => setActive(label)}
                    >
                      { label }
                    </Sidebar.Item>

                  ))
                }
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