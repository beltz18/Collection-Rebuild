import { Heading, Icon, Input } from '@com/index'
import { Search } from 'lucide-react'
import { useResponsive } from '@uti/useResponsive'
import { Button } from '@heroui/button'
import { CustomPopover } from '@com/popover/popover'
import { ChangeEvent, useState } from 'react'
import { CustomSelect } from '@com/select/select'
import { FiltersProps, MenuPaymentProps } from './menuPayment.types'
import { StrategyDrawer } from '../drawer/drawer'

const styleSelect = {
  trigger: 'h-10 min-h-10',
  label: 'text-xs m-0',
  value: 'text-xs m-0',
}

const activeOptions = [
  { key: 'true', label: 'Active' },
  { key: 'false', label: 'Inactive' },
]

const defaultOptions = [
  { key: 'true', label: 'Yes' },
  { key: 'false', label: 'No' },
]

const strictModeOptions = [
  { key: 'true', label: 'Yes' },
  { key: 'false', label: 'No' },
]

const companyOptions = [
  { key: '1', label: 'Company A' },
  { key: '2', label: 'Company B' },
  { key: '3', label: 'Company C' },
]

const branchOptions = [
  { key: '101', label: 'Branch X' },
  { key: '102', label: 'Branch Y' },
  { key: '103', label: 'Branch Z' },
]

const daysBeforeDueOptions = [
  { key: '1', label: '1 day before' },
  { key: '3', label: '3 days before' },
  { key: '7', label: '7 days before' },
]

const Filters = ({ filters, setFilters, onApplyFilters }: FiltersProps) => {
  return (
    <>
      <CustomSelect
        classNames={styleSelect}
        values={activeOptions}
        label='Status'
        placeholder='Select Status'
        selectedKeys={filters.status ? [filters.status] : []}
        onChange={(item: ChangeEvent<HTMLSelectElement>) =>
          setFilters((prev) => ({
            ...prev,
            status: item.target.value,
          }))
        }
      />

      <CustomSelect
        classNames={styleSelect}
        values={defaultOptions}
        label='Processor Type'
        placeholder='Select Processor Type'
        selectedKeys={filters.default ? [filters.default] : []}
        onChange={(item: ChangeEvent<HTMLSelectElement>) =>
          setFilters((prev) => ({
            ...prev,
            default: item.target.value,
          }))
        }
      />

      <CustomSelect
        classNames={styleSelect}
        values={companyOptions}
        label='SEC Code'
        placeholder='Select SEC Code'
        selectedKeys={filters.company_id ? [filters.company_id] : []}
        onChange={(item: ChangeEvent<HTMLSelectElement>) =>
          setFilters((prev) => ({
            ...prev,
            company_id: item.target.value,
          }))
        }
      />

      <CustomSelect
        classNames={styleSelect}
        values={branchOptions}
        label='Use Same Day ACH'
        placeholder='Select Use Same Day ACH'
        selectedKeys={filters.branch_id ? [filters.branch_id] : []}
        onChange={(item: ChangeEvent<HTMLSelectElement>) =>
          setFilters((prev) => ({
            ...prev,
            branch_id: item.target.value,
          }))
        }
      />

      <CustomSelect
        classNames={styleSelect}
        values={daysBeforeDueOptions}
        label='Select Unique Name'
        placeholder='Select Unique Name'
        selectedKeys={
          filters.days_before_due_to_start
            ? [filters.days_before_due_to_start]
            : []
        }
        onChange={(item: ChangeEvent<HTMLSelectElement>) =>
          setFilters((prev) => ({
            ...prev,
            days_before_due_to_start: item.target.value,
          }))
        }
      />

      <CustomSelect
        classNames={styleSelect}
        values={strictModeOptions}
        label='Select Unique Name'
        placeholder='Select Unique Name'
        selectedKeys={filters.strict_mode ? [filters.strict_mode] : []}
        onChange={(item: ChangeEvent<HTMLSelectElement>) =>
          setFilters((prev) => ({
            ...prev,
            strict_mode: item.target.value,
          }))
        }
      />

      <Button
        className='flex justify-center items-center w-full'
        color='primary'
        onPress={onApplyFilters}
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
            default: '',
            company_id: '',
            branch_id: '',
            days_before_due_to_start: '',
            strict_mode: '',
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
}: MenuPaymentProps) {
  const { isTablet } = useResponsive()
  const [isOpen, setIsOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"view" | "edit" | "add">("view")
  const [selectedStrategy, setSelectedStrategy] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleOpenDrawer = (mode: "view" | "edit" | "add", strategy: any = null) => {
    setViewMode(mode)
    setSelectedStrategy(strategy)
    setIsOpen(true)
    console.log("Opening drawer with mode:", mode, "isOpen set to:", true)
  }

  const handleSave = (strategy: any) => {
    console.log("Strategy saved:", strategy)
  }

  const isViewDisabled = selectedCount !== 1
  const isDeleteDisabled = selectedCount === 0

  if (!isTablet) {
    return (
      <div className='w-full flex flex-col justify-between items-center gap-3'>
        <div className='w-full flex flex-row justify-between'>
          {title && (
            <Heading level={1} className='text-theme-text-title/60 text-2xl'>
              {title}
            </Heading>
          )}
          <Button 
            className='flex justify-center items-center' 
            color='primary' 
            onPress={ () => handleOpenDrawer("add") }
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
              startContent={<Search className='text-default-400' size={18} />}
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
              onPress={handleRefresh}
              isDisabled={isRefreshing}
            >
              <Icon
                icon='refreshCw'
                size='sm'
                className={isRefreshing ? 'animate-spin' : ''}
              />
              Refresh
            </Button>

            <Button
              className='flex justify-center items-center'
              color='primary'
              isDisabled={isViewDisabled}
            >
              <Icon icon='eye' size='sm' />
              View Details
            </Button>

            <Button
              className='flex justify-center items-center'
              variant='ghost'
              color='danger'
              isDisabled={isDeleteDisabled}
            >
              <Icon icon='trash' size='sm' />
              Deactivate {selectedCount > 0 && `(${selectedCount})`}
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
                  filters={filters}
                  setFilters={setFilters}
                  onApplyFilters={applyFilters}
                />
              </CustomPopover.Content>
            </CustomPopover>
          </div>
        </div>

        <StrategyDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          isViewMode={viewMode}
          strategy={selectedStrategy}
          onSave={handleSave}
        />
      </div>
    )
  }

  return (
    <div className='w-full flex flex-col justify-between gap-2 relative'>
      <div className='w-full flex flex-row justify-between'>
        {title && (
          <Heading level={1} className='text-theme-text-title/60 text-2xl'>
            {title}
          </Heading>
        )}
        <Button 
          className='flex justify-center items-center' 
          color='primary' 
          onPress={ () => handleOpenDrawer("add") }
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
            endContent={
              <Icon icon='search' className='text-default-400' size='md' />
            }
          />
        </div>

        <CustomPopover
          placement='bottom-end'
          isOpen={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
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
              onPress={handleRefresh}
              isDisabled={isRefreshing}
            >
              <Icon
                icon='refreshCw'
                size='sm'
                className={isRefreshing ? 'animate-spin' : ''}
              />
              Refresh
            </Button>

            <Button
              className='flex justify-center items-center w-full'
              color='primary'
              isDisabled={isViewDisabled}
            >
              <Icon icon='eye' size='sm' />
              View Details
            </Button>

            <Button
              className='flex justify-center items-center w-full'
              variant='ghost'
              color='danger'
              isDisabled={isDeleteDisabled}
            >
              <Icon icon='trash' size='sm' />
              Deactivate {selectedCount > 0 && `(${selectedCount})`}
            </Button>
            <CustomPopover placement='left'>
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
                  filters={filters}
                  setFilters={setFilters}
                  onApplyFilters={applyFilters}
                />
              </CustomPopover.Content>
            </CustomPopover>
          </CustomPopover.Content>
        </CustomPopover>
      </div>

      <StrategyDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isViewMode={viewMode}
        strategy={selectedStrategy}
        onSave={handleSave}
      />
    </div>
  )
}