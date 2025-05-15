'use client'

import { Tabs } from '@com/tabs/tabs'
import { useResponsive } from '@uti/useResponsive'
import { LoanComponent } from './component-container'
import { sampleLoanData } from './mock/mock-data'
import { useGetLoans } from '@api/routes/loan'
import { useTokenStore } from '@sts/useTokenStore'
import { useLoanPayment } from '@sts/useLoanPaymentStore'
import { errorToast } from '@com/index'
import { SkeletonContent } from '@com/index'
import { NoResults } from '@uti/home-utils'
import { 
  useState, 
  useEffect 
} from 'react'

type Props = { loanId: string | undefined }

export const QueryContainer = ({ loanId }: Props) => {
  const { loanData } = useLoanPayment()
  const { token, logout } = useTokenStore()
  const id = Number(loanId)
  const {
    data,
    isLoading,
    isFetching,

    isError,
    error
  } = useGetLoans(token, loanId ? { loan_request_id: loanId } : {})

  const { isTablet } = useResponsive()
  const [loanDetail, setLoanDetail] = useState<any>(null)

  useEffect(() => {
    if (isError) {
      console.log(error)
      errorToast({
        title: 'Error',
        body: 'Session expired or unexpected error. Please sign in again',
        duration: 5000,
      })
      logout()
    }
  }, [isError, error, logout])
  
  useEffect(() => {
    if (loanData?.loan_request_id === id) {
      setLoanDetail(loanData)
    } else if (data?.results && data.results.length > 0) {
      setLoanDetail(data.results[0])
    } else {
      setLoanDetail(null)
    }
  }, [loanData, id, data])

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
            {isLoading || isFetching ? (
              <SkeletonContent />
            ) : loanDetail ? (
              <LoanComponent
                about={sampleLoanData.about}
                services={sampleLoanData.services}
                statistics={sampleLoanData.statistics}
                loanDetails={loanDetail}
                loandId={loanId}
              />
            ) : (
              <NoResults 
                title='Loan'
                description='No results found'
              />
            )}
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