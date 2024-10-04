import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { useWorkTimeReportPreferences } from './state/useWorkTimeReportPreferences'

export const WorkTimeReportGuard = ({
  children,
}: ComponentWithChildrenProps) => {
  const [{ includeToday }] = useWorkTimeReportPreferences()
  const { sets } = useUser()
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
