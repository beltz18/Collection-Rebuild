"use client"

import { Input, Select, SelectItem, Switch, Card, CardBody } from "@heroui/react"
import { optionsSecCode } from "../constants"
import { secCode } from "../types"
import type { PaymentProcessorFormData } from "../types"

interface AdditionalSettingsFormProps {
  formData: PaymentProcessorFormData
  updateFormData: (data: Partial<PaymentProcessorFormData>) => void
  isViewMode: boolean
}

export function AdditionalSettingsForm({ formData, updateFormData, isViewMode }: AdditionalSettingsFormProps) {
  return (
    <div className="h-full min-h-full py-6 px-15">
      <Card className="border-none rounded-md shadow-none h-full">
        <CardBody className="gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold h-text-foreground">Additional Information</h3>
            <p className="text-sm text-foreground-500">Configure the basic settings for your payment processor</p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <Input
                label="Store ID"
                placeholder="Enter store ID"
                labelPlacement="outside"
                description="Unique identifier for the store"
                value={formData.store_id}
                isReadOnly={isViewMode}
                onChange={(e) => updateFormData({ store_id: e.target.value })}
                classNames={{
                  label: "text-md font-medium text-foreground",
                  description: "text-sm text-foreground-500",
                  input: "text-md bg-default-100 rounded-sm p-2",
                  inputWrapper: "shadow-sm rounded-xl border border-[#5f5e5e1a] h-12",
                }}
              />
            </div>

            <div className="space-y-2">
              <Input
                label="Client ID"
                placeholder="Enter client ID"
                labelPlacement="outside"
                description="Unique identifier for the client"
                value={formData.client_id}
                isReadOnly={isViewMode}
                onChange={(e) => updateFormData({ client_id: e.target.value })}
                classNames={{
                  label: "text-md font-medium text-foreground",
                  description: "text-sm text-foreground-500",
                  input: "text-md bg-default-100 rounded-sm p-2",
                  inputWrapper: "shadow-sm rounded-xl border border-[#5f5e5e1a] h-12",
                }}
              />
            </div>

            <div className="space-y-2">
              <Input
                label="Location ID"
                placeholder="Enter location ID"
                labelPlacement="outside"
                description="Unique identifier for the location"
                value={formData.location_id}
                isReadOnly={isViewMode}
                onChange={(e) => updateFormData({ location_id: e.target.value })}
                classNames={{
                  label: "text-md font-medium text-foreground",
                  description: "text-sm text-foreground-500",
                  input: "text-md bg-default-100 rounded-sm p-2",
                  inputWrapper: "shadow-sm rounded-xl border border-[#5f5e5e1a] h-12",
                }}
              />
            </div>

            <div className="space-y-2">
              <Select
                label="SEC Code"
                placeholder={formData.sec_code ? formData.sec_code : "Select SEC Code"}
                value={formData.sec_code}
                onChange={(e) => updateFormData({ sec_code: e.target.value as secCode })}
              >
                {optionsSecCode.map((option) => (
                  <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
              </Select>
            </div>

            <div className="flex items-start justify-between pt-4 border-t border-divider">
              <div className="space-y-1">
                <p className="text-md font-medium text-foreground">Use same day ACH</p>
                <p className="text-sm text-foreground-500">Enable or disable same day ACH</p>
              </div>
              <Switch
                isSelected={formData.use_same_day_ach}
                onValueChange={(value) => updateFormData({ use_same_day_ach: value })}
                aria-label="Same day ACH"
                classNames={{
                  wrapper: "bg-default-200 group-data-[selected=true]:bg-primary",
                }}
                size="lg"
              />
            </div>

            <div className="flex items-start justify-between pt-4 border-t border-divider">
              <div className="space-y-1">
                <p className="text-md font-medium text-foreground">Enabled for lender web</p>
                <p className="text-sm text-foreground-500">Enable or disable for lender web</p>
              </div>
              <Switch
                isSelected={formData.enabled_for_lender_web}
                onValueChange={(value) => updateFormData({ enabled_for_lender_web: value })}
                aria-label="Enabled for lender web"
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