import {
  useState,
  useEffect,
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
  type OnConnect,
  type ColorMode,
} from '@xyflow/react'
import {
  errorToast,
  successToast,
} from '@com/index'
import {
  FlowProps,
  nodeTypes,
  edgeTypes,
  defaultEdgeOptions,
} from './util/util'
import {
  CustomRightPanel,
  CustomLeftPanel,
} from './elements/panel'
import AddNodeModal from './modal/add'
import { generateNewNode } from './util/util'
import { useNodesChanged } from './util/checkNodes'
import { Line } from './elements/line'
import { useTheme } from '@ctx/themeContext'
import { useFlowStore } from '@sts/useFlowStore'
import { useTokenStore } from '@sts/useTokenStore'
import { useCreateNewStep } from '@api/routes/step'
import { ContextMenu } from './elements/contextMenu'

export const Flow = ({
  initialNodes,
  initialEdges,
  setData,
}: FlowProps) => {
  const { strategy, clearData } = useFlowStore()
  const { flowTheme, setFlowTheme } = useTheme()
  const { token } = useTokenStore()

  const addNewStep = useCreateNewStep(token)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [colorMode, setColorMode] = useState<ColorMode>(flowTheme)
  const [hasChanges, setHasChanges] = useState<boolean>(false)

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const hasNodeChanged = useNodesChanged(nodes)

  useEffect(() => {
    if (hasNodeChanged) setHasChanges(true)
  }, [nodes])

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((els) =>
      addEdge(params, els)),
    []
  )

  const handleAddNode = (nodeData: any) => {
    const id = String(Number(nodes[nodes.length-1].id)+1)

    const newNode = generateNewNode(
      id, Number(nodes[nodes.length-1].position.x)+250,
      Number(nodes[nodes.length-1].position.y), nodeData, '', 'step'
    )

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

        <CustomLeftPanel
          setData={ setData }
          clearData={ clearData }
        />

        <CustomRightPanel
          hasChanges={ hasChanges }
          onChange={ onChange }
          options={ options }
          setIsModalOpen={ setIsModalOpen }
        />
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