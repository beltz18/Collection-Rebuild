import { Heading, Icon, Input } from '@com/index'
import { Search } from 'lucide-react'
import { useResponsive } from '@uti/useResponsive'
import { Button } from '@heroui/button'
import { CustomPopover } from '@com/popover/popover'
import { ChangeEvent, useState } from 'react'
import { CustomSelect } from '@com/select/select'
import { FiltersProps, MenuPaymentProps } from './menuPayment.types'
import { PaymentProcessorDrawer } from '../drawer/drawer'

const styleSelect = {
  trigger: 'h-10 min-h-10',
  label: 'text-xs m-0',
  value: 'text-xs m-0',
}

const activeOptions = [
  { key: 'true', label: 'Yes' },
  { key: 'false', label: 'No' },
  { key: 'null', label: 'Both' },
]

const processorType = [
  { key: 'debit', label: 'Debit' },
  { key: 'credit', label: 'Credit' },
  { key: 'both', label: 'Both' },
]

const secCodes = [
  { key: 'ppd', label: 'PPD' },
  { key: 'cdd', label: 'CDD' },
  { key: 'web', label: 'WEB' },
  { key: 'tel', label: 'TEL' },
  { key: 'pop', label: 'POP' },
  { key: 'arc', label: 'ARC' },
  { key: 'boc', label: 'BOC' },
  { key: 'rck', label: 'RCK' },
  { key: 'icl', label: 'ICL' },
  { key: 'icl2', label: 'ICL2' },
  { key: 'rtp', label: 'RTP' },
]

const useSameDayAch = [
  { key: 'true', label: 'Yes' },
  { key: 'false', label: 'No' },
  { key: 'null', label: 'Both' },
]

const uniqueNames = [
  { key: 'Loan Payment Pro', label: 'Loan Payment Pro' },
  { key: 'Payliance', label: 'Payliance' },
  { key: 'Usio', label: 'Usio' },
]

const Filters = ({ filters, setFilters, onApplyFilters }: FiltersProps) => {
  return (
    <>
      <CustomSelect
        classNames={ styleSelect }
        values={ activeOptions }
        label='Status'
        placeholder='Select Status'
        selectedKeys={ filters.status ? [filters.status] : [] }
        onChange={(item: ChangeEvent<HTMLSelectElement>) =>
          setFilters((prev) => ({
            ...prev,
            status: item.target.value,
          }))
        }
      />

      <CustomSelect
        classNames={ styleSelect }
        values={ processorType }
        label='Processor Type'
        placeholder='Select Processor Type'
        selectedKeys={ filters.processorType ? [filters.processorType] : [] }
        onChange={(item: ChangeEvent<HTMLSelectElement>) =>
          setFilters((prev) => ({
            ...prev,
            processorType: item.target.value,
          }))
        }
      />

      <CustomSelect
        classNames={ styleSelect }
        values={ secCodes }
        label='SEC Code'
        placeholder='Select SEC Code'
        selectedKeys={ filters.secCodes ? [filters.secCodes] : [] }
        onChange={(item: ChangeEvent<HTMLSelectElement>) =>
          setFilters((prev) => ({
            ...prev,
            secCodes: item.target.value,
          }))
        }
      />

      <CustomSelect
        classNames={ styleSelect }
        values={ useSameDayAch }
        label='Use Same Day ACH'
        placeholder='Select Use Same Day ACH'
        selectedKeys={ filters.useSameDayAch ? [filters.useSameDayAch] : [] }
        onChange={(item: ChangeEvent<HTMLSelectElement>) =>
          setFilters((prev) => ({
            ...prev,
            useSameDayAch: item.target.value,
          }))
        }
      />

      <CustomSelect
        classNames={ styleSelect }
        values={ uniqueNames }
        label='Select Unique Name'
        placeholder='Select Unique Name'
        selectedKeys={ filters.uniqueNames ? [filters.uniqueNames] : [] }
        onChange={(item: ChangeEvent<HTMLSelectElement>) =>
          setFilters((prev) => ({
            ...prev,
            uniqueNames: item.target.value,
          }))
        }
      />

      <Button
        className='flex justify-center items-center w-full'
        color='primary'
        onPress={ onApplyFilters }
      >
        Apply Filters
      </Button>

      <Button
        className='flex justify-center items-center w-full'
        variant='flat'
        color='danger'
        onPress={() =>
          setFilters({
            status: '',
            processorType: '',
            secCodes: '',
            useSameDayAch: '',
            uniqueNames: '',
          })
        }
      >
        Reset Filters
      </Button>
    </>
  )
}

export default function MenuPayment({
  title = 'Title Placeholder',
  selectedCount = 0,
  filters,
  setFilters,
  applyFilters,
  input,
  setInput,
}: MenuPaymentProps) {
  const { isMobile, isTablet } = useResponsive()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"view" | "edit" | "add">("view")
  const [selectedProcessor, setSelectedProcessor] = useState<any>(null)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleOpenDrawer = (mode: "view" | "edit" | "add", processor: any = null) => {
    setViewMode(mode)
    setSelectedProcessor(processor)
    setIsDrawerOpen(true)
    console.log("Opening processor drawer with mode:", mode)
  }

  const handleSave = (processor: any) => {
    console.log("Processor saved:", processor)
  }

  const isViewDisabled = selectedCount !== 1
  const isDeleteDisabled = selectedCount === 0

  if (!isTablet) {
    return (
      <div className='w-full flex flex-col justify-between items-center gap-3'>
        <div className='w-full flex flex-row justify-between'>
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

          <Button
            className='flex justify-center items-center'
            color='primary'
            onPress={ () => handleOpenDrawer("add", null) }
          >
            <Icon icon='plus' size='sm' />
            Add New
          </Button>
        </div>

        <div className='flex flex-row justify-between w-full items-center gap-3'>
          <div className='w-[300] h-[32px] relative flex items-center'>
            <Input
              type='text'
              size='sm'
              placeholder='Search...'
              startContent={ <Search className='text-default-400' size={ 18 } /> }
              value={ input ?? '' }
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className='flex flex-row justify-end items-center gap-2 w-full'>
            <Button
              className='flex justify-center items-center'
              variant='bordered'
              color='danger'
            >
              <Icon icon='eraser' size='sm' />
              Clear Applied Filters
            </Button>

            <Button
              className='flex justify-center items-center'
              color='primary'
              isDisabled={ isViewDisabled }
            >
              <Icon icon='eye' size='sm' />
              View Details
            </Button>

            <Button
              className='flex justify-center items-center'
              variant='ghost'
              color='danger'
              isDisabled={ isDeleteDisabled }
            >
              <Icon icon='trash' size='sm' />
              Deactivate { selectedCount > 0 && `(${selectedCount})` }
            </Button>

            <CustomPopover placement='bottom-end'>
              <CustomPopover.Trigger>
                <Button
                  className='flex justify-center items-center'
                  variant='bordered'
                >
                  <Icon icon='sliders' size='sm' />
                  Filters
                </Button>
              </CustomPopover.Trigger>

              <CustomPopover.Content className='bg-theme-background p-3 shadow-md rounded-lg flex flex-col gap-2 w-52'>
                <Filters
                  filters={ filters }
                  setFilters={ setFilters }
                  onApplyFilters={ applyFilters }
                />
              </CustomPopover.Content>
            </CustomPopover>
          </div>
        </div>

        <PaymentProcessorDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          isViewMode={viewMode}
          processor={selectedProcessor}
          onSave={handleSave}
        />
      </div>
    )
  }

  return (
    <div className='w-full flex flex-col justify-between gap-2 relative'>
      <div className='w-full flex flex-row justify-between'>
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

          <Button
            className='flex justify-center items-center'
            color='primary'
            onPress={ () => handleOpenDrawer("add", null) }
          >
          <Icon icon='plus' size='sm' />
          Add New
        </Button>
      </div>

      <div className='flex flex-row justify-between items-center gap-2'>
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
            <Button
              className='flex justify-center items-center w-full'
              variant='bordered'
              color='danger'
            >
              <Icon icon='eraser' size='sm' />
              Clear Applied Filters
            </Button>

            <Button
              className='flex justify-center items-center w-full'
              color='primary'
              isDisabled={ isViewDisabled }
            >
              <Icon icon='eye' size='sm' />
              View Details
            </Button>

            <Button
              className='flex justify-center items-center w-full'
              variant='ghost'
              color='danger'
              isDisabled={ isDeleteDisabled }
            >
              <Icon icon='trash' size='sm' />
              Deactivate { selectedCount > 0 && `(${selectedCount})` }
            </Button>

            <CustomPopover placement={isMobile ? 'top-start' : 'left-end'}>
              <CustomPopover.Trigger>
                <Button
                  className='flex justify-center items-center w-full'
                  variant='bordered'
                >
                  <Icon icon='sliders' size='sm' />
                  Filters
                </Button>
              </CustomPopover.Trigger>

              <CustomPopover.Content className='bg-theme-background p-3 shadow-md rounded-lg flex flex-col gap-2 w-52'>
                <Filters
                  filters={ filters }
                  setFilters={ setFilters }
                  onApplyFilters={ applyFilters }
                />
              </CustomPopover.Content>
            </CustomPopover>
          </CustomPopover.Content>
        </CustomPopover>
      </div>

      <PaymentProcessorDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        isViewMode={viewMode}
        processor={selectedProcessor}
        onSave={handleSave}
      />
    </div>
  )
}