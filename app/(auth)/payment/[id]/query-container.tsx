'use client'

import { Tabs } from '@com/tabs/tabs'
import { useResponsive } from '@uti/useResponsive'
import { PaymentComponent } from './component-container'
import { useGetReceipt } from '@api/routes/receipt'
import PaymentHistory from './component-history-container'
import { useGetPayments } from '@api/routes/payment'
import { useLoanPayment } from '@sts/useLoanPaymentStore'
import { SkeletonContent } from '@com/index'
import { NoResults } from '@uti/home-utils'
import { useTokenStore } from '@sts/useTokenStore'
import { errorToast } from '@com/index'
import { usePaymentReceipt } from '@sts/useReceiptStore'
import { 
  useState, 
  useEffect 
} from 'react'

type Props = { paymentId: string | undefined }

export function QueryContainer({ paymentId }: Props) {
  const { paymentData }   = useLoanPayment()
  const { setReceipt }    = usePaymentReceipt()
  const { token, logout } = useTokenStore()
  const id = Number(paymentId)

  const {
      data: paymentsData,
      isLoading: paymentsIsLoading,
      isFetching: paymentsIsFetching,
  
      isError: paymentsIsError,
      error: paymentsError
    } = useGetPayments(token, paymentId ? { loan_payment_id: paymentId } : {})
  const {
      data: receiptData,
  
      isError: receiptIsError,
      error: receiptError
    } = useGetReceipt(id, token)
  
  const { isTablet } = useResponsive()
  const [selectedTab, setSelectedTab] = useState('payment')
  const [paymentDetail, setPaymentDetail] = useState<any>(null)
  const numberHistory = paymentDetail || paymentData ? paymentDetail?.payment_history?.length || paymentData?.payment_history.length : 0

  useEffect(() => {
    if (paymentsIsError || receiptIsError) {
      console.log(paymentsError)
      errorToast({
        title: 'Error',
        body: 'Session expired or unexpected error. Please sign in again',
        duration: 5000,
      })
      logout()
    }
  }, [paymentsIsError, paymentsError, receiptError, receiptIsError, logout])
    
  useEffect(() => {
    if (receiptData) { setReceipt(receiptData) }
  }, [receiptData, setReceipt])

  
  useEffect(() => {
    if (paymentData?.loan_request_id === id) {
      setPaymentDetail(paymentData)
    } else if (paymentsData?.results && paymentsData.results.length > 0) {
      setPaymentDetail(paymentsData.results[0])
    } else {
      setPaymentDetail(null)
    }
  }, [paymentData, id, paymentsData])

  return (
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
                { paymentsIsLoading || paymentsIsFetching ? (
                  <SkeletonContent />
                ) : paymentDetail ? (
                  <PaymentComponent
                    paymentDetails={ paymentDetail }
                    paymentId={paymentId }
                  />
                ) : (
                  <NoResults 
                    title='Payment'
                    description='No results found'
                  />
                )}
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
                <PaymentHistory
                  paymentDetails={ paymentDetail }
                  id={ id }
                />
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