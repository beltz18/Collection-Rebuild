import {
  Loan,
  Payment,
} from '@typ/home-tables'
import { LoanPDF } from './loan-pdf'
import { PaymentPDF } from './payment-pdf'
import { paymentAttempReportPDF } from './payment-report'
import { paymentAttemptReportCSV } from '@uti/csv/payment-report'
import { generatePaymentReceipt } from './receipt'

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

export const generateReport = (data: Payment[], type: 'pdf' | 'csv') => { 
  const now       = new Date()
  const year      = now.getFullYear()
  const month     = String(now.getMonth() + 1).padStart(2, '0')
  const day       = String(now.getDate()).padStart(2, '0')
  const hours     = String(now.getHours()).padStart(2, '0')
  const minutes   = String(now.getMinutes()).padStart(2, '0')
  const timestamp = `${year}-${month}-${day}_${hours}-${minutes}`
  const title     = `Report-${timestamp}`

  if (type == 'pdf') paymentAttempReportPDF(data, title)
  else paymentAttemptReportCSV(data, title)
}

// const handleGenerateReceipt = async (attempt: any) => {
//     try {
//       if (id !== null && id !== undefined) {
//         const receipt = await GetPaymentReceipt({ token, paymentId: id })
//         const receiptData = receipt.data
//         const now = new Date()
//         const timestamp = format(now, "yyyy-MM-dd_HH-mm")
//         const fileName = `Payment_Receipt_${timestamp}.pdf`
//         generatePaymentReceipt(paymentData, attempt, receiptData, fileName)
//       } else {
//         console.error("Invalid payment ID")
//       }
//     } catch (error) {
//       console.error("Error generating receipt:", error)
//       // You may want to add a user-friendly error message here, e.g., using a toast notification
//     }
//   }

export const generateReceipt = (paymentData: any, attempt: any, receipt: any) => {
  const now       = new Date()
  const year      = now.getFullYear()
  const month     = String(now.getMonth() + 1).padStart(2, '0')
  const day       = String(now.getDate()).padStart(2, '0')
  const hours     = String(now.getHours()).padStart(2, '0')
  const minutes   = String(now.getMinutes()).padStart(2, '0')
  const timestamp = `${year}-${month}-${day}_${hours}-${minutes}`
  const title     = `Receipt-${timestamp}`

  generatePaymentReceipt(paymentData, attempt, receipt, title)
}