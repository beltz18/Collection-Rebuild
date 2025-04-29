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
}

export const ComponentContainer = ({ data }: Props) => {
  const initialNodes = generateSerpentineNodes(data)
  const initialEdges = generateEdges(initialNodes)

  return (
    <div className='w-full h-full'>
      <CustomFlow
        initialNodes={ initialNodes }
        initialEdges={ initialEdges }
      />
    </div>
  )
}