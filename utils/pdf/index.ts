import {
  Loan,
  Payment,
} from '@typ/home-tables'
import { LoanPDF } from './loan-pdf'
import { PaymentPDF } from './payment-pdf'

export const generatePDF = (title: 'Loan' | 'Payment', data: Loan[] | Payment[]) => {
  const now       = new Date()
  const year      = now.getFullYear()
  const month     = String(now.getMonth() + 1).padStart(2, '0')
  const day       = String(now.getDate()).padStart(2, '0')
  const hours     = String(now.getHours()).padStart(2, '0')
  const minutes   = String(now.getMinutes()).padStart(2, '0')
  const timestamp = `${year}-${month}-${day}_${hours}-${minutes}`

  if (title === 'Loan') LoanPDF(data as Loan[], timestamp)
  else if (title === 'Payment') PaymentPDF(data as Payment[], timestamp)
  else console.log(new Error('Cannot process your request'))
}