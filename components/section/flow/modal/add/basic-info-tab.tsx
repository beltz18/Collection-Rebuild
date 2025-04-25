"use client"

import type React from "react"
import { Chip } from "@com/chip"
import type { FormData } from "./add.types"
import { InputField, SwitchField } from "./form-field"

interface BasicInfoTabProps {
  formData: FormData
  strategyName: string
  handleNumberChange: (name: string, value: string) => void
  handleSwitchChange: (name: string, checked: boolean) => void
}

export const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  formData,
  strategyName,
  handleNumberChange,
  handleSwitchChange,
}) => {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-4 items-start gap-4">
        <label htmlFor="strategy" className="text-right text-sm font-medium">
          Strategy
        </label>
        <div className="col-span-3">
          <Chip color="primary" variant="flat" className="text-sm font-medium">
            {strategyName}
          </Chip>
        </div>
      </div>

      <InputField
        label="Step Order"
        id="order"
        name="order"
        type="number"
        value={formData.order.toString()}
        onChange={handleNumberChange}
        helpText="The order determines the sequence of execution for this step. Lower numbers execute first."
      />

      <SwitchField label="Active" id="active" isSelected={formData.active} onChange={handleSwitchChange} />

      <SwitchField
        label="Is Basic Step"
        id="is_basic_step"
        isSelected={formData.is_basic_step}
        onChange={handleSwitchChange}
        helpText="If true, must be the last step in strategy and only one allowed per strategy."
      />
    </form>
  )
}