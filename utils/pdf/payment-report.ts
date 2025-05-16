import jsPDF from "jspdf"
import { format } from "date-fns"
import { LOGO_FOOTER, LOGO_PDF as LOGO_ENTITY } from "@uti/var"
import { paymentStatus, getStatusColor, type Status } from "@typ/payment-status"
import {
  tailwindToRGB,
  tailwindToTextRGB,
  formatDateTime,
  formatCurrency,
  PAGE_MARGIN,
  CONTENT_WIDTH,
  CONTENT_START_X,
  MAX_Y,
} from "@uti/payment-report-functions"

export const paymentAttempReportPDF = async (payment: any, fileName: string) => {
  const doc: any = new jsPDF()
  let pageCount = 1
  let yOffset = PAGE_MARGIN.top

  const BOTTOM_MARGIN = 30 

  const addHeader = (pageNum: number, totalPages: number) => {
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Page ${pageNum}/${totalPages}`, 180, 10)
  }

  const addFooter = () => {
    const footerHeight = 6
    doc.setFillColor(22, 22, 22)
    doc.rect(0, doc.internal.pageSize.height - footerHeight, doc.internal.pageSize.width, footerHeight, "F")

    const imageUrl = LOGO_FOOTER
    const imgWidth = 20
    const imgHeight = 5
    const pageWidth = doc.internal.pageSize.width
    const pageHeight = doc.internal.pageSize.height
    doc.addImage(
      imageUrl,
      "PNG",
      (pageWidth - imgWidth) / 2,
      pageHeight - footerHeight / 2 - imgHeight / 2,
      imgWidth,
      imgHeight,
    )
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
    if (yOffset > MAX_Y - BOTTOM_MARGIN) { yOffset = addNewPage() }
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

  const addStatusChip = (success: boolean, x: number, y: number) => {
    const text = success ? "Successful" : "Failed"
    const bgColor = success ? [220, 252, 231] : [254, 226, 226]
    const textColor = success ? [22, 101, 52] : [220, 38, 38]

    doc.setFillColor(...bgColor)
    const chipWidth = doc.getTextWidth(text) + 10
    doc.roundedRect(x, y - 5, chipWidth, 7, 2, 2, "F")

    doc.setTextColor(...textColor)
    doc.setFontSize(9)
    doc.text(text, x + 5, y)
    doc.setTextColor(0, 0, 0)
  }

  const formatValue = (value: any): string => {
    if (value === null || value === undefined || value === "") { return "N/A" }
    else return String(value)
  }

  const imageUrl = LOGO_ENTITY
  doc.addImage(imageUrl, "PNG", CONTENT_START_X, yOffset, 65, 12)
  doc.setFontSize(12)
  doc.text(format(new Date(), "PPP"), CONTENT_START_X + 130, yOffset + 8)
  yOffset += 25

  doc.setFillColor(245, 245, 245)
  doc.roundedRect(CONTENT_START_X - 5, yOffset - 10, CONTENT_WIDTH + 10, 20, 2, 2, "F")

  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text(`Payment #${payment.number_payment}`, CONTENT_START_X, yOffset)

  const statusText = paymentStatus[payment.payment_status.unique_description as Status]
  const statusColorClass = getStatusColor(payment.payment_status.unique_description as Status)
  const [bgColorClass, textColorClass] = statusColorClass.split(" ")
  const bgColor = tailwindToRGB[bgColorClass] || tailwindToRGB["bg-gray-100"]
  const textColorRGB = tailwindToTextRGB[textColorClass] || tailwindToTextRGB["text-default-600"]

  doc.setFillColor(...bgColor)
  const statusWidth = doc.getTextWidth(statusText) + 16
  doc.roundedRect(CONTENT_START_X + CONTENT_WIDTH - statusWidth, yOffset - 6, statusWidth, 8, 2, 2, "F")
  doc.setTextColor(...textColorRGB)
  doc.setFontSize(10)
  doc.text(statusText, CONTENT_START_X + CONTENT_WIDTH - statusWidth + 8, yOffset)
  yOffset += 20

  doc.setTextColor(0, 0, 0)

  addText("Payment Details", CONTENT_START_X, 14, true)
  yOffset += 5
  doc.setFillColor(250, 250, 250)
  doc.roundedRect(CONTENT_START_X - 5, yOffset - 5, CONTENT_WIDTH + 10, 40, 2, 2, "F")

  const details = [
    ["Loan Number", payment.loan_request_number],
    ["Customer Name", `${payment.person.first_name} ${payment.person.last_name}`],
    ["Customer Email", payment.person.email],
    ["Company Name", payment.company_name],
  ]

  details.forEach(([label, value]) => {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(label, CONTENT_START_X + 5, yOffset)
    doc.setTextColor(0, 0, 0)
    doc.setFont("helvetica", "bold")
    doc.text(formatValue(value), CONTENT_START_X + 5, yOffset + 5)
    yOffset += 15
  })

  yOffset += 10
  addDivider()

  addText("Payment Attempts", CONTENT_START_X, 14, true)
  yOffset += 10

  payment.payment_history.forEach((attempt: any) => {
    if (yOffset > MAX_Y - BOTTOM_MARGIN) {
      yOffset = addNewPage()
    }

    doc.setFillColor(245, 245, 245)
    doc.roundedRect(CONTENT_START_X - 5, yOffset - 5, CONTENT_WIDTH + 10, 15, 2, 2, "F")

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text(`Attempt ${attempt.attempt_number} - ${formatValue(attempt.payment_method)}`, CONTENT_START_X + 5, yOffset)

    addStatusChip(attempt.success, CONTENT_START_X + CONTENT_WIDTH - 40, yOffset)
    yOffset += 10

    doc.setFillColor(250, 250, 250)
    const detailsStartY = yOffset
    const detailsHeight = 90
    doc.roundedRect(CONTENT_START_X - 5, yOffset - 5, CONTENT_WIDTH + 10, detailsHeight, 2, 2, "F")

    const attemptDetails = [
      ["Amount Before", formatCurrency(attempt.amount_before)],
      ["Amount After", formatCurrency(attempt.amount_after)],
      ["Payment Method", attempt.payment_method],
      ["Payment Processor", attempt.payment_processor],
      ["Transaction ID", attempt.transaction_id],
      ["Processed At", formatDateTime(attempt.processed_at)],
      ["Created At", formatDateTime(attempt.created_at)],
      ["Returned At", formatDateTime(attempt.returned_at)],
      ["Successful At", formatDateTime(attempt.successful_at)],
      ["Identifier", attempt.identifier],
      ["Identifier 2", attempt.identifier_2],
      ["Status", attempt.status],
    ]

    attemptDetails.forEach(([label, value], idx) => {
      const col = Math.floor(idx / 6)
      const row = idx % 6
      const x = CONTENT_START_X + 5 + col * (CONTENT_WIDTH / 2)
      const y = yOffset + row * 15

      doc.setFont("helvetica", "normal")
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.text(label + ":", x, y)
      doc.setTextColor(0, 0, 0)
      doc.setFont("helvetica", "bold")
      doc.text(formatValue(value), x + doc.getTextWidth(label + ": "), y)
    })

    yOffset = detailsStartY + detailsHeight + 5

    if (yOffset > MAX_Y - BOTTOM_MARGIN && attempt.associated_payment) {
      yOffset = addNewPage()
    }

    if (attempt.associated_payment) {
      addText("Associated Payment", CONTENT_START_X + 5, 11, true)
      doc.setFillColor(250, 250, 250)
      doc.roundedRect(CONTENT_START_X - 5, yOffset - 5, CONTENT_WIDTH + 10, 52, 2, 2, "F")

      Object.entries(attempt.associated_payment).forEach(([key, value]) => {
        const dateFields = ["created_at", "successful_at", "returned_at"]

        if (dateFields.includes(key)) {
          value = formatDateTime(value as string)
        }

        const formattedKey = key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

        if (key !== "return_code") {
          doc.setFont("helvetica", "normal")
          doc.setFontSize(9)
          doc.setTextColor(100, 100, 100)
          doc.text(formattedKey + ":", CONTENT_START_X + 10, yOffset)
          doc.setTextColor(0, 0, 0)
          doc.setFont("helvetica", "bold")
          doc.text(formatValue(value), CONTENT_START_X + 10 + doc.getTextWidth(formattedKey + ": "), yOffset)
          yOffset += 7
        }
      })
      yOffset += 5
    }
    yOffset += 15
  })

  if (yOffset > MAX_Y - BOTTOM_MARGIN) { addNewPage() }

  const p = doc.internal.pages.length - 1

  for (let i = 1; i <= p; i++) {
    doc.setPage(i)
    addHeader(i, p)
    addFooter()
  }

  doc.save(fileName)
}