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
import {
  useUpdateStepsPosition,
  useUpdateStrategyPosition,
} from '@api/routes/step'
import AddNodeModal from './modal/add'
import { generateNewNode } from './util/util'
import { useNodesChanged } from './util/checkNodes'
import { Line } from './elements/line'
import { useTheme } from '@ctx/themeContext'
import { useFlowStore } from '@sts/useFlowStore'
import { useTokenStore } from '@sts/useTokenStore'
import { useCreateNewStep } from '@api/routes/step'
import { ContextMenu } from './elements/contextMenu'
import { ModalTypeProps } from './elements/types'
import { ManagerModals } from './modal/manager-modals'
import { Node } from '@xyflow/react'
import { NodeData } from './elements/node'
import { isEqual } from 'radash'
import { StepT } from '@typ/strategy'

export const Flow = ({
  initialNodes,
  initialEdges,
  setValue,
  setData,
}: FlowProps) => {
  const { strategy, steps, clearData } = useFlowStore()
  const { flowTheme, setFlowTheme } = useTheme()
  const { token } = useTokenStore()

  const addNewStep = useCreateNewStep(token)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalUpdateData, setModalUpdateData] = useState<boolean>(false)

  const [modalType, setModalType] = useState<ModalTypeProps | null>(null)
  const [indexStep, setIndexStep] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<'step' | 'strategy' | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [colorMode, setColorMode] = useState<ColorMode>(flowTheme)

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

  const updateStep = useUpdateStepsPosition(token)
  const updateStrategy = useUpdateStrategyPosition(token)

  const handleSubmitNewPositions = async (nodes: Node<NodeData>[]) => {
    setModalUpdateData(true)

    if (!isEqual(initialNodes, nodes)) {
      for (let idx = 0; idx < nodes.length; idx++) {
        if (nodes[idx].data.type === 'step') {
          const node = nodes[idx].data.Data as StepT
          const stepId = node?.id

          if (stepId && node) {
            try {
              const r = await updateStep(
                stepId,
                {
                  id: node.id,
                  strategy: node.strategy,
                  method: Number(steps?.find((e) => e.id == node.id)?.method),
                  processor: Number(steps?.find((e) => e.id == node.id)?.processor),
                  admin_config: {
                    position: {
                      x: nodes[idx].position.x,
                      y: nodes[idx].position.y,
                    }
                  },
                }
              )
              if (r.data) setIndexStep(idx)
            } catch (err) {
              console.error(`Failed to update step ${stepId}`, err)
            }
          }
        } else if (nodes[idx].data.type === 'strategy') {
          if (strategy) {
            try {
              await updateStrategy(
                strategy?.id,
                {
                  name: strategy?.name,
                  admin_config: {
                    position: {
                      x: nodes[0].position.x,
                      y: nodes[0].position.y,
                    }
                  },
                }
              )
            } catch (err) {
              console.error(`Failed to update strategy`, err)
            }
          }
        }
      }
    }

    setModalUpdateData(false)
  }

  return (
    <div className='w-full h-full relative'>
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
          setValue={ setValue }
        />

        <CustomRightPanel
          hasChanges={ hasChanges }
          setHasChanges={ setHasChanges }
          onChange={ onChange }
          options={ options }
          setIsModalOpen={ setIsModalOpen }
          hasBasic={ nodes.find((e) => e.data.Data?.is_basic_step == true) ? true : false  }
          handleSubmit={ handleSubmitNewPositions }
          open={ modalUpdateData }
          setOpen={ setModalUpdateData }
          nodes={ nodes }
          current={ indexStep }
        />
      </ReactFlow>

      <ContextMenu
        setModalType={ setModalType }
        setSelectedType={ setSelectedType }
        setIsOpen={ setIsOpen }
      />

      <ManagerModals
        modalType={ modalType }
        selectedType={ selectedType }
        isOpen={ isOpen }
        setIsOpen={ setIsOpen }
        nodes={ nodes }
        setNodes={ setNodes }
      />

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