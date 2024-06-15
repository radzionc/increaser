import { useHabitTrackingDaysCount } from '@increaser/ui/habits/hooks/useHabitTrackingDaysCount'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { HabitsReportContent } from './HabitsReportContent'

export const HabitsReport = () => {
  const daysNumber = useHabitTrackingDaysCount()

  if (daysNumber < 2) {
    return (
      <ShyInfoBlock>
        You need to track at least 2 days to see the report.
      </ShyInfoBlock>
    )
  }

  return <HabitsReportContent />
}
