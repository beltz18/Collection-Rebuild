import { 
  format, 
  parseISO, 
  isValid 
} from 'date-fns'

export const formatCurrencys = (amount: number | undefined) => {
  if (amount === undefined || isNaN(amount)) return "$0.00"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatDateTimes = (dateString: string | undefined) => {
  if (!dateString) return "Not set"
  
  try {
    const date = parseISO(dateString)
    if (isValid(date)) {
      return format(date, "MMMM d, yyyy HH:mm")
    }
    
    // If parseISO fails, try with new Date()
    const fallbackDate = new Date(dateString)
    if (isValid(fallbackDate)) {
      return format(fallbackDate, "MMMM d, yyyy HH:mm")
    }
    
    return "Invalid date"
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid date"
  }
}