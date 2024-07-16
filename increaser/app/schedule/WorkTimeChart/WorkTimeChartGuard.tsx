import { useMemo } from 'react'
import { useWorkTimeChartPreferences } from './state/useWorkTimeChartPreferences'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'

export const WorkTimeChartGuard = ({
  children,
}: ComponentWithChildrenProps) => {
  const [{ includeToday }] = useWorkTimeChartPreferences()
  const { sets } = useAssertUserState()
  const todayStartedAt = useStartOfDay()

  const message = useMemo(() => {
    if (!sets.length) {
      return `The chart will be available after you've logged some work time.`
    }

    const firstSetStartedAt = sets[0].start

    if (firstSetStartedAt > todayStartedAt && !includeToday) {
      return `The chart will be available after you've tracked work time for a full day.`
    }
  }, [includeToday, sets, todayStartedAt])

  if (message) {
    return <ShyInfoBlock>{message}</ShyInfoBlock>
  }

  return <>{children}</>
}
