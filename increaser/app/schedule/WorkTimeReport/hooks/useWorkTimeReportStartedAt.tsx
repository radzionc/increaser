import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useMemo } from 'react'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { startOfDay } from 'date-fns'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useWorkTimeReportLastDayStartedAt } from './useWorkTimeReportLastDayStartedAt'
import { workTimeChartConfig } from '../config'

export const useWorkTimeReportStartedAt = () => {
  const { sets } = useAssertUserState()
  const lastDayStartedAt = useWorkTimeReportLastDayStartedAt()

  return useMemo(() => {
    const firstSetStartedAt = shouldBePresent(sets[0]).start
    const firstSetDayStartedAt = startOfDay(firstSetStartedAt).getTime()
    const maxStartedAt =
      lastDayStartedAt -
      convertDuration(workTimeChartConfig.maxDays - 1, 'd', 'ms')

    return Math.max(firstSetDayStartedAt, maxStartedAt)
  }, [lastDayStartedAt, sets])
}
