import {
  type Node,
  type Edge,
} from '@xyflow/react'
import { type NodeData } from './node'

export const initialNodes: Node<NodeData>[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: {
      type: 'step',
      Data: {
        method: 'ACH',
        processor: 'Payliance',
        attemps: 3,
        order: 1,
        status: 'active',
      },
    },
    type: 'turbo',
  },
  {
    id: '2',
    position: { x: 250, y: 0 },
    data: {
      type: 'step',
      Data: {
        method: 'ACH',
        processor: 'Payliance',
        attemps: 3,
        order: 2,
        status: 'active',
      },
    },
    type: 'turbo',
  },
  {
    id: '3',
    position: { x: 0, y: 250 },
    data: {
      type: 'step',
      Data: {
        method: 'ACH',
        processor: 'Payliance',
        attemps: 3,
        order: 3,
        status: 'active',
      },
    },
    type: 'turbo',
  },
  {
    id: '4',
    position: { x: 250, y: 250 },
    data: {
      type: 'step',
      Data: {
        method: 'ACH',
        processor: 'Payliance',
        attemps: 3,
        order: 4,
        status: 'active',
      },
    },
    type: 'turbo',
  },
  {
    id: '5',
    position: { x: 500, y: 125 },
    data: {
      type: 'step',
      Data: {
        method: 'ACH',
        processor: 'Payliance',
        attemps: 3,
        order: 5,
        status: 'active',
      },
    },
    type: 'turbo',
  },
  {
    id: '6',
    position: { x: 750, y: 125 },
    data: {
      title: 'Strategy 1',
      type: 'strategy',
      Data: {
        company: 'Bank of America',
        store: 'Main Street',
        strict: true,
        status: 'active',
        created: '2023-10-01',
        updated: '2023-10-02',
      },
    },
    type: 'turbo',
  },
]

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
  },
  {
    id: 'e2-5',
    source: '2',
    target: '5',
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
  },
]