import { memo } from 'react'
import { format } from 'date-fns'
import {
  Handle,
  Position,
  type Node,
  type NodeProps,
} from '@xyflow/react'

export type NodeData = {
  title?: string
  Data?: any
  type: 'step' | 'strategy'
}

export default memo (({
  data: {
    title,
    type,
    Data,
  }
}: NodeProps<Node<NodeData>>) => {
  return (
    <>
      <div className='fixed flex-row-reverse top-[-7.5px] z-50 flex items-center justify-between w-full'>
        <div className={`cloud bg-green-600`} />

        <div className='text-[10px] px-2.5 text-black/70 border-[.1px] bg-white rounded-full'>
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
  console.log(data)
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