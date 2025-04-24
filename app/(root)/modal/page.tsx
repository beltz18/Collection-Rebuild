"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@heroui/react"
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  closeModal,
  openModal,
} from "@sec/modal"

export default function ModalExamplePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (onClose: () => void) => {
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "" })
    onClose()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modal Examples</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Basic Modal</h2>
          <Modal id="basic-modal">
            <ModalTrigger>
              <Button color="primary" onPress={() => openModal("basic-modal")}>Open Basic Modal</Button>
            </ModalTrigger>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Basic Modal</ModalHeader>
                  <ModalBody>
                    <p>This is a basic modal example using our custom implementation.</p>
                    <p className="mt-2">
                      It demonstrates the render props pattern where the <code>ModalContent</code> component provides an{" "}
                      <code>onClose</code> function.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Confirm
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  )
}