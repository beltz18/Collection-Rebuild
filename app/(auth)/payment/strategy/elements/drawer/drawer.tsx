"use client"

import { useState, useEffect } from "react"
import { Button } from "@heroui/react"
import { Edit2 } from "lucide-react"
import { CustomDrawer } from "@com/drawer"
import StrategyForm from "./form"
import { Strategy } from "./types"
import { StrategyDrawerProps } from "./types"
import { ScrollShadow } from "@heroui/scroll-shadow"
import { useResponsive } from "@uti/useResponsive"
import { usePostStrategies } from "@api/routes/strategy"
import { useTokenStore } from "@sts/useTokenStore"
import { useQueryClient } from "@tanstack/react-query"
import { errorToast, successToast } from "@com/index"
import { CACHE_KEYS } from "@api/cache"

export function StrategyDrawer({
  isOpen,
  onClose,
  isViewMode,
  strategy,
}: StrategyDrawerProps) {
  const { isMobile } = useResponsive()
  const [formData, setFormData] = useState<Strategy>({
    name: "",
    active: true,
    company: 0,
    branch: 0,
    company_id: "",
    branch_id: "",
    days_before_due_to_start: 0,
    strict_mode: false,
    default: true,
  })

  const queryClient = useQueryClient()
  const { token } = useTokenStore()
  const auth = usePostStrategies(token)
  const { isPending, isSuccess } = auth

  const [isEditing, setIsEditing] = useState(isViewMode === "add")

  useEffect(() => {
    if (strategy) {
      setFormData({
        ...strategy,
      })
    } else {
      setFormData({
        name: "",
        active: true,
        company: 0,
        branch: 0,
        company_id: "",
        branch_id: "",
        days_before_due_to_start: 0,
        strict_mode: false,
        default: true,
      })
    }

    setIsEditing(isViewMode === "add" || isViewMode === "edit")
  }, [strategy, isViewMode])

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      company: Number(prevData.company_id) || 0,
      branch: Number(prevData.branch_id) || 0,
    }))
  }, [formData.company_id, formData.branch_id])

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }))
  }

  const handleSave = async () => {
    if (!formData.name) {
      errorToast({
        title: "Error",
        body: "Name can not be empty",
      })
    } else {
      try {
        const r = await auth.mutateAsync({
          ...formData,
          days_before_due_to_start:
            formData.days_before_due_to_start?.toString(),
        })
        console.log(r)

        if (r && r.message == "Payment strategy created successfully") {
          queryClient.refetchQueries({ queryKey: [CACHE_KEYS.getStrategies] })
          successToast({
            title: "Success!",
            body: "Payment strategy created successfully!",
          })

          setTimeout(() => { onClose() }, 1000)
        } else {
          errorToast({
            title: "Error",
            body: "We could not validate you",
          })
        }
      } catch (err: unknown) {
        if (err instanceof Error && (err as any)?.response?.data) {
          errorToast({
            title: "Error",
            body: (err as any).response.data.message,
          })
        } else console.log(err)
      }
    }
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
      <Button 
        color="primary" 
        className="bg-[#023047]" 
        onPress={handleSave}
        disabled={ isPending }
        isLoading={ isPending && !isSuccess }
      >
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
      headerClassName="py-0 px-0"
      bodyClassName="p-0 h-full"
      title={
        <h2 className="text-xl font-bold">
          {isViewMode === "add"
            ? "Add Payment Strategy"
            : "Payment Strategy Details"}
        </h2>
      }
      footer={footerContent}
    >
      {isViewMode === "view" && (
        <div className="w-full">
          <Button
            color="primary"
            onPress={handleEdit}
            className="gap-3 bg-[#023047]"
          >
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
          <StrategyForm
            formData={formData}
            updateFormData={updateFormData}
            isViewMode={!isEditing}
          />
        </div>
      </ScrollShadow>
    </CustomDrawer>
  )
}
