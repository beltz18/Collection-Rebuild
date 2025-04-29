import { format, parseISO } from "date-fns"

export const formatDateTime = (dateString: string) => {
  return dateString ? format(parseISO(dateString), "MMMM d, yyyy HH:mm") : "Not set"
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export const getAssociatedPaymentStatus = (status: string): string => {
  switch (status) {
    case "sent":
      return "In Process"
    case "processed":
      return "Success"
    case "failed":
      return "Failed"
    case "refund_pending":
      return "Refunding"
    case "refund_processed":
      return "Refunded"
    case "refund_failed":
      return "Refund Failed"
    default:
      return status
  }
}

export const getAssociatedPaymentStatusColor = (status: string): string => {
  switch (status) {
    case "sent":
      return "bg-blue-100 text-blue-800"
    case "processed":
      return "bg-green-100 text-green-800"
    case "failed":
      return "bg-red-100 text-red-800"
    case "refund_pending":
      return "bg-yellow-100 text-yellow-800"
    case "refund_processed":
      return "bg-purple-100 text-purple-800"
    case "refund_failed":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}