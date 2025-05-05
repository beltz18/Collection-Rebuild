"use client"

import type React from "react"

import { motion } from "framer-motion"
import { BasicInformationForm } from "./forms/form-basic"
import { CredentialsForm } from "./forms/credentials-form"
import { SFTPConfigurationForm } from "./forms/sftp-form"
import { AdditionalSettingsForm } from "./forms/settings-form"
import type { PaymentProcessorFormData } from "./types"

interface AnimatedContentProps {
  children: React.ReactNode
}

const AnimatedContent = ({ children }: AnimatedContentProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
)

interface FormContentProps {
  selectedOption: string
  formData: PaymentProcessorFormData
  updateFormData: (data: Partial<PaymentProcessorFormData>) => void
  isViewMode: boolean
}

export function FormContent({ selectedOption, formData, updateFormData, isViewMode }: FormContentProps) {
  return (
    <>
      {selectedOption === "basic" && (
        <AnimatedContent key="basic">
          <BasicInformationForm formData={formData} updateFormData={updateFormData} isViewMode={isViewMode} />
        </AnimatedContent>
      )}
      {selectedOption === "credentials" && (
        <AnimatedContent key="credentials">
          <CredentialsForm formData={formData} updateFormData={updateFormData} isViewMode={isViewMode} />
        </AnimatedContent>
      )}
      {selectedOption === "sftp" && (
        <AnimatedContent key="sftp">
          <SFTPConfigurationForm formData={formData} updateFormData={updateFormData} isViewMode={isViewMode} />
        </AnimatedContent>
      )}
      {selectedOption === "settings" && (
        <AnimatedContent key="settings">
          <AdditionalSettingsForm formData={formData} updateFormData={updateFormData} isViewMode={isViewMode} />
        </AnimatedContent>
      )}
    </>
  )
}