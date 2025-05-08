import {
  Loan,
  Payment,
} from '@typ/home-tables'
import {
  Heading,
  Icon,
  Input,
} from '@com/index'
import {
  loanFilterOptions,
  countActiveFilters,
  type LoanFilters,
} from '@com/modal/examples/loan-filter'
import { useState } from 'react'
import { Button } from '@heroui/button'
import { Tabs } from '@com/tabs/tabs'
import { FilterIcon } from 'lucide-react'
import { CustomDropdown } from '@com/dropdown/dropdown'
import { CustomPopover } from '@com/popover/popover'
import { FilterDialog } from '@com/modal/filters'
import { useMenuStoreLoan } from '@sts/useMenuStore'
import { useMenuStorePayment } from '@sts/useMenuStore'

type Props = {
  title?: string
  cells?: Loan[] | Payment[]
  options: number[]
  selected: number
  input: string | null
  setInput: (input: string) => void
  setSelected: React.Dispatch<React.SetStateAction<number>>
  handlerDownload: (title: 'Loan' | 'Payment', data: Loan[] | Payment[], type: 'CSV' | 'PDF') => void
  page: 'Loan' | 'Payment'
}

export const LittleMenu = ({
  title = 'Page',
  cells,
  options,
  selected,
  input,
  setInput,
  setSelected,
  handlerDownload,
  page,
}: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<LoanFilters | null>(null)

  const activeFiltersCount = countActiveFilters(appliedFilters)

  const { selectedCells: dataLoan } = useMenuStoreLoan()
  const { selectedCells: dataPayment } = useMenuStorePayment()

  const handleFiltersApplied = (filters: LoanFilters) => {
    setAppliedFilters(filters)
    setIsFilterModalOpen(false)
  }

  return (
    <div className='w-full flex flex-row justify-between gap-2 relative'>
      {
        title && (
          <Heading
            level={ 1 }
            className='flex-1 text-theme-text-title/60 text-2xl'
          >
            { title }
          </Heading>
        )
      }

      <div className='flex items-center gap-2'>
        <div className='max-w-[240px] h-[24px] relative flex items-center'>
          <Input
            type='text'
            size='sm'
            placeholder='Search...'
            endContent={ <Icon icon='search' className='text-default-400' size='md' /> }
            value={ input ?? '' }
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <CustomPopover
          placement='bottom-end'
          isOpen={ isMobileMenuOpen }
          onOpenChange={ setIsMobileMenuOpen }
        >
          <CustomPopover.Trigger>
            <button>
              <Icon
                icon='hamburger'
                className='text-default-400 hover:text-default-600 cursor-pointer'
                size='lg'
              />
            </button>
          </CustomPopover.Trigger>

          <CustomPopover.Content className='bg-theme-background p-3 shadow-md rounded-lg flex flex-col gap-2 w-52'>
            <Tabs
              variant='solid'
              classNames={{ tabList: 'rounded-lg' }}
            >
              <Tabs.Tab
                title={ <Icon icon='list' size='md' /> }
                className='w-20'
              />

              <Tabs.Tab
                title={ <Icon icon='idCard' size='md' /> }
                className='w-20'
              />
            </Tabs>

            <CustomDropdown>
              <CustomDropdown.Trigger>
                <Button className='flex justify-start ps-10 w-full rounded-lg h-[36]'>
                  <Icon icon='download' size='sm' />
                  Download
                </Button>
              </CustomDropdown.Trigger>

              <CustomDropdown.Menu>
                <CustomDropdown.Item
                  key="pdf"
                  onPress={() => {
                    if (!cells || cells.length === 0) return
                    else handlerDownload(page, page === 'Loan' ? dataLoan : dataPayment, 'PDF')
                  }}
                  className={`text-default-600 hover:bg-default-100 ${!cells || cells.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  PDF
                </CustomDropdown.Item>

                <CustomDropdown.Item
                  key="csv"
                  onPress={() => {
                    if (!cells || cells.length === 0) return
                    else handlerDownload(page, page === 'Loan' ? dataLoan : dataPayment, 'CSV')
                  }}
                  className={`text-default-600 hover:bg-default-100 ${!cells || cells.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  CSV
                </CustomDropdown.Item>
              </CustomDropdown.Menu>
            </CustomDropdown>

            <Button
              className='flex justify-start ps-10 w-full rounded-lg h-[36]'
              onPress={() => {
                setIsFilterModalOpen(true)
                setIsMobileMenuOpen(false)
              }}
            >
              <FilterIcon size={ 14 } />
              Filters { activeFiltersCount > 0 ? `(${activeFiltersCount})` : '' }
            </Button>

            <CustomPopover placement='bottom'>
              <CustomPopover.Trigger>
                <Button className='flex justify-center w-full rounded-lg h-[36]'>
                  <span>Rows: { selected }</span>
                  <Icon icon='chevronDown' size='sm' />
                </Button>
              </CustomPopover.Trigger>

              <CustomPopover.Content className='min-w-[80px] p-1'>
                {
                  options.map((opt) => (
                    <button
                      key={ opt }
                      className={`w-full text-sm p-2 text-left rounded hover:bg-default-100 ${selected === opt ? 'bg-default-100 font-medium' : ''}`}
                      onClick={() => setSelected(opt)}
                    >
                      { opt }
                    </button>
                  ))
                }
              </CustomPopover.Content>
            </CustomPopover>

            <Button
              className='justify-center w-full rounded-lg h-[36]'
              variant='flat'
              color='danger'
              onPress={() => setIsMobileMenuOpen(false)}
            >
              Close
            </Button>
          </CustomPopover.Content>
        </CustomPopover>
      </div>

      <FilterDialog
        isOpen={ isFilterModalOpen }
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={ handleFiltersApplied }
        filterOptions={ loanFilterOptions }
        initialFilters={ appliedFilters || undefined }
      />
    </div>
  )
}
