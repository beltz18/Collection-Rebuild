export type Status = 'SP' | 'PP' | 'PS' | 'PF' | 'NTP'

export const paymentStatus = {
  SP:  'Pending',
  PP:  'Paid',
  PS:  'Paid in pending',
  PF:  'Failed',
  NTP: 'Next to pay'
}

export const getStatusColor = (s: Status) => {
  switch (s) {
    case 'SP':
      return 'bg-yellow-200 text-yellow-800'
    case 'PP':
      return 'bg-green-200 text-green-800'
    case 'PS':
      return 'bg-orange-200 text-orange-800'
    case 'PF':
      return 'bg-red-200 text-red-600'
    case 'NTP':
      return 'bg-blue-200 text-blue-800'
    default:
      return 'bg-gray-200 text-default-600'
  }
}