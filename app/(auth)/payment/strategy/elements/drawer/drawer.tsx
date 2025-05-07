"use client"

import { useState, useEffect } from "react"
import { Button } from "@heroui/react"
import { Edit2 } from "lucide-react"
import { CustomDrawer } from "@com/drawer"
import StrategyForm from "./form"
import { Strategy } from "@typ/strategy"
import { StrategyDrawerProps } from "./types"
import { ScrollShadow } from "@heroui/scroll-shadow"
import { useResponsive } from "@uti/useResponsive"
import { usePostStrategies } from "@api/routes/strategy"
import { successToast } from "@com/index"

export function StrategyDrawer({ 
  isOpen, 
  onClose, 
  isViewMode, 
  strategy, 
  refresh, 
  token, 
  onSave 
}: StrategyDrawerProps) {
  const { isMobile } = useResponsive()
  const [formData, setFormData] = useState<Strategy>({
    id: "",
    name: "",
    active: true,
    company: "",
    branch: "",
    company_id: "",
    branch_id: "",
    days_before_due: 0,
    strict_mode: false,
    default: true,
  })

  const [isEditing, setIsEditing] = useState(isViewMode === "add")

  useEffect(() => {
    if (strategy) {
      setFormData({
        ...strategy,
      })
    } else {
      setFormData({
        id: "",
        name: "",
        active: true,
        company: "",
        branch: "",
        company_id: "",
        branch_id: "",
        days_before_due: 0,
        strict_mode: false,
        default: true,
      })
    }

    setIsEditing(isViewMode === "add" || isViewMode === "edit")
  }, [strategy, isViewMode])

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      company: prevData.company_id,
      branch: prevData.branch_id,
    }))
  }, [formData.company_id, formData.branch_id])

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }))
  }

  const handleSave = async () => {
    console.log("Data being sent:", formData)
  }

  const handleEdit = () => { setIsEditing(!isEditing) }

  const handleCancel = () => {
    if (strategy) setFormData(strategy)
    setIsEditing(false)
    if (isViewMode === "add") onClose()
  }

  const footerContent = isEditing ? (
    <div className="flex justify-end gap-2 w-full">
      <Button color="danger" variant="light" onPress={handleCancel}>
        Cancel
      </Button>
      <Button color="primary" className="bg-[#023047]" onPress={handleSave}>
        Save
      </Button>
    </div>
  ) : (
    <div className="flex justify-end gap-2 w-full">
      <Button color="danger" variant="light" onPress={onClose}>
        Close
      </Button>
      <Button color="primary" className="bg-[#023047]" onPress={handleEdit}>
        Edit
      </Button>
    </div>
  )

  return (
    <CustomDrawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size="lg"
      className={`${isMobile ? 'w-full p-4' : 'max-w-[60%] p-6' }`}
      headerClassName="py-0 px-0"
      bodyClassName="p-0 h-full"
      title={
        <h2 className="text-xl font-bold">
          {isViewMode === "add" ? "Add Payment Strategy" : "Payment Strategy Details"}
        </h2>
      }
      footer={footerContent}
    >
      {isViewMode === "view" && (
        <div className="w-full">
          <Button color="primary" onPress={handleEdit} className="gap-3 bg-[#023047]">
            <Edit2 size={12} />
            Enable Edit Mode
          </Button>
        </div>
      )}

      <ScrollShadow
        hideScrollBar
        className="w-full"
        offset={100}
        orientation="horizontal"
      >
        <div className="w-full">
          <StrategyForm formData={formData} updateFormData={updateFormData} isViewMode={!isEditing} />
        </div>
      </ScrollShadow>
    </CustomDrawer>
  )
}