"use client"

import type React from "react"
import { Select, SelectItem } from "@heroui/react"
import { Heading } from "@com/heading"
import type { FormData } from "./add.types"
import { InputField } from "./form-field"
import { mockProcessors, paymentMethods } from "./mock-data"

interface PaymentConfigTabProps {
  formData: FormData
  selectedMethod: string | null
  selectedProcessor: string | null
  handleSelectChange: (name: string, value: string) => void
  handleNumberChange: (name: string, value: string) => void
}

export const PaymentConfigTab: React.FC<PaymentConfigTabProps> = ({
  formData,
  selectedMethod,
  selectedProcessor,
  handleSelectChange,
  handleNumberChange,
}) => {
  return (
    <form className="space-y-6">
      <Heading level={3} className="text-lg font-semibold mb-4">Payment Configuration</Heading>

      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="method" className="text-right text-sm font-medium">
          Method
        </label>
        <div className="col-span-3">
          <Select
            id="method"
            selectedKeys={selectedMethod ? [selectedMethod] : []}
            onChange={(e) => handleSelectChange("method", e.target.value)}
            placeholder="Select payment method"
            className="w-full"
            size="sm"
          >
            {paymentMethods.map((method) => (
              <SelectItem key={method.id} data-value={method.id} className="hover:outline-none">
                {method.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="processor" className="text-right text-sm font-medium">
          Processor
        </label>
        <div className="col-span-3">
          <Select
            id="processor"
            selectedKeys={selectedProcessor ? [selectedProcessor] : []}
            onChange={(e) => handleSelectChange("processor", e.target.value)}
            placeholder="Select payment processor"
            className="w-full"
            size="sm"
          >
            {mockProcessors.map((processor) => (
              <SelectItem key={processor.id} data-value={processor.id}>
                {processor.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <InputField
        label="Attempts"
        id="attempts"
        name="attempts"
        type="number"
        value={formData.attempts.toString()}
        onChange={handleNumberChange}
        helpText="Maximum number of retry attempts for this step."
      />

      <InputField
        label="Min Hours Between Attempts"
        id="minHoursBetweenAttempts"
        name="minHoursBetweenAttempts"
        type="number"
        value={formData.minHoursBetweenAttempts.toString()}
        onChange={handleNumberChange}
        helpText="Required waiting period (in hours) between retry attempts."
      />

      <InputField
        label="Min Hours Before Next Step"
        id="minHoursBeforeNextStep"
        name="minHoursBeforeNextStep"
        type="number"
        value={formData.minHoursBeforeNextStep.toString()}
        onChange={handleNumberChange}
      />
    </form>
  )
}