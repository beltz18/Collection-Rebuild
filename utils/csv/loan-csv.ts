import { Loan } from '@typ/home-tables'

export const LoanCSV = (data: Loan[], fileName: string) => {
  const title = 'Loan Request Report'
  const headers = [
    'ID', 
    'Customer', 
    'Date', 
    'Approved', 
    'Term', 
    'Status'
  ]

  const rows: any | undefined = data?.map(item => {
    return [
      item.loan_request_id,
      `${item.person?.first_name} ${item.person?.last_name}`,
      item.request_date,
      `${parseFloat(String(item.approved_amount)).toFixed(2)} ${item.currency?.code}`,
      item.term,
      item.status?.description,
    ]
  })

  const csvContent = [
    title,
    '',
    headers.join(','),
    ...rows?.map((row: any[]) => row.join(','))
  ]
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  link.click()
}