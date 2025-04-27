'use client'

import AuthLayout from '../../layout'
import { DefaultLayout } from '@lay/default'
import { Tabs } from '@com/tabs/tabs'
import { useResponsive } from '@uti/useResponsive'
import { PaymentComponent } from './component-container'
import { mockData } from './mock/mock-data'
import { useState } from 'react'

export default function PaymentIdPage() {
  const { isTablet } = useResponsive()
  const [selectedTab, setSelectedTab] = useState('payment')
  const numberHistory = 2

  return (
    <AuthLayout>
      <DefaultLayout>
        <div className={`p-4 relative bg-theme-background ${isTablet ? 'w-full h-full' : 'w-full h-full'}`}>
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            classNames={{ 
              tabList: `${!isTablet ? 'sticky top-2 overflow-y-auto' : 'max-w-screen overflow-x-auto'}`,
              base: `${!isTablet ? '' : 'sticky top-0 flex justify-center items-center'}`
            }}
            color='primary'
            className={isTablet ? 'bg-theme-background py-2 w-full' : 'bg-theme-background p-2 justify-center'}
            placement={isTablet ? 'top' : 'start'}
            variant={isTablet ? 'bordered' : 'underlined'}
          >
            <Tabs.Tab key='payment' title='Payment' className={`bg-theme-background ${isTablet ? '' : 'w-full min-h-full'}`}>
              <div className={isTablet ? '' : 'h-full w-full'}>
                <PaymentComponent {...mockData.paymentDetails} />
              </div>
            </Tabs.Tab>
            <Tabs.Tab 
              key='history' 
              title={
                <div className='flex flex-row justify-center items-center gap-0.5'>
                  History
                  <div className={`
                    ${selectedTab === 'history' ? 'bg-theme-primary rounded-full p-1 text-theme-text-on-primary w-6 h-6' : 'w-6 h-6'}
                    ${selectedTab !== 'history' ? 'text-theme-text-default' : ''}
                    flex items-center justify-center
                  `}>
                    {numberHistory}
                  </div>
                </div>
              } 
              className={`bg-theme-background ${isTablet ? '' : 'w-full h-full'}`}
            >
              <div className={isTablet ? 'h-full w-full' : 'min-h-full w-full'}>
                <p>{'History (:^D)'}</p>
              </div>
            </Tabs.Tab>
            <Tabs.Tab key='settings' title='Settings' className={`bg-theme-background ${isTablet ? '' : 'w-full h-full'}`}>
              <div className={isTablet ? 'h-full w-full' : 'h-full w-full'}>
                <p>settings</p>
              </div>
            </Tabs.Tab>
          </Tabs>
        </div>
      </DefaultLayout>
    </AuthLayout>
  )
}