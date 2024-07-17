import { VStack } from '@lib/ui/layout/Stack'

import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { useMemo } from 'react'
import { getAverage } from '@lib/utils/math/getAverage'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { Statistic } from '@lib/ui/layout/Statistic'
import { Panel } from '@lib/ui/panel/Panel'
import { Match } from '@lib/ui/base/Match'
import { useWorkTimeReportDays } from './hooks/useWorkTimeReportDays'
import { Interval } from '@lib/utils/interval/Interval'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { pluralize } from '@lib/utils/pluralize'
import { toPercents } from '@lib/utils/toPercents'

const getFormattedAvgWorkdayStart = (days: Interval[]) => {
  const average = getAverage(days.map(({ start }) => start))

  return formatDailyEventTime(average)
}

const getFormattedAvgWorkdayEnd = (days: Interval[]) => {
  const average = getAverage(days.map(({ end }) => end))

  return formatDailyEventTime(average)
}

const workTimeStats = ['startedWorkAt', 'finishedWorkAt', 'workedLate'] as const
export type WorkTimeStat = (typeof workTimeStats)[number]

export const WorkTimeStats = () => {
  const days = useWorkTimeReportDays()
  const { finishWorkAt } = useAssertUserState()
  const workDays = useMemo(() => days.filter((day) => day !== null), [days])

  return (
    <VStack gap={16}>
      <UniformColumnGrid gap={16} minChildrenWidth={120}>
        {workTimeStats.map((stat) => (
          <Panel key={stat}>
            <Match
              key={stat}
              value={stat}
              startedWorkAt={() => (
                <Statistic
                  title="Start work"
                  value={getFormattedAvgWorkdayStart(workDays)}
                />
              )}
              finishedWorkAt={() => (
                <Statistic
                  title="End work"
                  value={getFormattedAvgWorkdayEnd(workDays)}
                />
              )}
              workedLate={() => {
                const count = workDays.filter(
                  ({ end }) => end > finishWorkAt,
                ).length

                return (
                  <Statistic
                    title="Worked late"
                    value={
                      count > 0
                        ? `${pluralize(count, 'time')} (${toPercents(
                            count / workDays.length,
                          )})`
                        : undefined
                    }
                  />
                )
              }}
            />
          </Panel>
        ))}
      </UniformColumnGrid>
    </VStack>
  )
}
