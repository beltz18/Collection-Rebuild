import { Payment } from '@typ/home-tables'
import { format } from 'date-fns'

export const PaymentCSV = (data: Payment[] | undefined, fileName: string) => {
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

  const csvContent = [
    title,
    '',
    headers.join(','),
    ...rows?.map((row: any[]) => row.join(',')),
  ]
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  link.click()
}