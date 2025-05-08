import {
  type Node,
  type Edge,
} from '@xyflow/react'
import {
  StrategyT,
  StepT,
} from '@typ/strategy'
import { type NodeData } from '../elements/node'
import CustomNode from '../elements/node'
import CustomEdge from '../elements/edge'

export const nodeTypes = {
  turbo: CustomNode,
}

export const edgeTypes = {
  turbo: CustomEdge,
}

export const defaultEdgeOptions = {
  type: 'turbo',
  markerEnd: 'edge-circle',
}

export type FlowProps = {
  initialNodes: Node<NodeData>[]
  initialEdges: Edge[]
  setData: React.Dispatch<React.SetStateAction<[StrategyT, ...StepT[]] | null>>
}

export const generateNewNode = (
  id: string,
  x: number,
  y: number,
  nodeData: any,
  title: string,
  type: 'step',
) => {
  return {
    id,
    position: { x, y },
    type: 'turbo',
    data: {
      Data: {
        ...nodeData,
        'method': nodeData.method.name,
        'processor': nodeData.processor.name,
      },
      title,
      type: type as 'step',
    },
  }
}