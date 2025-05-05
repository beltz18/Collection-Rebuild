"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { Input, Card, CardBody, Checkbox, Button } from "@heroui/react"
import type { PaymentProcessorFormData } from "../types"

interface CredentialsFormProps {
  formData: PaymentProcessorFormData
  updateFormData: (data: Partial<PaymentProcessorFormData>) => void
  isViewMode: boolean
}

export function CredentialsForm({ formData, updateFormData, isViewMode }: CredentialsFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)

  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const handleEditPassword = () => {
    setIsEditingPassword(true)
    updateFormData({ password: "" })
  }

  return (
    <div className="h-full min-h-full py-6 px-15">
      <Card className="border-none rounded-md shadow-none h-full">
        <CardBody className="gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold h-text-foreground">Credentials</h3>
            <p className="text-sm text-foreground-500">Configure the basic settings for your payment processor</p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <Input
                label="User"
                placeholder="Enter username"
                labelPlacement="outside"
                description="Username for the payment processor"
                value={formData.user}
                isReadOnly={isViewMode}
                onChange={(e) => updateFormData({ user: e.target.value })}
                classNames={{
                  label: "text-md font-medium text-foreground",
                  description: "text-sm text-foreground-500",
                  input: "text-md bg-default-100 rounded-sm p-2",
                  inputWrapper: "shadow-sm rounded-xl border border-[#5f5e5e1a] h-12",
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  label="Password"
                  placeholder={isViewMode && !isEditingPassword ? "" : "Enter password"}
                  labelPlacement="outside"
                  description="Password for the payment processor"
                  value={isViewMode && !isEditingPassword ? "••••••••••••" : formData.password}
                  type={showPassword ? "text" : "password"}
                  isReadOnly={isViewMode && !isEditingPassword}
                  startContent={
                    isViewMode && !isEditingPassword ? (
                      <Pencil className="text-default-400 pointer-events-none flex-shrink-0" size={16} />
                    ) : undefined
                  }
                  onChange={(e) => updateFormData({ password: e.target.value })}
                  classNames={{
                    label: "text-md font-medium text-foreground",
                    description: "text-sm text-foreground-500",
                    input: "text-md bg-default-100 rounded-sm p-2",
                    inputWrapper: "shadow-sm rounded-xl border border-[#5f5e5e1a] h-12",
                  }}
                />
                {isViewMode && !isEditingPassword && (
                  <Button color="primary" radius="sm" className="p-4 px-6" onClick={handleEditPassword}>
                    Edit password
                  </Button>
                )}
              </div>
              <Checkbox
                radius="sm"
                color="primary"
                onClick={handlePasswordToggle}
                isDisabled={isViewMode && !isEditingPassword}
              >
                Show Password
              </Checkbox>
            </div>

            <div className="space-y-2">
              <Input
                label="URL"
                placeholder="Enter URL"
                labelPlacement="outside"
                description="URL for the payment processor"
                value={formData.url}
                isReadOnly={isViewMode}
                onChange={(e) => updateFormData({ url: e.target.value })}
                classNames={{
                  label: "text-md font-medium text-foreground",
                  description: "text-sm text-foreground-500",
                  input: "text-md bg-default-100 rounded-sm p-2",
                  inputWrapper: "shadow-sm rounded-xl border border-[#5f5e5e1a] h-12",
                }}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}