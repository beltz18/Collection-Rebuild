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
      return 'bg-yellow-100 text-yellow-800'
    case 'PP':
      return 'bg-green-100 text-green-800'
    case 'PS':
      return 'bg-orange-100 text-orange-800'
    case 'PF':
      return 'bg-red-100 text-red-600'
    case 'NTP':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-default-600'
  }
}