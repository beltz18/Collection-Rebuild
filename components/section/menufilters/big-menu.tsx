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
  Search,
  FilterIcon,
} from 'lucide-react'
import {
  loanFilterOptions,
  countActiveFilters,
  type LoanFilters,
} from '@com/modal/examples/loan-filter'
import { useState } from 'react'
import { Tabs } from '@com/tabs/tabs'
import { CustomDropdown } from '@com/dropdown/dropdown'
import { CustomPopover } from '@com/popover/popover'
import { FilterDialog } from '@com/modal/filters'

type Props = {
  title?: string
  cells?: Loan[] | Payment[]
  options: number[]
  selected: number
  setSelected: React.Dispatch<React.SetStateAction<number>>
}

export const BigMenu = ({
  title = 'Page',
  cells,
  options,
  selected,
  setSelected,
}: Props) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<LoanFilters | null>(null)

  const activeFiltersCount = countActiveFilters(appliedFilters)

  const handleFiltersApplied = (filters: LoanFilters) => {
    setAppliedFilters(filters)
    setIsFilterModalOpen(false)
  }

  return (
    <div className='w-full flex justify-between items-center gap-3'>
      {
        title && (
          <Heading
            level={ 1 }
            className='text-theme-text-title/60 text-2xl'
          >
            { title }
          </Heading>
        )
      }

      <div className='flex items-center gap-3'>
        <div className='w-[180px] h-[32px] relative flex items-center'>
          <Input
            type='text'
            size='sm'
            placeholder='Search...'
            endContent={ <Search className='text-default-400' size={ 18 } /> }
          />
        </div>

        <Tabs variant='solid'>
          <Tabs.Tab title={<Icon icon='list' size='md' />} />
          <Tabs.Tab title={<Icon icon='idCard' size='md' />} />
        </Tabs>

        <CustomDropdown>
          <CustomDropdown.Trigger>
            <button className='bg-theme-background rounded-xl p-2'>
              <Icon icon='download' size='md' />
            </button>
          </CustomDropdown.Trigger>

          <CustomDropdown.Menu className='min-w-[120px]'>
            <CustomDropdown.Item
              key='pdf'
              onPress={() => {
                if (!cells || cells.length === 0)
                  return
              }}
              className={`text-default-600 hover:bg-default-100 ${!cells || cells.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              PDF
            </CustomDropdown.Item>

            <CustomDropdown.Item
              key='csv'
              onPress={() => {
                if (!cells || cells.length === 0)
                  return
              }}
              className={`text-default-600 hover:bg-default-100 ${!cells || cells.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              CSV
            </CustomDropdown.Item>
          </CustomDropdown.Menu>
        </CustomDropdown>

        <div className='relative inline-flex'>
          <FilterIcon
            size={24}
            onClick={() => setIsFilterModalOpen(true)}
            className='text-default-400 hover:text-default-600 cursor-pointer'
          />
          {
            activeFiltersCount > 0 && (
              <span className='absolute -top-2 -right-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-theme-text-hover px-[6px] text-[10px] font-bold text-white'>
                {activeFiltersCount}
              </span>
            )
          }
        </div>

        <CustomPopover placement='bottom'>
          <CustomPopover.Trigger>
            <button className='flex items-center text-default-400 text-sm gap-1'>
              Rows: { selected }
              <Icon icon='chevronDown' size='sm' />
            </button>
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