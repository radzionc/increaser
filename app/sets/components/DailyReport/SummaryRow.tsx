import { Day } from 'sets/hooks/useGroupedByDayCurrentWeekSets'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { Text } from '@increaser/ui/ui/Text'

interface SummaryRowProps {
  name: string
  days: Day[]
  renderDayStatistic: (day: Day, index: number) => React.ReactNode
}

export const SummaryRow = ({
  name,
  days,
  renderDayStatistic,
}: SummaryRowProps) => {
  const todayStartedAt = useStartOfDay()

  return (
    <>
      <Text color="shy">{name}:</Text>
      {days.map((day, index) => {
        if (day.startsAt > todayStartedAt) return <div />

        return (
          <div style={{ justifySelf: 'center' }} key={index}>
            {day.sets.length ? renderDayStatistic(day, index) : '-'}
          </div>
        )
      })}
    </>
  )
}
