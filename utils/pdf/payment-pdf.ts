import { jsPDF }     from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import { format }    from 'date-fns'
import { Payment }   from '@typ/home-tables'
import { 
  LOGO_FOOTER, 
  LOGO_PDF 
} from '@uti/var'

export const PaymentPDF = (data: Payment[] | undefined, fileName: string) => {
  const doc: any = new jsPDF({ orientation: 'landscape' })

  const imageUrl    = LOGO_PDF
  const imageWidth  = 65
  const imageHeight = 12
  const imageX      = 10
  const imageY      = 10
  
  doc.addImage(imageUrl, 'PNG', imageX, imageY, imageWidth, imageHeight)

  const currentDate = format(new Date(), 'PPP')

  const dateX = 245
  const dateY = imageY + 8

  const textColor = [31, 41, 55]
  doc.setFontSize(12)
  doc.setTextColor(...textColor)
  doc.text(currentDate, dateX, dateY)

  const addHeader = (pageNum: number, totalPages: number) => {
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Page ${pageNum}/${totalPages}`, 270, 10)
  }

  const addFooter = () => {
    const footerHeight = 6
    doc.setFillColor(22, 22, 22)
    doc.rect(0, doc.internal.pageSize.height - footerHeight, doc.internal.pageSize.width, footerHeight, 'F')
    
    const imageUrl   = LOGO_FOOTER
    const imgWidth   = 20
    const imgHeight  = 5
    const pageWidth  = doc.internal.pageSize.width
    const pageHeight = doc.internal.pageSize.height
    doc.addImage(imageUrl, "PNG", (pageWidth - imgWidth) / 2, pageHeight - footerHeight / 2 - imgHeight / 2, imgWidth, imgHeight)
  }

  const title = 'Loan Payment Report'
  const headers = [
    'ID',
    'Customer',
    'Status',
    'Amount',
    'Interest',
    'Due Date',
    'Payment Date',
    'Loan Request',
    'Company Name',
    'Payment Number',
  ]

  doc.setFontSize(18)
  doc.setTextColor(...textColor) 
  doc.text(title, 115, 40) 

  const rows: any | undefined = data?.map(item => {
    const due_date     = item.due_date ? format(new Date(item.due_date), 'PP') : 'Not set'
    const payment_date = item.real_payment_date ? format(new Date(item.real_payment_date), 'PP') : 'Not paid yet'

    return [
      item.loan_payment_id || item.id,
      `${item.person.first_name} ${item.person.last_name}`,
      item.payment_status.unique_description,
      `$${parseFloat(item.amount).toFixed(2)}`,
      `$${parseFloat(item.interest_amount).toFixed(2)}`,
      due_date,
      payment_date,
      item.loan_request_number,
      item.company_name,
      item.number_payment,
    ]
  })

  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 60,
  })

  const p = doc.internal.pages.length-1

  for (let i = 1; i <= p; i++) {
    doc.setPage(i)
    addHeader(i, p)
    addFooter()
  }

  doc.save(fileName)
}