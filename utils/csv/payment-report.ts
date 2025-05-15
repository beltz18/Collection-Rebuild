import { 
  formatCurrency, 
  formatDateTime 
} from "@uti/payment-report-functions"

export const paymentAttemptReportCSV = (payment: any, fileName: string) => {
  let csvContent = "Payment Details\n"
  csvContent += `Payment Number,${payment.number_payment}\n`
  csvContent += `Loan Number,${payment.loan_request_number}\n`
  csvContent += `Customer Name,${payment.person.first_name} ${payment.person.last_name}\n`
  csvContent += `Customer Email,${payment.person.email}\n`
  csvContent += `Company Name,${payment.company_name}\n\n`

  csvContent += "Payment Attempts\n"
  csvContent += "Attempt Number,Status,Amount Before,Amount After,Payment Method,Payment Processor,"
  csvContent += "Transaction ID,Processed At,Created At,Returned At,Successful At,Identifier,Identifier 2,Status,"
  csvContent += "Associated Payment ID,Associated Payment Status,Associated Payment Created At,"
  csvContent +=
    "Return Code,Return Title,Return Description,Return Title (EN),Return Description (EN),Return Stop Step\n"

  console.log(payment);

  payment.payment_history.forEach((attempt: any) => {
    const row = [
      attempt.attempt_number,
      attempt.success ? "Successful" : "Failed",
      formatCurrency(attempt.amount_before),
      formatCurrency(attempt.amount_after),
      attempt.payment_method,
      attempt.payment_processor,
      attempt.transaction_id == null ? "N/A" : attempt.transaction_id,
      formatDateTime(attempt.processed_at),
      formatDateTime(attempt.created_at),
      formatDateTime(attempt.returned_at),
      formatDateTime(attempt.successful_at),
      attempt.identifier == null ? "N/A" : attempt.identifier,
      attempt.identifier_2 == null ? "N/A" : attempt.identifier_2,
      attempt.status == null ? "N/A" : attempt.status,
    ]

    if (attempt.associated_payment) {
      row.push(
        attempt.associated_payment.id == null ? "N/A" : attempt.associated_payment.id,
        attempt.associated_payment.status == null ? "N/A" : attempt.associated_payment.status,
        formatDateTime(attempt.associated_payment.created_at),
      )
    } else {
      row.push("", "", "")
    }

    if (attempt.associated_payment && attempt.associated_payment.return_code) {
      const returnCode = attempt.associated_payment.return_code
      row.push(
        returnCode.code || "",
        returnCode.title || "",
        returnCode.description || "",
        returnCode.title_en || "",
        returnCode.description_en || "",
        returnCode.stop_step !== undefined ? String(returnCode.stop_step) : "",
      )
    } else {
      row.push("", "", "", "", "", "")
    }

    csvContent += row.join(",") + "\n"
  })

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.href = url
  link.setAttribute("download", fileName)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}