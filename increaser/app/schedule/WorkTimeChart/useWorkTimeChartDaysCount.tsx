import { convertDuration } from '@lib/utils/time/convertDuration'
import { useWorkTimeChartLastDayStartedAt } from './useWorkTimeChartLastDayStartedAt'
import { useWorkTimeChartStartedAt } from './useWorkTimeChartStartedAt'

export const useWorkTimeChartDaysCount = () => {
  const startedAt = useWorkTimeChartStartedAt()
  const endedAt = useWorkTimeChartLastDayStartedAt()

  return convertDuration(endedAt - startedAt, 'ms', 'd') + 1
}
