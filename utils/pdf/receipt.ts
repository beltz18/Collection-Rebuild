import jsPDF from "jspdf"
import { format } from 'date-fns'
import { 
  LOGO_FOOTER, 
  LOGO_PDF as LOGO_ENTITY 
} from "@uti/var"
import { 
  PAGE_MARGIN, 
  MAX_Y, 
  CONTENT_START_X, 
  CONTENT_WIDTH 
} from "@uti/payment-report-functions"
import { 
  formatDateTimes, 
  formatCurrencys 
} from "@uti/payment-receipt-functions"

export const generatePaymentReceipt = async (payment: any, attempt: any, receiptData: any, fileName: string) => {
  const doc = new jsPDF()
  let pageCount = 1
  let yOffset = PAGE_MARGIN.top

  const addHeader = (pageNum: number, totalPages: number) => {
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Page ${pageNum}/${totalPages}`, 180, 10)
  }

  const addFooter = () => {
    const footerHeight = 6
    doc.setFillColor(22, 22, 22)
    doc.rect(0, doc.internal.pageSize.height - footerHeight, doc.internal.pageSize.width, footerHeight, 'F')
    
    const imageUrl = LOGO_FOOTER
    const imgWidth = 20
    const imgHeight = 5
    const pageWidth = doc.internal.pageSize.width
    const pageHeight = doc.internal.pageSize.height
    doc.addImage(imageUrl, "PNG", (pageWidth - imgWidth) / 2, pageHeight - footerHeight / 2 - imgHeight / 2, imgWidth, imgHeight)
  }

  const addNewPage = () => {
    doc.addPage()
    pageCount++
    yOffset = PAGE_MARGIN.top
    addHeader(pageCount, pageCount) 
    addFooter() 
    return yOffset
  }

  const addText = (text: string, x: number, fontSize = 11, isBold = false, maxWidth?: number) => {
    if (yOffset > MAX_Y - 20) {
      yOffset = addNewPage()
    }
    doc.setFontSize(fontSize)
    doc.setFont("helvetica", isBold ? "bold" : "normal")

    if (maxWidth) {
      const lines = doc.splitTextToSize(String(text), maxWidth)
      doc.text(lines, x, yOffset)
      yOffset += 7 * lines.length
    } else {
      doc.text(String(text), x, yOffset)
      yOffset += 7
    }
  }
  const addDivider = () => {
    doc.setDrawColor(230, 230, 230)
    doc.setLineWidth(0.5)
    doc.line(CONTENT_START_X, yOffset, CONTENT_START_X + CONTENT_WIDTH, yOffset)
    yOffset += 10
  }

  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  const titleText = "PAYMENT RECEIPT"
  const titleWidth = doc.getTextWidth(titleText)
  doc.text(titleText, (210 - titleWidth) / 2, yOffset)
  yOffset += 15

  const imageUrl = LOGO_ENTITY
  if (imageUrl) {
    doc.addImage(imageUrl, "PNG", CONTENT_START_X, yOffset, 40, 8)
  }
  doc.setFontSize(10)
  doc.text(format(new Date(), "PPP"), CONTENT_START_X + 130, yOffset + 5)
  yOffset += 20

  doc.setDrawColor(200, 200, 200)
  doc.setFillColor(250, 250, 250)
  doc.roundedRect(CONTENT_START_X, yOffset, CONTENT_WIDTH, 12, 3, 3, "F")
  doc.setFontSize(9)
  
  doc.setFont("helvetica", "normal")
  doc.text("Loan Number:", CONTENT_START_X + 5, yOffset + 7)
  
  doc.setFont("helvetica", "bold")
  const loanNumberValue = payment.loan_request_number
  const loanNumberWidth = doc.getTextWidth(loanNumberValue)
  doc.text(loanNumberValue, CONTENT_START_X + CONTENT_WIDTH - loanNumberWidth - 5, yOffset + 7)

  yOffset += 20

  doc.setDrawColor(200, 200, 200)
  doc.setFillColor(250, 250, 250)
  doc.roundedRect(CONTENT_START_X, yOffset, CONTENT_WIDTH, 65, 3, 3, "F")
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")

  const labelWidth = 25
  const valueStartX = CONTENT_START_X + labelWidth + 5
  const amountStartX = CONTENT_START_X + 100

  const customerInfo = [
    { label: "Customer:",    value: receiptData.person_info.name },
    { label: "Email:",       value: payment.person.email },
    { label: "Customer Address:",     value: receiptData.person_info.address },
    { label: "Company:",     value: receiptData.company_info.name },
    { label: "Company Address:",   value: receiptData.company_info.address || "Address not available" }
  ]

  const amounts = [
    { label: "Amount Paid:", value: formatCurrencys(parseFloat(receiptData.payment_info.amount_paid)) },
    { label: "Remaining Principal:", value: formatCurrencys(parseFloat(receiptData.payment_info.remaining_balance.principal)) },
    { label: "Remaining Interest:", value: formatCurrencys(parseFloat(receiptData.payment_info.remaining_balance.interest)) },
    { label: "Total Remaining:", value: formatCurrencys(parseFloat(receiptData.payment_info.remaining_balance.total)) }
  ]

  const renderWrappedText = (text: string, x: number, y: number, maxWidth: number): number => {
    if (!text) return y

    const lines = doc.splitTextToSize(text, maxWidth)
    lines.forEach((line: string, index: number) => {
      doc.text(line, x, y + (index * 5))
    })
    return y + (lines.length * 5)
  }

  let currentY = yOffset + 7
  
  customerInfo.forEach((item) => {
    doc.setFont("helvetica", "normal")
    const maxLabelWidth = valueStartX - CONTENT_START_X - 10 
    const newYLabel = renderWrappedText(item.label, CONTENT_START_X + 5, currentY, maxLabelWidth)
    doc.setFont("helvetica", "bold")
    const maxValueWidth = amountStartX - valueStartX - 10 
    const newYValue = renderWrappedText(item.value, valueStartX, currentY, maxValueWidth)
    currentY = Math.max(newYLabel, newYValue) + 7 
  })

  currentY = yOffset + 7

  amounts.forEach((item) => {
    doc.setFont("helvetica", "normal")
    doc.text(item.label, amountStartX, currentY)
    doc.setFont("helvetica", "bold")
    const valueWidth = doc.getTextWidth(item.value)
    doc.text(item.value, CONTENT_START_X + CONTENT_WIDTH - valueWidth - 5, currentY)
    
    currentY += 7
  })

  yOffset += 85 
  addDivider()

  addText("Payment Details", CONTENT_START_X, 14, true)
  yOffset += 5

  const paymentDetails = [
    ["Payment Status:", "Successful"],
    ["Payment Method:", attempt.payment_method],
    ["Transaction ID:", attempt.transaction_id == null ? "N/A" : attempt.transaction_id],
    ["Payment Processor:", attempt.payment_processor],
    ["Processed At:", formatDateTimes(attempt.processed_at)],
  ]

  paymentDetails.forEach(([label, value]) => {
    if (yOffset > MAX_Y - 20) {
      doc.addPage()
      yOffset = PAGE_MARGIN.top
    }

    doc.setFillColor(250, 250, 250)
    doc.rect(CONTENT_START_X, yOffset - 4, CONTENT_WIDTH, 10, "F")

    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.text(label, CONTENT_START_X + 5, yOffset + 2)

    doc.setFont("helvetica", "bold")
    const valueStr = String(value)
    const maxWidth = CONTENT_WIDTH - 80
    if (doc.getTextWidth(valueStr) > maxWidth) {
      const lines = doc.splitTextToSize(valueStr, maxWidth)
      doc.text(lines, CONTENT_START_X + 80, yOffset + 2)
      yOffset += 7 * lines.length
    } else {
      doc.text(valueStr, CONTENT_START_X + 80, yOffset + 2)
      yOffset += 10
    }
  })

  yOffset += 10
  addDivider()

  if (attempt.associated_payment) {
    if (yOffset > MAX_Y - 40) {
      doc.addPage()
      yOffset = PAGE_MARGIN.top
    }

    addText("Additional Information", CONTENT_START_X, 14, true)
    yOffset += 5

    Object.entries(attempt.associated_payment)
      .filter(([key]) => key !== "id") 
      .forEach(([key, value]) => {
        if (key !== "return_code" && value !== null && value !== undefined) {
          if (yOffset > MAX_Y - 15) {
            doc.addPage()
            yOffset = PAGE_MARGIN.top
          }

          let displayValue = String(value)
          if (typeof value === "string" && (key.includes("date") || key.includes("_at"))) {
            displayValue = formatDateTimes(value) || "N/A"
          }

          doc.setFillColor(250, 250, 250)
          doc.rect(CONTENT_START_X, yOffset - 4, CONTENT_WIDTH, 10, "F")

          doc.setFont("helvetica", "normal")
          doc.setFontSize(9)
          const formattedKey = key
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")

          doc.text(formattedKey + ":", CONTENT_START_X + 5, yOffset + 2)

          doc.setFont("helvetica", "bold")
          const maxWidth = CONTENT_WIDTH - 80
          if (doc.getTextWidth(displayValue) > maxWidth) {
            const lines = doc.splitTextToSize(displayValue, maxWidth)
            doc.text(lines, CONTENT_START_X + 80, yOffset + 2)
            yOffset += 7 * lines.length
          } else {
            doc.text(displayValue, CONTENT_START_X + 80, yOffset + 2)
            yOffset += 10
          }
        }
      })

    yOffset += 10
    addDivider()
  }

  if (yOffset > MAX_Y - 40) {
    addNewPage()
    yOffset = PAGE_MARGIN.top
  }

  doc.setFontSize(8)
  doc.setFont("helvetica", "italic")
  const disclaimer =
    "This balance represents all fees due as of this date only. This payoff figure is not valid after the date of this receipt."
  const disclaimerLines = doc.splitTextToSize(disclaimer, CONTENT_WIDTH)
  doc.text(disclaimerLines, CONTENT_START_X, yOffset)
  yOffset += 15

  doc.setDrawColor(0, 0, 0)
  doc.line(CONTENT_START_X, yOffset, CONTENT_START_X + 70, yOffset)
  doc.line(CONTENT_START_X + 100, yOffset, CONTENT_START_X + CONTENT_WIDTH, yOffset)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(8)
  doc.text("Debtor's Signature", CONTENT_START_X, yOffset + 5)
  doc.text("Received By: Auto Extension", CONTENT_START_X + 100, yOffset + 5)

  yOffset += 15
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  const thankYouText = "Thank You for Your Payment"
  const thankYouWidth = doc.getTextWidth(thankYouText)
  doc.text(thankYouText, (210 - thankYouWidth) / 2, yOffset)

  const p = doc.internal.pages.length-1

  for (let i = 1; i <= p; i++) {
    doc.setPage(i)
    addHeader(i, p)
    addFooter()
  }

  doc.save(fileName)
}