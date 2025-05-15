import { format } from 'date-fns'

export const tailwindToRGB: Record<string, [number, number, number]> = {
  "bg-yellow-100": [254, 243, 199],
  "bg-green-100": [220, 252, 231],
  "bg-orange-100": [255, 237, 213],
  "bg-red-100": [254, 226, 226],
  "bg-blue-100": [219, 234, 254],
  "bg-gray-100": [243, 244, 246],
}

export const tailwindToTextRGB: Record<string, [number, number, number]> = {
  "text-yellow-800": [133, 77, 14],
  "text-green-800": [22, 101, 52],
  "text-orange-800": [154, 52, 18],
  "text-red-800": [220, 38, 38],
  "text-blue-800": [30, 64, 175],
  "text-default-600": [75, 85, 99],
}

export const formatDateTime = (dateString: string | undefined) => {
  return dateString ? format(new Date(dateString), "MMMM d, yyyy HH:mm") : "Not set"
}

export const formatCurrency = (amount: number | undefined) => {
  return amount !== undefined
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
    : "N/A"
}

export const PAGE_MARGIN = {
  left: 20,
  right: 20,
  top: 20,
  bottom: 20,
}
export const CONTENT_WIDTH = 210 - PAGE_MARGIN.left - PAGE_MARGIN.right
export const CONTENT_START_X = PAGE_MARGIN.left
export const MAX_Y = 297 - PAGE_MARGIN.bottom