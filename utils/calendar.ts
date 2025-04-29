export const monthToNumber = (month: string): number => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return months.indexOf(month) + 1
}

export const getCalendarWeekOfMonth = (date: Date): number => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const startOffset = (firstDay.getDay() + 6) % 7
  const adjustedDate = date.getDate() + startOffset
  return Math.ceil(adjustedDate / 7)
}
