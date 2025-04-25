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
import { PlusCircle } from 'lucide-react'
import AddNodeModal from './modal/add'
import { Button } from '@com/index'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [colorMode, setColorMode] = useState<ColorMode>('dark')
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [],
  )

  const handleAddNode = (nodeData: any) => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      position: { x: 250, y: 150 },
      type: 'turbo',
      data: nodeData,
    }

    setNodes((prev) => [...prev, newNode])
    setIsModalOpen(false)
  }

  return (
    <>
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

        <div className='w-full flex justify-end pt-3 pr-4'>
          <Button 
            type='button'
            placeholder='Add Step' 
            variant='bordered'
            color='secondary'
            className='rounded-md text-xs font-medium h-8 bg-zinc-300/20 z-[9999]' 
            startContent={ 
              <PlusCircle size={14} /> 
            } 
            onPress={() => {
              console.log('Botón presionado')
              setIsModalOpen(true)
            }}
          />

          
        </div>
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
      
        <AddNodeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddNode}
          currentStrategyId="1"
          nextStepOrder={nodes.length + 1}
          strategyName="Default Payment Strategy"
        />
    </>
  )
}