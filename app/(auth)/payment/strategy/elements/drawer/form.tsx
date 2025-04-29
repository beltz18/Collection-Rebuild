"use client"

import { Input, Checkbox, Card, Select, SelectItem, CardBody } from "@heroui/react"
import { StrategyFormProps } from "./types"
import { mockBranches, mockCompanies } from "../../mock/mock-data"

export default function StrategyForm({ formData, updateFormData, isViewMode = false }: StrategyFormProps) {
  const company = mockCompanies
  const branch = mockBranches

  const handleCompanyChange = (value: string) => {
    const selectedCompany = company?.find((c) => String(c.id) === value)

    updateFormData({
      company_id: value,
      company: selectedCompany?.name || "",
    })
  }

  const handleBranchChange = (value: string) => {
    const selectedBranch = branch?.find((b) => String(b.id) === value)

    updateFormData({
      branch_id: value,
      branch: selectedBranch?.name || "",
    })
  }

  return (
    <div className="h-full min-h-full py-4 px-15">
      <Card className="bg-default-50 border-none rounded-md shadow-none dark:bg-default-100/50 h-full">
        <CardBody className="gap-3 overflow-hidden">
          <div className="flex flex-col gap-2 mb-2">
            <h3 className="text-xl font-semibold text-foreground">Payment Configuration</h3>
            <p className="text-sm text-foreground-500">Configure the settings for your collection strategy</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-start">
              <div className="flex-1">
                <span className="text-md font-medium text-foreground">Active</span>
              </div>
              <Checkbox
                isSelected={formData.active}
                onValueChange={(value) => updateFormData({ active: value })}
                isDisabled={isViewMode}
                size="lg"
                color="primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-md font-medium text-foreground block mb-1">Company</label>
              {isViewMode ? (
                <div className="bg-default-100 shadow-sm rounded-xl border border-[#5f5e5e1a] h-12 w-full px-3 py-3 text-foreground">
                  {formData.company || "No company selected"}
                </div>
              ) : (
                <Select
                  placeholder="Select company"
                  selectedKeys={formData.company_id ? [String(formData.company_id)] : []}
                  onChange={(e) => handleCompanyChange(e.target.value)}
                  isDisabled={isViewMode}
                  classNames={{
                    trigger: "bg-default-100 shadow-sm rounded-xl border border-[#5f5e5e1a] h-12 w-full",
                    value: "text-foreground",
                  }}
                >
                  {(company ?? []).length > 0 ? (
                    (company ?? []).map((company, index) => (
                      <SelectItem key={company.id || index} data-value={String(company.id)}>
                        {company.name || `Company ${company.id}`}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem key="no-companies" isDisabled>
                      No companies available
                    </SelectItem>
                  )}
                </Select>
              )}
              <p className="text-sm text-foreground-500 mt-1">
                Company this strategy belongs to. If empty, it will be used as a default strategy
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-md font-medium text-foreground block mb-1">Store</label>
              {isViewMode ? (
                <div className="bg-default-100 shadow-sm rounded-xl border border-[#5f5e5e1a] h-12 w-full px-3 py-3 text-foreground">
                  {formData.branch || "No store selected"}
                </div>
              ) : (
                <Select
                  placeholder="Select store"
                  selectedKeys={formData.branch_id ? [String(formData.branch_id)] : []}
                  onChange={(e) => handleBranchChange(e.target.value)}
                  isDisabled={isViewMode}
                  classNames={{
                    trigger: "bg-default-100 shadow-sm rounded-xl border border-[#5f5e5e1a] h-12 w-full",
                    value: "text-foreground",
                  }}
                >
                  {(branch ?? []).length > 0 ? (
                    (branch ?? []).map((branch, index) => (
                      <SelectItem key={branch.id || index} data-value={String(branch.id)}>
                        {branch.name || `Branch ${branch.id}`}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem key="no-branches" isDisabled>
                      No stores available
                    </SelectItem>
                  )}
                </Select>
              )}
              <p className="text-sm text-foreground-500 mt-1">
                Store this strategy belongs to. Takes precedence over company strategy
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-1">
                <span className="text-md font-medium text-foreground">Default</span>
                <p className="text-sm text-foreground-500">
                  If true, this strategy will be used when no specific strategy is found
                </p>
              </div>
              <Checkbox
                isSelected={formData.default}
                onValueChange={(value) => updateFormData({ default: value })}
                isDisabled={isViewMode}
                size="lg"
              />
            </div>

            <div className="space-y-1">
              <Input
                label="Name"
                placeholder="Enter strategy name"
                labelPlacement="outside"
                value={formData.name || ""}
                isRequired
                isReadOnly={isViewMode}
                onChange={(e) => updateFormData({ name: e.target.value })}
                classNames={{
                  label: "text-md font-medium text-foreground",
                  input: "text-md bg-default-100 rounded-sm p-2",
                  inputWrapper: "shadow-sm rounded-xl border border-[#5f5e5e1a] h-12",
                }}
              />
              <p className="text-sm text-foreground-500 mt-1">Descriptive name for the collection strategy</p>
            </div>

            <div className="space-y-1">
              <Input
                label="Days before due to start"
                placeholder="Enter days"
                labelPlacement="outside"
                type="number"
                value={(formData.days_before_due_to_start || formData.days_before_due || 0).toString()}
                isReadOnly={isViewMode}
                onChange={(e) =>
                  updateFormData({
                    days_before_due_to_start: Number.parseInt(e.target.value) || 0,
                    days_before_due: Number.parseInt(e.target.value) || 0,
                  })
                }
                classNames={{
                  label: "text-md font-medium text-foreground",
                  input: "text-md bg-default-100 rounded-sm p-2",
                  inputWrapper: "shadow-sm rounded-xl border border-[#5f5e5e1a] h-12",
                }}
              />
              <p className="text-sm text-foreground-500 mt-1">
                Number of days before due date to start executing this strategy
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-1">
                <span className="text-md font-medium text-foreground">Strict mode</span>
                <p className="text-sm text-foreground-500">
                  If true, once a step is skipped for any payment in a loan request, that step will be skipped for all
                  remaining payments
                </p>
              </div>
              <Checkbox
                isSelected={formData.strict_mode}
                onValueChange={(value) => updateFormData({ strict_mode: value })}
                isDisabled={isViewMode}
                size="lg"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}