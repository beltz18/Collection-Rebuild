import { ChangeEventHandler } from 'react'
import { Panel } from '@xyflow/react'
import { CustomSelect } from '@com/select/select'
import { Button } from '@com/index'
import {
  PlusCircle,
  ChevronLeft,
} from 'lucide-react'
import {
  StrategyT,
  StepT,
} from '@typ/strategy'

type RightPanelProps = {
  hasChanges: boolean
  options: { label: string, key: string }[]
  hasBasic: boolean
  onChange: ChangeEventHandler<HTMLSelectElement>
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CustomRightPanel = ({
  hasChanges,
  options,
  hasBasic,
  onChange,
  setIsModalOpen,
}: RightPanelProps) => {
  return (
    <Panel className='flex gap-3' position='top-right'>
      {
        hasChanges && (
          <Button
            type='button'
            placeholder='Save Changes'
            variant='bordered'
            color='secondary'
            className='rounded-md text-xs h-[48px] font-medium z-50 bg-theme-text-default text-theme-background'
            onPress={() => console.log('saving...')}
          />
        )
      }

      <CustomSelect
        values={ options }
        label='Theme'
        onChange={ onChange }
        size='sm'
        className='w-[120px] text-theme-text-default'
      />

      {
        !hasBasic && (
          <Button
            type='button'
            placeholder='Add Step'
            variant='bordered'
            color='secondary'
            className='rounded-md text-xs h-[48px] font-medium z-50 bg-theme-background text-theme-text-title'
            startContent={ <PlusCircle size={ 14 } /> }
            onPress={() => setIsModalOpen(true)}
          />
        )
      }
    </Panel>
  )
}

type LeftPanelProps = {
  setData: React.Dispatch<React.SetStateAction<[StrategyT, ...StepT[]] | null>>
  clearData: VoidFunction
}

export const CustomLeftPanel = ({
  setData,
  clearData,
}: LeftPanelProps) => {
  return (
    <Panel position='top-left'>
      <div
        className='bg-theme-background text-theme-text-title rounded-md flex items-center justify-center gap-2 w-[80px] h-[48px] text-sm cursor-pointer hover:bg-theme-text-on-primary hover:text-theme-primary hover:border'
        onClick={() => {
          setData(null)
          clearData()
        }}
      >
        <ChevronLeft size={ 14 } />
        Back
      </div>
    </Panel>
  )
}