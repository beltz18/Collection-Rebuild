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
import { useTokenStore } from "@sts/useTokenStore"
import { errorToast, successToast } from "@com/index"
import { CACHE_KEYS } from "@api/cache"
import { useQueryClient } from "@tanstack/react-query"
import { Heading } from "@com/heading"
import { useSelected } from "@sts/useSelectedStore"
import { AnimatePresence } from "framer-motion"
import { 
  usePostProcessors, 
  useUpdateProcessors 
} from "@api/routes/processor"

interface PaymentProcessorDrawerProps {
  isOpen: boolean
  onClose: () => void
  isViewMode: "view" | "edit" | "add"
  processor?: any
}

export function PaymentProcessorDrawer({
  isOpen,
  onClose,
  isViewMode,
  processor,
}: PaymentProcessorDrawerProps) {
  console.log(processor);
  
  const { isMobile } = useResponsive()
  const [selectedOption, setSelectedOption] = useState("basic")
  const [isEditing, setIsEditing] = useState(
    isViewMode === "add" || isViewMode === "edit"
  )
  const [formData, setFormData] = useState<PaymentProcessorFormData>(initialFormData)

  const data = Array.isArray(processor) && processor.length > 0 ? processor[0] : null
  console.log(data);
  const { selectedCellsP } = useSelected()
  const queryClient = useQueryClient()
  const { token } = useTokenStore()
  const auth = usePostProcessors(token)
  const update = useUpdateProcessors(token, selectedCellsP[0]?.id)
  const { isPending, isSuccess } = auth

  useEffect(() => {
    if (processor && Array.isArray(processor) && processor.length > 0) {
      const [firstItem] = processor
      if (firstItem && typeof firstItem === 'object') {
        setFormData((prev) => ({
          ...prev,
          ...firstItem,
          company: firstItem.company || 0,
          branch: firstItem.branch || 0,
          company_id: firstItem.company_id ?? '',
          branch_id: firstItem.branch_id ?? '',
        }))
      }
    } else {
      setFormData(initialFormData)
    }

    setIsEditing(isViewMode === 'add' || isViewMode === 'edit')
    console.log('processor ', selectedCellsP[0]?.id)
  }, [processor, isViewMode])

  console.log(formData);
  

  const updateFormData = (newData: Partial<PaymentProcessorFormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }))
  }

  const handleUpdate = async () => { 
    try {
      if (selectedCellsP[0]?.id) {
        const data = {
          ...formData,
        }

        const r = await update.mutateAsync(data)
        console.log(r);
        if (r.message === 'Payment processor updated successfully') {
          queryClient.refetchQueries({ queryKey: [CACHE_KEYS.getProcessors] })
          successToast({
            title: 'Done!',
            body: 'Updated processor data',
          })

          setTimeout(() => {
            onClose()
          }, 1000)
        } else {
          errorToast({
            title: 'Error',
            body: 'Something wrong happened...',
          })
        }
      } else {
        errorToast({
          title: 'Error',
          body: 'There was an error getting the id of this processor',
        })
      }
    } catch (err) {
      console.log(err)
      errorToast({
        title: 'Error',
        body: 'Processor could not be updated',
      })
    }
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
        })
        console.log(r)

        if (r && r.message == "Payment processor created successfully") {
          queryClient.refetchQueries({ queryKey: [CACHE_KEYS.getProcessors] })
          successToast({
            title: "Success!",
            body: "Payment processor created successfully!",
          })

          setTimeout(() => {
            onClose()
          }, 1000)
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

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleCancel = () => {
    if (processor) setFormData(data)
    setIsEditing(false)
    if (isViewMode === "add") onClose()
  }

  const footerContent = isViewMode === "add"  ?(
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
  ) : isViewMode === "view" && (
    <div className="flex justify-end gap-2 w-full">
      <Button color="danger" variant="light" onPress={onClose}>
        Close
      </Button>

      { 
        isEditing ? (
          <Button 
            color='primary' 
            className='bg-[#023047]' 
            onPress={ handleUpdate }
            disabled={ isPending }
            isLoading={ isPending && !isSuccess }
          >
            Save
          </Button>
        ) : (
          <Button
            color='primary'
            className='bg-[#023047]'
            onPress={ handleEdit }
          >
            Edit
          </Button>
        )
      }
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
            {isViewMode === "add"
              ? "Add Payment Processor"
              : "Payment Processor Details"}
          </Heading>

          <NavigationTabs
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
      }
      footer={footerContent}
    >
      {isViewMode === "view" && (
        <div className="w-auto mt-3 ml-3">
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
