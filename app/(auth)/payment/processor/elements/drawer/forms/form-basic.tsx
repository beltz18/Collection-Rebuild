"use client"

import { useState, useEffect } from "react"
import { Input, Textarea, Select, SelectItem, Switch, Card, CardBody } from "@heroui/react"
import type { PaymentProcessorFormData } from "../types"

interface BasicInformationFormProps {
  formData: PaymentProcessorFormData
  updateFormData: (data: Partial<PaymentProcessorFormData>) => void
  isViewMode: boolean
}

export function BasicInformationForm({ formData, updateFormData, isViewMode }: BasicInformationFormProps) {
  const [isActive, setIsActive] = useState(formData.active)

  useEffect(() => {
    setIsActive(formData.active)
  }, [formData.active])

  const handleSwitchChange = (value: boolean) => {
    setIsActive(value)
    updateFormData({ active: value })
  }

  const options = [
    { key: "both", label: "Both" },
    { key: "debit", label: "Debit" },
    { key: "credit", label: "Credit" },
  ]

  return (
    <div className="h-full min-h-full py-6 px-15">
      <Card className="border-none rounded-md shadow-none h-full">
        <CardBody className="gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold h-text-foreground">Basic Information</h3>
            <p className="text-sm text-foreground-500">Configure the basic settings for your payment processor</p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <Input
                label="Name"
                placeholder="Enter processor name"
                labelPlacement="outside"
                description="Unique identifier for the payment processor (e.g., PaySource, Stripe)"
                isRequired
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                isReadOnly={isViewMode}
                classNames={{
                  label: "text-md font-medium text-foreground",
                  description: "text-sm text-foreground-500",
                  input: "text-md bg-default-100 rounded-sm p-2",
                  inputWrapper: "shadow-sm rounded-xl border border-[#5f5e5e1a] h-12",
                }}
              />
            </div>

            <div className="space-y-2">
              <Textarea
                label="Description"
                placeholder="Enter a description for this payment processor"
                labelPlacement="outside"
                minRows={4}
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                isReadOnly={isViewMode}
                classNames={{
                  label: "text-md font-medium text-foreground",
                  input: "bg-default-100 text-md",
                  inputWrapper: "shadow-sm border border-[#5f5e5e1a] p-3",
                }}
              />
            </div>

            <div className="space-y-2">
              <Select
                label="Processor Type"
                placeholder="Select processor type"
                labelPlacement="outside"
                selectedKeys={formData.processor_type ? [formData.processor_type] : []}
                isRequired
                isDisabled={isViewMode}
                classNames={{
                  label: "text-md font-medium text-foreground",
                  trigger: "bg-default-100 shadow-sm rounded-xl border border-[#5f5e5e1a] h-12",
                  value: "text-foreground text-m",
                }}
              >
                {options.map((item) => (
                  <SelectItem key={item.key}>{item.label}</SelectItem>
                ))}
              </Select>
              <p className="text-sm text-foreground-500">
                Defines if processor handles debit, credit, or both types of transactions
              </p>
            </div>

            <div className="flex items-start justify-between pt-4 border-t border-divider">
              <div className="space-y-1">
                <p className="text-md font-medium text-foreground">Active</p>
                <p className="text-sm text-foreground-500">Enable or disable this payment processor</p>
              </div>
              <Switch
                isSelected={isActive}
                onValueChange={handleSwitchChange}
                aria-label="Active status"
                isDisabled={isViewMode}
                classNames={{
                  wrapper: "bg-default-200 group-data-[selected=true]:bg-primary",
                }}
                size="lg"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}