"use client"

import { useState } from "react"
import { Button } from "@heroui/react"
import { StrategyDrawer } from "../../elements"
import { Plus } from "lucide-react"
import { exampleStrategy } from "../../mock/mock-data"

export default function StrategyDrawerExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"view" | "edit" | "add">("view")
  const [selectedStrategy, setSelectedStrategy] = useState<any>(exampleStrategy)

  const handleOpenDrawer = (mode: "view" | "edit" | "add", strategy: any = null) => {
    setViewMode(mode)
    setSelectedStrategy(strategy)
    setIsOpen(true)
  }

  const handleSave = (strategy: any) => {
    console.log("Strategy saved:", strategy)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Payment Strategy Management</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <Button
          color="primary"
          className="bg-[#023047]"
          onPress={() => handleOpenDrawer("add", null)}
          startContent={<Plus size={16} />}
        >
          Add New Strategy
        </Button>

        <Button color="default" variant="bordered" onPress={() => handleOpenDrawer("view", exampleStrategy)}>
          View Example Strategy
        </Button>

        <Button color="secondary" onPress={() => handleOpenDrawer("edit", exampleStrategy)}>
          Edit Example Strategy
        </Button>
      </div>

      <div className="bg-default-50 p-6 rounded-lg border border-default-200">
        <h2 className="text-lg font-semibold mb-4">Current Strategy</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-default-500">Name</p>
            <p className="font-medium">{exampleStrategy.name}</p>
          </div>
          <div>
            <p className="text-sm text-default-500">Status</p>
            <p className="font-medium">{exampleStrategy.active ? "Active" : "Inactive"}</p>
          </div>
          <div>
            <p className="text-sm text-default-500">Company</p>
            <p className="font-medium">{exampleStrategy.company}</p>
          </div>
          <div>
            <p className="text-sm text-default-500">Store</p>
            <p className="font-medium">{exampleStrategy.branch}</p>
          </div>
          <div>
            <p className="text-sm text-default-500">Days Before Due</p>
            <p className="font-medium">{exampleStrategy.days_before_due}</p>
          </div>
          <div>
            <p className="text-sm text-default-500">Strict Mode</p>
            <p className="font-medium">{exampleStrategy.strict_mode ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>

      <StrategyDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isViewMode={viewMode}
        strategy={selectedStrategy}
        onSave={handleSave}
      />
    </div>
  )
}