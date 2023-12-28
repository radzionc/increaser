import { useTheme } from 'styled-components'
import { BasicBarChart } from '@increaser/app/ui/BasicBarChart'
import { MIN_IN_HOUR, getShortWeekday } from '@lib/utils/time'
import { getWeekTimeAllocation } from '@increaser/app/weekTimeAllocation/helpers/getWeekTimeAllocation'

interface Props {
  workdayMinutes: number
  weekendMinutes: number
}

export const WorkBudgetBarChart = ({
  workdayMinutes,
  weekendMinutes,
}: Props) => {
  const theme = useTheme()

  return (
    <BasicBarChart
      height={140}
      min={6 * MIN_IN_HOUR}
      bars={getWeekTimeAllocation(workdayMinutes, weekendMinutes).map(
        (value, index) => ({
          label: getShortWeekday(index),
          segments: [
            {
              color: index > 4 ? theme.colors.idle : theme.colors.success,
              value,
            },
          ],
        }),
      )}
    />
  )
}
