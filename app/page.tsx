'use client'

import { CustomCheckbox } from '@com/checkbox/checkbox'
import { CustomSelect } from '@com/select/select'
import { CustomSwitch } from '@com/switch/switch'
import { Sidebar } from '@sec/index'

export default function App() {
  const items = ['item1', 'item2', 'item3']
  return (
    <>
      <Sidebar>
        <Sidebar.Toggle />
        <Sidebar.Content>
          <Sidebar.Header>Head</Sidebar.Header>

          <Sidebar.Body>
            <Sidebar.Item active>Home</Sidebar.Item>
            <Sidebar.Item>About</Sidebar.Item>
            <Sidebar.Item>Contact</Sidebar.Item>
          </Sidebar.Body>

          <Sidebar.Footer>Logout</Sidebar.Footer>
        </Sidebar.Content>
      </Sidebar>
      <div className='flex flex-col w-full justify-center items-center'>
        <CustomSwitch defaultSelected={false}>{'perro'}</CustomSwitch>
        <CustomCheckbox defaultSelected={false}>{'perro'}</CustomCheckbox>
        <CustomSelect label='Favorite Animal' placeholder='Select an animal' itemsSelect={items} />
      </div>
    </>
  )
}
