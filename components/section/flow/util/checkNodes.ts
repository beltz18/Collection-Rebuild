import { useRef, useEffect, useState } from 'react'
import { type Node } from '@xyflow/react'
import { type NodeData } from '../elements/node'
import { isEqual } from 'radash'

const cleanNodes = (nodes: Node<NodeData>[]) =>
  nodes.map(({ id, position }) => ({ id, position }))

export const useNodesChanged = (nodes: Node<NodeData>[]) => {
  const prev = useRef(cleanNodes(nodes))
  const [hasChanged, setHasChanged] = useState(false)

  useEffect(() => {
    const current = cleanNodes(nodes)
    const changed = !isEqual(prev.current, current)

    if (changed) {
      setHasChanged(true)
      prev.current = current
    } else {
      setHasChanged(false)
    }
  }, [nodes])

  return hasChanged
}