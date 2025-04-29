import {
  StrategyT,
  StepT,
} from '@typ/strategy'
import { Edge } from '@xyflow/react'

export const generateEdges = (data: [StrategyT, ...StepT[]]): Edge[] => {
  const edges: Edge[] = []

  for (let i = 0; i < data.length - 1; i++) {
    const source = String(data[i].id)
    const target = String(data[i + 1].id)

    edges.push({
      id: `ed-str-steps-${source}-${target}`,
      source,
      target,
    })
  }

  return edges
}