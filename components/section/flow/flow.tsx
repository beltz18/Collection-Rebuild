import '@xyflow/react/dist/base.css'

import {
  useCallback,
  useState,
} from 'react'
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  type OnConnect,
  type ColorMode,
} from '@xyflow/react'
import {
  initialNodes,
  initialEdges,
} from './elements/data'

import CustomNode from './elements/node'
import CustomEdge from './elements/edge'

const nodeTypes = {
  turbo: CustomNode,
}

const edgeTypes = {
  turbo: CustomEdge,
}

const defaultEdgeOptions = {
  type: 'turbo',
  markerEnd: 'edge-circle',
}

export const Flow = () => {
  const [colorMode, setColorMode] = useState<ColorMode>('dark')
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [],
  )

  return (
    <ReactFlow
      nodes={ nodes }
      edges={ edges }
      onNodesChange={ onNodesChange }
      onEdgesChange={ onEdgesChange }
      onConnect={ onConnect }
      fitView
      minZoom={ 0 }
      nodeTypes={ nodeTypes }
      edgeTypes={ edgeTypes }
      defaultEdgeOptions={ defaultEdgeOptions }
      colorMode={ colorMode }
    >
      <MiniMap />
      <Controls showInteractive={ false } />
      <svg>
        <defs>
          <linearGradient id='edge-gradient'>
            <stop offset='0%' stopColor='#ae53ba' />
            <stop offset='100%' stopColor='#2a8af6' />
          </linearGradient>

          <marker
            id='edge-circle'
            viewBox='-5 -5 10 10'
            refX='0'
            refY='0'
            markerUnits='strokeWidth'
            markerWidth='10'
            markerHeight='10'
            orient='auto'
          >
            <circle stroke='#2a8af6' strokeOpacity='0.75' r='2' cx='0' cy='0' />
          </marker>
        </defs>
      </svg>
    </ReactFlow>
  )
}