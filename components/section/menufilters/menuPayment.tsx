import { Heading, Icon, Input } from '@com/index'
import { Search, FilterIcon } from 'lucide-react'
import { useResponsive } from '@uti/useResponsive'
import { Button } from '@heroui/button'
import { CustomPopover } from '@com/popover/popover'
import { useState, useEffect } from 'react'

export default function MenuPayment({ title = 'Title Placeholder', selectedCount = 0 }: { title?: string; selectedCount?: number }) {
  const { isTablet } = useResponsive()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
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
          <Button className='flex justify-center items-center' color='primary'>
            <Icon icon='plus' size='sm' />
            Add New
          </Button>
        </div>
        <div className='flex flex-row justify-between w-full items-center gap-3'>
          <div className='w-[300] h-[32px] relative flex items-center'>
            <Input type='text' size='sm' placeholder='Search...' startContent={<Search className='text-default-400' size={18} />} />
          </div>
          <div className='flex flex-row justify-end items-center gap-2 w-full'>
            <Button className='flex justify-center items-center' variant='bordered' color='danger'>
              <Icon icon='eraser' size='sm' />
              Clear Applied Filters
            </Button>
            <Button className='flex justify-center items-center' color='primary' onPress={handleRefresh} isDisabled={isRefreshing}>
              <Icon icon='refreshCw' size='sm' className={isRefreshing ? 'animate-spin' : ''} />
              Refresh
            </Button>

            <Button className='flex justify-center items-center' color='primary' isDisabled={isViewDisabled}>
              <Icon icon='eye' size='sm' />
              View Details
            </Button>

            <Button className='flex justify-center items-center' variant='ghost' color='danger' isDisabled={isDeleteDisabled}>
              <Icon icon='trash' size='sm' />
              Deactivate {selectedCount > 0 && `(${selectedCount})`}
            </Button>

            <Button className='flex justify-center items-center' variant='bordered'>
              <Icon icon='sliders' size='sm' />
              Filters
            </Button>
          </div>
        </div>
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
        <Button className='flex justify-center items-center' color='primary'>
          <Icon icon='plus' size='sm' />
          Add New
        </Button>
      </div>
      <div className='flex flex-row justify-between items-center gap-2'>
        <div className='max-w-[240px] h-[24px] relative flex items-center'>
          <Input type='text' size='sm' placeholder='Search...' endContent={<Icon icon='search' className='text-default-400' size='md' />} />
        </div>

        <CustomPopover placement='bottom-end' isOpen={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <CustomPopover.Trigger>
            <button>
              <Icon icon='hamburger' className='text-default-400 hover:text-default-600 cursor-pointer' size='lg' />
            </button>
          </CustomPopover.Trigger>
          <CustomPopover.Content className='bg-theme-background p-3 shadow-md rounded-lg flex flex-col gap-2 w-52'>
            <Button className='flex justify-center items-center w-full' variant='bordered' color='danger'>
              <Icon icon='eraser' size='sm' />
              Clear Applied Filters
            </Button>
            <Button className='flex justify-center items-center w-full' color='primary' onPress={handleRefresh} isDisabled={isRefreshing}>
              <Icon icon='refreshCw' size='sm' className={isRefreshing ? 'animate-spin' : ''} />
              Refresh
            </Button>

            <Button className='flex justify-center items-center w-full' color='primary' isDisabled={isViewDisabled}>
              <Icon icon='eye' size='sm' />
              View Details
            </Button>

            <Button className='flex justify-center items-center w-full' variant='ghost' color='danger' isDisabled={isDeleteDisabled}>
              <Icon icon='trash' size='sm' />
              Deactivate {selectedCount > 0 && `(${selectedCount})`}
            </Button>

            <Button className='flex justify-center items-center w-full' variant='bordered'>
              <Icon icon='sliders' size='sm' />
              Filters
            </Button>
          </CustomPopover.Content>
        </CustomPopover>
      </div>
    </div>
  )
}
