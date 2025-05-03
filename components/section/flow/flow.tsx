import '@xyflow/react/dist/base.css'

import {
  useCallback,
  useState,
  ChangeEventHandler,
} from 'react'
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Panel,
  type Node,
  type Edge,
  type OnConnect,
  type ColorMode,
} from '@xyflow/react'
import { type NodeData } from './elements/node'
import { Line } from './elements/line'
import { CustomSelect } from '@com/select/select'
import { PlusCircle } from 'lucide-react'
import AddNodeModal from './modal/add'
import { Button } from '@com/index'
import { useTheme } from '@ctx/themeContext'

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

type Props = {
  initialNodes: Node<NodeData>[]
  initialEdges: Edge[]
}

export const Flow = ({
  initialNodes,
  initialEdges,
}: Props) => {
  const { flowTheme, setFlowTheme } = useTheme()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [colorMode, setColorMode] = useState<ColorMode>(flowTheme)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((els) =>
      addEdge(params, els)),
    []
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

  const options = [
    { label: 'dark', key: 'dark' },
    { label: 'light', key: 'light' },
  ]

  const onChange : ChangeEventHandler<HTMLSelectElement> = (e) => {
    setColorMode(e.target.value as ColorMode)
    setFlowTheme(e.target.value as ColorMode)
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
        <Line />

        <Panel className='flex gap-3' position="top-right">
          <CustomSelect
            values={ options }
            label='Theme'
            onChange={ onChange }
            size='sm'
            className='w-[120px] text-theme-text-default'
          />
          
          <Button
            type='button'
            placeholder='Add Step'
            variant='bordered'
            color='secondary'
            className='rounded-md text-xs h-[48px] font-medium z-50 bg-theme-background text-theme-text-title'
            startContent={ <PlusCircle size={ 14 } /> }
            onPress={() => setIsModalOpen(true)}
          />
        </Panel>
      </ReactFlow>

      <AddNodeModal
        isOpen={ isModalOpen }
        onClose={() => setIsModalOpen(false)}
        onAdd={ handleAddNode }
        currentStrategyId='1'
        nextStepOrder={ nodes.length + 1 }
        strategyName='Default Payment Strategy'
      />
    </>
  )
}