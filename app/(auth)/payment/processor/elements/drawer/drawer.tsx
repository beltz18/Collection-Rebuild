"use client"

import { useState, useEffect } from "react"
import { Button } from "@heroui/react"
import { Edit2 } from "lucide-react"
import { CustomDrawer } from "@com/drawer"
import { useResponsive } from "@uti/useResponsive"
import { ScrollShadow } from "@heroui/scroll-shadow"
import { NavigationTabs } from "./tabs"
import { FormContent } from "./content"
import { initialFormData } from "./constants"
import type { PaymentProcessorFormData } from "./types"
import { Heading } from "@com/heading"
import { AnimatePresence } from "framer-motion"

interface PaymentProcessorDrawerProps {
  isOpen: boolean
  onClose: () => void
  isViewMode: "view" | "edit" | "add"
  processor?: any
  refresh?: () => void
  token?: string
  onSave?: (processor: PaymentProcessorFormData) => void
}

export function PaymentProcessorDrawer({
  isOpen,
  onClose,
  isViewMode,
  processor,
  refresh,
  token,
  onSave,
}: PaymentProcessorDrawerProps) {
  const { isMobile } = useResponsive()
  const [selectedOption, setSelectedOption] = useState("basic")
  const [isEditing, setIsEditing] = useState(isViewMode === "add" || isViewMode === "edit")
  const [formData, setFormData] = useState<PaymentProcessorFormData>(initialFormData)

  useEffect(() => {
    if (processor && isViewMode === "view") {
      setFormData({
        name: processor.name || "",
        description: processor.description || "",
        processor_type: processor.processor_type || "both",
        user: processor.user || "",
        password: processor.password || "",
        url: processor.url || "",
        sftp_host: processor.sftp_host || "",
        sftp_username: processor.sftp_username || "",
        sftp_password: processor.password || "",
        store_id: processor.store_id || "",
        client_id: processor.client_id || "",
        location_id: processor.location_id || "",
        sec_code: processor.sec_code || "ppd",
        use_same_day_ach: processor.use_same_day_ach || false,
        enabled_for_lender_web: processor.enabled_for_lender_web || false,
        active: processor.active || true,
      })
    } else if (isViewMode === "add") {
      setFormData(initialFormData)
    }

    setIsEditing(isViewMode === "add" || isViewMode === "edit")
  }, [processor, isViewMode])

  const updateFormData = (newData: Partial<PaymentProcessorFormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }))
  }

  const handleSave = async () => {
    console.log("Data being sent:", formData)
    onSave?.(formData)
    onClose()
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleCancel = () => {
    if (processor)
      setFormData({
        name: processor.name || "",
        description: processor.description || "",
        processor_type: processor.processor_type || "both",
        user: processor.user || "",
        password: processor.password || "",
        url: processor.url || "",
        sftp_host: processor.sftp_host || "",
        sftp_username: processor.sftp_username || "",
        sftp_password: processor.password || "",
        store_id: processor.store_id || "",
        client_id: processor.client_id || "",
        location_id: processor.location_id || "",
        sec_code: processor.sec_code || "ppd",
        use_same_day_ach: processor.use_same_day_ach || false,
        enabled_for_lender_web: processor.enabled_for_lender_web || false,
        active: processor.active || true,
      })
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
      className={`${isMobile ? "w-full p-4" : "max-w-[60%] p-6"}`}
      headerClassName="py-0 px-0 flex justify-start"
      bodyClassName="p-0 h-full"
      title={
        <div className="flex flex-col w-full">
          <Heading level={2} className="text-xl font-bold">
            {isViewMode === "add" ? "Add Payment Processor" : "Payment Processor Details"}
          </Heading>

          <NavigationTabs selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </div>
      }
      footer={footerContent}
    >
      {isViewMode === "view" && (
        <div className="w-full mb-4">
          <Button color="primary" onPress={handleEdit} className="gap-3 bg-[#023047]">
            <Edit2 size={12} />
            Enable Edit Mode
          </Button>
        </div>
      )}

      <ScrollShadow hideScrollBar className="w-full" orientation="horizontal">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <FormContent
              selectedOption={selectedOption}
              formData={formData}
              updateFormData={updateFormData}
              isViewMode={!isEditing}
            />
          </AnimatePresence>
        </div>
      </ScrollShadow>
    </CustomDrawer>
  )
}