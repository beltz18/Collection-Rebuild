'use client'

import AuthLayout from '../../layout'
import { DefaultLayout } from '@lay/default'
import { Tabs } from '@com/tabs/tabs'
import { useResponsive } from '@uti/useResponsive'
import { PaymentComponent } from './component-container'
import { mockData } from './mock/mock-data'
import { useState } from 'react'
import { Status } from '@typ/payment-status'

export default function PaymentIdPage() {
  const { isTablet } = useResponsive()
  const [selectedTab, setSelectedTab] = useState('payment')
  const numberHistory = 2

  return (
    <AuthLayout>
      <DefaultLayout>
        <div className={`p-4 relative ${isTablet ? 'w-full h-full' : 'w-full h-full'}`}>
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            classNames={{ 
              tabList: `${!isTablet ? 'sticky top-2 overflow-y-auto' : 'max-w-screen overflow-x-auto'}`,
              base: `${!isTablet ? '' : 'sticky top-0 flex justify-center items-center'}`,
              tab: "data-[selected=true]:text-red-400 font-medium",
              tabContent: "data-[selected=true]:text-green-400",
            }}
            color='primary'
            className={isTablet ? 'bg-theme-background py-2 w-full' : 'bg-theme-background p-2 justify-center'}
            placement={isTablet ? 'top' : 'start'}
            variant={isTablet ? 'bordered' : 'underlined'}
          >
            <Tabs.Tab key='payment' title='Payment' className={`bg-theme-background ${isTablet ? '' : 'w-full min-h-full'}`}>
              <div className={isTablet ? '' : 'h-full w-full'}>
                <PaymentComponent 
                  {...{
                    ...mockData.paymentDetails,
                    payment_status: {
                      ...mockData.paymentDetails.payment_status,
                      unique_description: mockData.paymentDetails.payment_status.unique_description as Status,
                    },
                  }} 
                />
              </div>
            </Tabs.Tab>
            <Tabs.Tab 
              key='history' 
              title={
                <div className='flex flex-row justify-center items-center gap-2'>
                  History
                  <div className={`
                    w-4 h-4
                    ${
                      selectedTab === 'history' 
                      ? 'bg-theme-primary rounded-full text-theme-text-on-primary font-bold text-[9px]' 
                      : ''
                    }
                    ${
                      selectedTab !== 'history' 
                      ? 'text-theme-text-default' 
                      : ''
                    }
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