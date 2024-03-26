import { ProjectWeek } from '@increaser/entities/timeTracking'

export const mergeIntoProjectWeeks = (
  weeks: ProjectWeek[],
  newWeek: ProjectWeek,
) => {
  const existingWeek = weeks.find(
    (week) => week.year === newWeek.year && week.week === newWeek.week,
  )
  if (existingWeek) {
    existingWeek.seconds += newWeek.seconds
  } else {
    weeks.push(newWeek)
  }
  return weeks
}
