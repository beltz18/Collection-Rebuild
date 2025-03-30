import { useState } from 'react'
import { Sidebar } from '@sec/index'
import { options } from '@uti/consts'
import { LayoutProps } from './layout.types'

export const DefaultLayout = ({ children }: LayoutProps) => {
  const [active, setActive] = useState<string>("Home")

  return (
    <>
      <div>
        <Sidebar>
          <Sidebar.Toggle />
          
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
        
        { children }
      </div>
    </>
  )
}