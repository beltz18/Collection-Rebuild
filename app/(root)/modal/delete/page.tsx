"use client"

import { useState } from "react"
import { Button } from "@com/index"
import DeleteConfirmationModal from "@sec/flow/modal/payment-delete"

export default function CustomizedDeleteModalExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCount, setSelectedCount] = useState(1)

  const handleConfirm = () => {
    console.log(`Deleted ${selectedCount} users`)
  }

  return (
    <div className="p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Customized Delete Modal Example</h1>

      <div className="flex gap-4">
        <Button
          color="danger"
          onPress={() => {
            setSelectedCount(1)
            setIsOpen(true)
          }}
          placeholder="Delete One"
        >
          Delete One User
        </Button>

        <Button
          color="danger"
          onPress={() => {
            setSelectedCount(5)
            setIsOpen(true)
          }}
          placeholder="Delete Multiple"
        >
          Delete Multiple
        </Button>
      </div>

      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedCount={selectedCount}
        onConfirm={handleConfirm}
        title="Delete"
        actionText="delete"
        entityName="user"
      />
    </div>
  )
}