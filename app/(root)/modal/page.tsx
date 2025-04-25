"use client"

import { useState } from "react"
import { Button } from "@heroui/react"
import AddNodeModal from "@sec/flow/modal/add"

export default function ModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nodes, setNodes] = useState<any[]>([])

  const handleAddNode = (nodeData: any) => {
    setNodes([...nodes, { id: `node-${nodes.length + 1}`, data: nodeData }])
    setIsModalOpen(false)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Custom Modal Example</h1>

      <div className="p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add Node Modal</h2>
        <Button color="primary" onPress={() => setIsModalOpen(true)}>
          Open Add Node Modal
        </Button>

        <AddNodeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddNode}
          currentStrategyId="1"
          nextStepOrder={nodes.length + 1}
          strategyName="Default Payment Strategy"
        />

        {nodes.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Added Nodes:</h3>
            <div className="space-y-2">
              {nodes.map((node) => (
                <div key={node.id} className="p-3 border rounded-md">
                  <p className="font-medium">{node.data.label}</p>
                  <p className="text-sm text-gray-600">{node.data.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}