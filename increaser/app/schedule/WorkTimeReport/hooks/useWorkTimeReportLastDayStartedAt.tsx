import { useMemo } from 'react'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useWorkTimeReportPreferences } from '../state/useWorkTimeReportPreferences'

export const useWorkTimeReportLastDayStartedAt = () => {
  const [{ includeToday }] = useWorkTimeReportPreferences()
  const todayStartedAt = useStartOfDay()

  return useMemo(() => {
    return includeToday
      ? todayStartedAt
      : todayStartedAt - convertDuration(1, 'd', 'ms')
  }, [includeToday, todayStartedAt])
}
