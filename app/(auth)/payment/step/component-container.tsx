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
  setData: React.Dispatch<React.SetStateAction<[StrategyT, ...StepT[]] | null>>
}

export const ComponentContainer = ({
  data,
  setData,
}: Props) => {
  const initialNodes = generateSerpentineNodes(data)
  const initialEdges = generateEdges(initialNodes)

  return (
    <div className='w-full h-full'>
      <CustomFlow
        initialNodes={ initialNodes }
        initialEdges={ initialEdges }
        setData={ setData }
      />
    </div>
  )
}