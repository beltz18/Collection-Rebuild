import { format } from 'date-fns'
import { useContextMenu } from 'react-contexify'
import { useFlowStore } from '@sts/useFlowStore'
import {
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
          <div className={`cloud bg-green-600`} />

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

const CompStep = (data: any) => {
  return (
    <div className='w-full flex flex-col text-[8px]'>
      <div className='w-full flex items-center justify-between'>
        <b>Method:</b>
        <span>{ data.data.method }</span>
      </div>
      
      <div className='w-full flex items-center justify-between'>
        <b>Processor:</b>
        <span>{ data.data.processor }</span>
      </div>
      
      <div className='w-full flex items-center justify-between'>
        <b>Attemps:</b>
        <span>{ data.data.attempts }</span>
      </div>
      
      <div className='w-full flex items-center justify-between'>
        <b>Order:</b>
        <span>{ data.data.order }</span>
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