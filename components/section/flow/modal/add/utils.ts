import type { FormData, NodeData } from "./add.types"
import { mockProcessors, paymentMethods } from "./mock-data"

export const createNodeData = (activeTab: string, formData: FormData, strategyName: string): NodeData => {
  if (activeTab === "basic") {
    return {
      label: `Step ${formData.order}: ${formData.is_basic_step ? "Basic" : "Standard"}`,
      description: `${strategyName} step`,
      priority: formData.active ? "High" : "Low",
      status: formData.active ? "Active" : "Pending",
      strategyData: {
        strategy: formData.strategy,
        order: formData.order,
        active: formData.active,
        isBasicStep: formData.is_basic_step,
        isMainStrategy: false,
      },
    }
  } else {
    const getMethodName = (id: string) => {
      const method = paymentMethods.find((m) => m.id === id)
      return method ? method.name : id
    }

    const getProcessorName = (id: string) => {
      const processor = mockProcessors.find((p) => p.id === id)
      return processor ? processor.name : id
    }

    return {
      label: `Step ${formData.order}: ${getMethodName(formData.method)}`,
      description: `${getMethodName(formData.method)} via ${getProcessorName(formData.processor)}`,
      priority: formData.active ? "High" : "Low",
      status: formData.active ? "Active" : "Pending",
      strategyData: {
        strategy: formData.strategy,
        order: formData.order,
        active: formData.active,
        isBasicStep: formData.is_basic_step,
        method: formData.method,
        processor: formData.processor,
        attempts: formData.attempts,
        minHoursBetweenAttempts: formData.minHoursBetweenAttempts,
        minHoursBeforeNextStep: formData.minHoursBeforeNextStep,
        isMainStrategy: false,
      },
    }
  }
}

export const getInitialFormData = (currentStrategyId: string, nextStepOrder: number): FormData => {
  return {
    strategy: currentStrategyId,
    order: nextStepOrder,
    active: true,
    is_basic_step: false,
    method: "",
    processor: "",
    attempts: 3,
    minHoursBetweenAttempts: 24,
    minHoursBeforeNextStep: 0,
  }
}