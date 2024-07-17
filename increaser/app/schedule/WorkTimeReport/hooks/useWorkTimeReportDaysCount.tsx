import { convertDuration } from '@lib/utils/time/convertDuration'
import { useWorkTimeReportStartedAt } from './useWorkTimeReportStartedAt'
import { useWorkTimeReportLastDayStartedAt } from './useWorkTimeReportLastDayStartedAt'

export const useWorkTimeReportDaysCount = () => {
  const startedAt = useWorkTimeReportStartedAt()
  const endedAt = useWorkTimeReportLastDayStartedAt()

  return convertDuration(endedAt - startedAt, 'ms', 'd') + 1
}
