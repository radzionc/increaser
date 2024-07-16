import { useWorkTimeChartPreferences } from './state/useWorkTimeChartPreferences'
import { useMemo } from 'react'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { convertDuration } from '@lib/utils/time/convertDuration'

export const useWorkTimeChartLastDayStartedAt = () => {
  const [{ includeToday }] = useWorkTimeChartPreferences()
  const todayStartedAt = useStartOfDay()

  return useMemo(() => {
    return includeToday
      ? todayStartedAt
      : todayStartedAt - convertDuration(1, 'd', 'ms')
  }, [includeToday, todayStartedAt])
}
