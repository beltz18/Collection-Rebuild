import {
  Dispatch,
  SetStateAction,
} from 'react'
import {
  StrategyT,
  StepT,
} from '@typ/strategy'
import {
  generateEdges,
  generateSerpentineNodes,
} from '@uti/lib'
import { Flow as CustomFlow } from '@sec/flow/flow'

type Props = {
  data: [StrategyT, ...StepT[]]
  setData: Dispatch<SetStateAction<[StrategyT, ...StepT[]] | null>>
  setValue: Dispatch<SetStateAction<string | number | null>>
}

export const ComponentContainer = ({
  data,
  setData,
  setValue,
}: Props) => {
  const initialNodes = generateSerpentineNodes(data)
  const initialEdges = generateEdges(initialNodes)

  return (
    <div className='w-full h-full'>
      <CustomFlow
        initialNodes={ initialNodes }
        initialEdges={ initialEdges }
        setData={ setData }
        setValue={ setValue }
      />
    </div>
  )
}