import { format } from 'date-fns'
import { useContextMenu } from 'react-contexify'
import { useFlowStore } from '@sts/useFlowStore'
import { Button } from '@heroui/button'
import { CustomAccordion } from '@com/accordion/accordion'
import { Tooltip } from '@heroui/tooltip'
import { Input } from '@heroui/input'
import { 
  ChevronDown, 
  ChevronUp, 
  Edit2, 
  Check,
} from 'lucide-react'
import {
  useState,
  useEffect,
  memo,
  useRef,
} from 'react'
import {
  StrategyT,
  StepT,
} from '@typ/strategy'
import {
  Handle,
  Position,
  type Node,
  type NodeProps,
} from '@xyflow/react'

export type NodeData = {
  title?: string
  Data?: StrategyT | StepT
  type: 'step' | 'strategy'
}

type Props = {
  type: 'step' | 'strategy'
  isLast: boolean
  isBasic: boolean
  stepsNum: number
}

const getIdFromContext = ({ type, isLast, isBasic, stepsNum }: Props) : string => {
  const ids = {
    defaultStep: 'default-step',
    defaultStrategy: 'default-strategy',
    lastStepBasic: 'last-step-basic',
    lastStepNotBasic: 'last-step-not-basic',
    strategyNoSteps: 'lone-strategy',
  }

  if (type == 'step') {
    if (isLast && !isBasic) return ids.lastStepNotBasic
    else if (isLast && isBasic) return ids.lastStepBasic
    else return ids.defaultStep
  } else if (type == 'strategy') {
    if (stepsNum > 0) return ids.defaultStrategy
    else return ids.strategyNoSteps
  } else return 'default'
}

export default memo (({
  data: {
    title,
    type,
    Data,
  }
}: NodeProps<Node<NodeData>>) => {
  const nodeRef = useRef<HTMLDivElement>(null)
  
  const { show } = useContextMenu()
  const { steps } = useFlowStore()

  const handleItemClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const fakeEvent = {
      clientX: e.clientX-250,
      clientY: e.clientY,
      preventDefault: () => {},
      stopPropagation: () => {},
    } as unknown as React.MouseEvent

    show({
      id: getIdFromContext({
        type,
        isLast: steps && steps[steps?.length-1].id == Data?.id || false,
        isBasic: Data?.is_basic_step || false,
        stepsNum: steps && steps?.length || 0,
      }),
      event: fakeEvent,
      props: {
        id: Data?.id,
        type,
        isBasic: Data?.is_basic_step,
        order: Data?.order,
      },
    })
  }

  return (
    <>
      <div
        ref={ nodeRef }
        onContextMenu={ handleItemClick }
        className='w-full'
      >
        <div className='fixed flex-row-reverse top-[-7.5px] z-50 flex items-center justify-between w-full'>
          <div className={`cloud bg-green-600 rounded-full`} />

          <div className={`${type === 'step' ? 'bg-white text-black/70' : 'bg-theme-text-hover text-theme-text-on-primary'} text-[10px] px-2.5 border-[.1px] rounded-full`}>
            {
              type === 'step'
                ?
              'Step'
                :
              'Strategy'
            }
          </div>

          {
            Data?.order && (
              <div className='flex items-center justify-center border-[.1px] p-2 text-[10px] border-theme-text-hover bg-zinc-400/70 text-white/70 rounded-full w-[12px] h-[12px]'>
                { Data?.order }
              </div>
            )
          }
        </div>

        <div className={`wrapper gradient`}>
          <div className='inner'>
            <div className='body'>
              <>
                {
                  title
                    &&
                  <div className='title capitalize font-bold'>
                    { title }
                  </div>
                }
              </>

              {
                type === 'step'
                  ?
                <CompStep data={{ ...Data }} />
                  :
                <CompStrategy data={{ ...Data }} />
              }
            </div>

            <Handle type='target' position={ Position.Left } />
            <Handle type='source' position={ Position.Right } />
          </div>
        </div>
        
        {
          Data?.is_basic_step && (
            <div className='fixed bottom-[-7.5px] z-50 flex items-center justify-center w-full'>
              <div className='text-[10px] px-2.5 border-[.1px] bg-theme-background text-theme-text-title rounded-full'>
                Basic
              </div>
            </div>
          )
        }
      </div>
    </>
  )
})

const testData = {
  description:
    'This is a sample description for testing purposes. It contains enough text to demonstrate the tooltip functionality when the content is too long to display in the input field.',
  notes:
    'These are sample notes that will be used to test the editing and display functionality of the accordion component.',
}

const CompStep = (data: any) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, string[]>>({})
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(data.data.description || testData.description)
  const [notes, setNotes] = useState(data.data.notes || testData.notes)
  const [wordCount, setWordCount] = useState({
    description: countWords(data.data.description || testData.description),
    notes: countWords(data.data.notes || testData.notes),
  })

  const descriptionRef = useRef<HTMLInputElement>(null)
  const notesRef = useRef<HTMLInputElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)

  const itemKey = `step-${data.data.order || 'unknown'}`

  function countWords(text: string): number {
    return text.trim().split(/\s+/).length
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (isEditing && accordionRef.current && event.target instanceof Node && !accordionRef.current.contains(event.target)) {
      setIsEditing(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing])

  const handleDescriptionChange = (value: string) => {
    if (countWords(value) <= 40) {
      setDescription(value)
      setWordCount((prev) => ({ ...prev, description: countWords(value) }))
    }
  }

  const handleNotesChange = (value: string) => {
    if (countWords(value) <= 40) {
      setNotes(value)
      setWordCount((prev) => ({ ...prev, notes: countWords(value) }))
    }
  }

  const toggleEditMode = () => { setIsEditing(!isEditing) }

  const isExpanded = expandedItems[itemKey]?.includes('details')

  return (
    <div className='w-full flex flex-col text-[8px]'>
      <div className='w-full flex items-center justify-between'>
        <b>Method:</b>
        <span>{data.data.method}</span>
      </div>

      <div className='w-full flex items-center justify-between'>
        <b>Processor:</b>
        <span>{data.data.processor}</span>
      </div>

      <div className='w-full flex items-center justify-between'>
        <b>Attemps:</b>
        <span>{data.data.attempts}</span>
      </div>

      <div className='w-full flex items-center justify-between'>
        <b>Order:</b>
        <span>{data.data.order}</span>
      </div>

      <div className='w-full mt-1'>
        <CustomAccordion
          selectedKeys={expandedItems[itemKey] || []}
          onSelectionChange={(keys) => {
            setExpandedItems((prev) => ({
              ...prev,
              [itemKey]: Array.from(keys) as string[],
            }))

            if (isExpanded && Array.from(keys).length === 0) { setIsEditing(false) }
          }}
          className='w-full p-0'
          hideIndicator
          variant='light'
        >
          <CustomAccordion.Item
            key='details'
            aria-label='Additional Details'
            className='text-[8px] p-0 py-0 w-full'
            classNames={{
              base: 'py-0',
              heading: 'py-0',
              trigger: 'py-0',
              titleWrapper: 'py-0',
              title: 'py-0',
              subtitle: 'py-0',
              startContent: 'py-0',
              indicator: 'py-0',
              content: 'py-0',
            }}
            title={
              <div className='flex items-center justify-center w-full px-2'>
                <div className='flex items-center bg-slate-400/15 p-1 justify-center rounded-md gap-1 text-white'>
                  {isExpanded ? <ChevronUp size={9} /> : <ChevronDown size={9} />}
                </div>
              </div>
            }
          >
            <div ref={accordionRef} className='w-full px-1 flex flex-col justify-start'>
              <div className='flex justify-end mb-1'>
                <Button
                  size='sm'
                  variant='light'
                  className='p-0 h-[14px] min-w-0 w-[14px] flex text-center rounded-[4px] text-white bg-slate-400/10 items-center justify-center'
                  onPress={toggleEditMode}
                >
                  {isEditing ? <Check size={8} /> : <Edit2 size={8} />}
                </Button>
              </div>

              <div className='mb-2'>
                <div className='flex justify-between items-center mb-0.5'>
                  <b>Description:</b>
                  {isEditing && <span className='text-[6px] text-gray-400'>{wordCount.description}/40 words</span>}
                </div>

                {isEditing ? (
                  <Input
                    ref={descriptionRef}
                    value={description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    className='w-full text-white text-[7px]'
                    size='sm'
                    radius='sm'
                    placeholder='Enter description (max 40 words)'
                    classNames={{
                      input: 'text-[7px] text-white p-1',
                      inputWrapper: 'h-[18px] bg-slate-100/10 data-[hover=true]:bg-slate-200/10',
                    }}
                  />
                ) : (
                  <Tooltip content={description} placement='bottom' className='w-[16.50rem]'>
                    <p className='text-[8px] mt-0.5 truncate w-[7.81rem]'>
                      {description || <span className='text-zinc-300/45 italic'>No description available</span>}
                    </p>
                  </Tooltip>
                )}
              </div>

              <div>
                <div className='flex justify-between items-center mb-0.5'>
                  <b>Notes:</b>
                  {isEditing && <span className='text-[6px] text-gray-400'>{wordCount.notes}/40 words</span>}
                </div>

                {isEditing ? (
                  <Input
                    ref={notesRef}
                    value={notes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    className='w-full text-[7px]'
                    size='sm'
                    radius='sm'
                    placeholder='Enter notes (max 40 words)'
                    classNames={{
                      input: 'text-[7px] text-white p-1',
                      inputWrapper: 'h-[18px] bg-slate-100/10 data-[hover=true]:bg-slate-200/10',
                    }}
                  />
                ) : (
                  <Tooltip content={notes} placement='bottom' className='w-[16.50rem]'>
                    <p className='text-[8px] mt-0.5 truncate w-[7.81rem]'>
                      {notes || <span className='text-zinc-300/45 italic'>No notes available</span>}
                    </p>
                  </Tooltip>
                )}
              </div>
            </div>
          </CustomAccordion.Item>
        </CustomAccordion>
      </div>
    </div>
  )
}

const CompStrategy = (data: any) => {
  return (
    <div className='w-full flex flex-col text-[8px]'>
      <div className='w-full flex items-center justify-between'>
        <b>Company:</b>
        <span>
          {
            typeof data.data.company !== 'number'
              ?
            data.data.company ?? 'No company'
              :
            'No company'
          }
        </span>
      </div>
      
      <div className='w-full flex items-center justify-between'>
        <b>Store:</b>
        <span>
          {
            typeof data.data.branch !== 'number'
              ?
            data.data.company ?? 'No store'
              :
            'No store'
          }
        </span>
      </div>
      
      <div className='w-full flex items-center justify-between'>
        <b>Created:</b>
        <span>
          { format(data.data.create_date, 'PP') }
        </span>
      </div>
      
      <div className='w-full flex items-center justify-between'>
        <b>Updated:</b>
        <span>
          { format(data.data.update_date, 'PP') }
        </span>
      </div>
    </div>
  )
}