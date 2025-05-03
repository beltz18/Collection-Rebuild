'use client'

import { Tabs } from '@com/tabs/tabs'
import { useResponsive } from '@uti/useResponsive'
import { LoanComponent } from './component-container'
import { sampleLoanData } from './mock/mock-data'

export const Wrapper = () => {
  const { isTablet } = useResponsive()
  
  return (
    <div className={`relative bg-theme-background ${isTablet ? 'w-full h-full' : 'w-full h-full'}`}>
      <Tabs
        classNames={{ tabList: `${!isTablet ? 'sticky top-2 overflow-y-auto' : 'max-w-screen overflow-x-auto'}`, base: `${!isTablet ? '' : 'sticky top-0 flex justify-center items-center'}`}}
        color='primary'
        className={isTablet ? 'bg-theme-background py-2 w-full' : 'bg-theme-background p-2 justify-center'}
        placement={isTablet ? 'top' : 'start'}
        variant={isTablet ? 'bordered' : 'underlined'}
      >
        <Tabs.Tab key='loan' title='Loan' className={`bg-theme-background ${isTablet ? '' : 'w-full min-h-full'}`}>
          <div className={isTablet ? '' : 'h-full w-full'}>
            <LoanComponent
              about={ sampleLoanData.about }
              services={ sampleLoanData.services }
              statistics={ sampleLoanData.statistics }
              loanDetails={ sampleLoanData.loanDetails }
            />
          </div>
        </Tabs.Tab>

        <Tabs.Tab key='payments' title='Payments' className={`bg-theme-background ${isTablet ? '' : 'w-full h-full'}`}>
          <div className={isTablet ? 'h-full w-full' : 'min-h-full w-full'}>
            <p>payments</p>
          </div>
        </Tabs.Tab>

        <Tabs.Tab key='settings' title='Settings' className={`bg-theme-background ${isTablet ? '' : 'w-full h-full'}`}>
          <div className={isTablet ? 'h-full w-full' : 'h-full w-full'}>
            <p>settings</p>
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}