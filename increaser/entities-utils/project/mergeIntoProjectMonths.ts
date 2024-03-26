import { ProjectMonth } from '@increaser/entities/timeTracking'

export const mergeIntoProjectMonths = (
  months: ProjectMonth[],
  newMonth: ProjectMonth,
) => {
  const existingMonth = months.find(
    (month) => month.year === newMonth.year && month.month === newMonth.month,
  )

  if (existingMonth) {
    existingMonth.seconds += newMonth.seconds
  } else {
    months.push(newMonth)
  }

  return months
}
