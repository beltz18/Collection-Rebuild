import '@xyflow/react/dist/base.css'

import {
  useState,
  useCallback,
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
import {
  StrategyT,
  StepT,
} from '@typ/strategy'
import { ChevronLeft } from 'lucide-react'
import { NodeData } from './elements/node'
import { Line } from './elements/line'
import { CustomSelect } from '@com/select/select'
import { PlusCircle } from 'lucide-react'
import AddNodeModal from './modal/add'
import { Button, errorToast, successToast } from '@com/index'
import { useTheme } from '@ctx/themeContext'
import { useFlowStore } from '@sts/useFlowStore'
import { useTokenStore } from '@sts/useTokenStore'
import { useCreateNewStep } from '@api/routes/step'
import { ContextMenu } from './elements/contextMenu'

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
  setData: React.Dispatch<React.SetStateAction<[StrategyT, ...StepT[]] | null>>
}

export const Flow = ({
  initialNodes,
  initialEdges,
  setData,
}: Props) => {
  const { strategy, clearData } = useFlowStore()
  const { flowTheme, setFlowTheme } = useTheme()
  const { token } = useTokenStore()
  const addNewStep = useCreateNewStep(token)

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
    const id = String(Number(nodes[nodes.length-1].id)+1)

    const newNode = {
      id,
      position: {
        x: Number(nodes[nodes.length-1].position.x)+250,
        y: Number(nodes[nodes.length-1].position.y),
      },
      type: 'turbo',
      data: {
        Data: {
          ...nodeData,
          'method': nodeData.method.name,
          'processor': nodeData.processor.name,
        },
        title: '',
        type: 'step' as 'step',
      },
    }

    const newEdge = {
      id: `e-str-ste-${nodes[nodes.length-1].id}-${id}`,
      source: String(nodes[nodes.length-1].id),
      target: String(id),
    }

    try {
      const d = addNewStep.mutateAsync({
        ...nodeData,
        'method': nodeData.method.id,
        'processor': nodeData.processor.id,
      })
      console.log(d)
      setNodes((prev) => [...prev, newNode])
      setEdges((prev) => [...prev, newEdge])
      successToast({
        title: 'Succes!',
        body: 'New step created',
      })
    } catch (err) {
      console.log(err)
      errorToast({
        title: 'Error',
        body: 'Step could not be created',
      })
    }
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
    <div className="w-full h-full relative">
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

        <Panel position='top-left'>
          <div
            className='bg-theme-background text-theme-text-title rounded-md flex items-center justify-center gap-2 w-[80px] h-[48px] text-sm cursor-pointer hover:bg-theme-text-on-primary hover:text-theme-primary hover:border'
            onClick={() => {
              setData(null)
              clearData()
            }}
          >
            <ChevronLeft size={ 14 } />
            Back
          </div>
        </Panel>

        <Panel className='flex gap-3' position='top-right'>
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

      <ContextMenu />

      <AddNodeModal
        isOpen={ isModalOpen }
        onClose={() => setIsModalOpen(false)}
        onAdd={ handleAddNode }
        currentStrategyId={ strategy?.id ?? 0 }
        nextStepOrder={ Number(nodes[nodes.length-1].data.Data?.order)+1 }
        strategyName={ strategy?.name ?? '' }
      />
    </div>
  )
}