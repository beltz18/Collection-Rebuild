'use client'

import { Button } from '@heroui/react'
import { Edit2 } from 'lucide-react'
import { CustomDrawer } from '@com/drawer'
import StrategyForm from './form'
import { Strategy } from './types'
import { StrategyDrawerProps } from './types'
import { ScrollShadow } from '@heroui/scroll-shadow'
import { useResponsive } from '@uti/useResponsive'
import { useTokenStore } from '@sts/useTokenStore'
import { useQueryClient } from '@tanstack/react-query'
import { CACHE_KEYS } from '@api/cache'
import { useSelected } from '@sts/useSelectedStore'
import { 
  usePostStrategies, 
  useUpdateStrategies 
} from '@api/routes/strategy'
import {
  useState,
  useEffect,
} from 'react'
import {
  errorToast,
  successToast,
} from '@com/index'

export function StrategyDrawer({
  isOpen,
  onClose,
  isViewMode,
  strategy,
}: StrategyDrawerProps) {
  const { isMobile } = useResponsive()
  const [formData, setFormData] = useState<Strategy>({
    name: '',
    active: true,
    company: 0,
    branch: 0,
    company_id: '',
    branch_id: '',
    days_before_due_to_start: 0,
    strict_mode: false,
    default: true,
  })
  
  const data = Array.isArray(strategy) && strategy.length > 0 ? strategy[0] : null
  const { selectedCells } = useSelected()
  const queryClient = useQueryClient()
  const { token } = useTokenStore()
  const auth = usePostStrategies(token)
  const update = useUpdateStrategies(token, selectedCells[0]?.id)
  const { isPending, isSuccess } = auth

  const [isEditing, setIsEditing] = useState(isViewMode === 'add')
  
  useEffect(() => {
    if (strategy && Array.isArray(strategy) && strategy.length > 0) {
      const [firstItem] = strategy
      if (firstItem && typeof firstItem === 'object') {
        setFormData((prev) => ({
          ...prev,
          ...firstItem,
          company: firstItem.company || 0,
          branch: firstItem.branch || 0,
          company_id: firstItem.company_id ?? '',
          branch_id: firstItem.branch_id ?? '',
        }))
      }
    } else {
      setFormData({
        name: '',
        active: true,
        company: 0,
        branch: 0,
        company_id: '',
        branch_id: '',
        days_before_due_to_start: 0,
        strict_mode: false,
        default: true,
      })
    }

    setIsEditing(isViewMode === 'add' || isViewMode === 'edit')
    console.log('strategy ', selectedCells[0]?.id)
  }, [strategy, isViewMode])

  useEffect(() => {
    setFormData(prevData => ({...prevData}))
  }, [formData.company_id, formData.branch_id])

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }))
    console.log(formData);
  }

  const handleUpdate = async () => { 
    try {
      if (selectedCells[0]?.id) {
        const data = {
          ...formData,
          days_before_due_to_start: formData.days_before_due_to_start?.toString(),
        }

        const r = await update.mutateAsync(data)
        console.log(r);
        if (r.message === 'Payment strategy partially updated successfully') {
          queryClient.refetchQueries({ queryKey: [CACHE_KEYS.getStrategies] })
          successToast({
            title: 'Done!',
            body: 'Updated strategy data',
          })

          setTimeout(() => {
            onClose()
          }, 1000)
        } else {
          errorToast({
            title: 'Error',
            body: 'Something wrong happened...',
          })
        }
      } else {
        errorToast({
          title: 'Error',
          body: 'There was an error getting the id of this strategy',
        })
      }
    } catch (err) {
      console.log(err)
      errorToast({
        title: 'Error',
        body: 'Strategy could not be updated',
      })
    }
  }

  const handleSave = async () => {
    if (!formData.name) {
      errorToast({
        title: 'Error',
        body: 'Name can not be empty',
      })
    } else {
      try {
        const r = await auth.mutateAsync({
          ...formData,
          days_before_due_to_start:
            formData.days_before_due_to_start?.toString(),
        })

        if (r && r.message == 'Payment strategy created successfully') {
          queryClient.refetchQueries({ queryKey: [CACHE_KEYS.getStrategies] })
          successToast({
            title: 'Success!',
            body: 'Payment strategy created successfully!',
          })

          setTimeout(() => { onClose() }, 1000)
        } else {
          errorToast({
            title: 'Error',
            body: 'We could not validate you',
          })
        }
      } catch (err: unknown) {
        if (err instanceof Error && (err as any)?.response?.data) {
          errorToast({
            title: 'Error',
            body: (err as any).response.data.message,
          })
        } else console.log(err)
      }
    }
  }

  const handleEdit = () => { setIsEditing(!isEditing) }

  const handleCancel = () => {
    if (strategy) setFormData(data)
    setIsEditing(false)
    if (isViewMode === 'add') onClose()
  }

  const footerContent = isViewMode === "add" ? (
    <div className='flex justify-end gap-2 w-full'>
      <Button
        color='danger'
        variant='light'
        onPress={ handleCancel }
      >
        Cancel
      </Button>

      <Button 
        color='primary' 
        className='bg-[#023047]' 
        onPress={ handleSave }
        disabled={ isPending }
        isLoading={ isPending && !isSuccess }
      >
        Save
      </Button>
    </div>
  ) : isViewMode === "view" && (
    <div className='flex justify-end gap-2 w-full'>
      <Button
        color='danger'
        variant='light'
        onPress={ onClose }
      >
        Close
      </Button>

      { 
        isEditing ? (
          <Button 
            color='primary' 
            className='bg-[#023047]' 
            onPress={ handleUpdate }
            disabled={ isPending }
            isLoading={ isPending && !isSuccess }
          >
            Save
          </Button>
        ) : (
          <Button
            color='primary'
            className='bg-[#023047]'
            onPress={ handleEdit }
          >
            Edit
          </Button>
        )
      }
    </div>
  )

  return (
    <CustomDrawer
      isOpen={ isOpen }
      onClose={ onClose }
      placement='right'
      size='lg'
      className={`${isMobile ? 'w-full p-4' : 'max-w-[60%] p-6'}`}
      headerClassName='py-0 px-0'
      bodyClassName='p-0 h-full'
      title={
        <h2 className='text-xl font-bold'>
          {
            isViewMode === 'add'
              ?
            'Add Payment Strategy'
              :
            'Payment Strategy Details'
          }
        </h2>
      }
      footer={ footerContent }
    >
      {
        isViewMode === 'view' && (
          <div className='w-full'>
            <Button
              color='primary'
              onPress={ handleEdit }
              className='gap-3 bg-[#023047]'
            >
              <Edit2 size={ 12 } />
              Enable Edit Mode
            </Button>
          </div>
        )
      }

      <ScrollShadow
        hideScrollBar
        className='w-full'
        offset={ 100 }
        orientation='horizontal'
      >
        <div className='w-full'>
          <StrategyForm
            formData={ formData }
            updateFormData={ updateFormData }
            isViewMode={ !isEditing }
          />
        </div>
      </ScrollShadow>
    </CustomDrawer>
  )
}