import {
  type Node,
  type Edge,
} from '@xyflow/react'
import {
  StrategyT,
  StepT,
} from '@typ/strategy'
import { NodeData } from '@sec/flow/elements/node'

export const generateEdges = (nodes: Node<NodeData>[]): Edge[] => {
  const edges: Edge[] = []

  for (let i = 0; i < nodes.length - 1; i++) {
    const source = nodes[i].id
    const target = nodes[i + 1].id

    edges.push({
      id: `e-str-ste-${source}-${target}`,
      source,
      target,
    })
  }

  return edges
}

export const generateSerpentineNodes = (data: (StrategyT | StepT)[]): Node<NodeData>[] => {
  const NODE_WIDTH = 300
  const NODE_HEIGHT = 300
  const GAP_X = 100
  const GAP_Y = 150
  const START_X = 100
  const TOP_Y = 200
  const BOTTOM_Y = TOP_Y + NODE_HEIGHT + GAP_Y

  return data.map((node, idx) => {
    const x = START_X + idx * (NODE_WIDTH + GAP_X)
    const y = idx % 2 === 0 ? TOP_Y : BOTTOM_Y

    return {
      id: String(idx),
      position: {
        x: node.admin_config?.position?.x ?? x,
        y: node.admin_config?.position?.y ?? y,
      },
      data: {
        title: 'name' in node ? node.name : '',
        type: 'name' in node ? 'strategy' : 'step',
        Data: node,
      },
      type: 'turbo',
    }
  })
}