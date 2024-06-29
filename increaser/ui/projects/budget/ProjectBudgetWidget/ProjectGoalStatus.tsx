import { Match } from '@lib/ui/base/Match'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useCurrentDayTarget } from '../hooks/useCurrentDayTarget'
import { SummaryFrame, SummaryFrameDuration } from './SummaryFrame'
import { useHasReachedFinalWorkday } from '../hooks/useHasReachedFinalWorkday'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useMemo } from 'react'
import { useCurrentWeekSets } from '../../../sets/hooks/useCurrentWeekSets'

export const ProjectBudgetSummary = () => {
  const { goal, id, allocatedMinutesPerWeek } = useCurrentProject()

  const target = useCurrentDayTarget()

  const hasReachedFinalDay = useHasReachedFinalWorkday()

  const currentWeekSets = useCurrentWeekSets()

  const doneMinutesThisWeek = useMemo(
    () =>
      Math.round(
        convertDuration(
          getSetsDuration(
            currentWeekSets.filter(({ projectId }) => projectId === id),
          ),
          'ms',
          'min',
        ),
      ),
    [],
  )

  return (
    <Match
      value={shouldBePresent(goal)}
      doMore={() => {
        if (doneMinutesThisWeek === allocatedMinutesPerWeek) {
          return (
            <SummaryFrame weight="semibold" color="contrast" emoji="🎉">
              Congrats! Weekly goal reached!
            </SummaryFrame>
          )
        }

        if (doneMinutesThisWeek > allocatedMinutesPerWeek) {
          return (
            <SummaryFrame emoji="🎉">
              Weekly goal exceeded by{' '}
              <SummaryFrameDuration
                value={doneMinutesThisWeek - allocatedMinutesPerWeek}
              />
              !
            </SummaryFrame>
          )
        }

        if (doneMinutesThisWeek < target) {
          return (
            <SummaryFrame emoji="🎯">
              <SummaryFrameDuration value={target - doneMinutesThisWeek} /> left
              to reach today's milestone!
            </SummaryFrame>
          )
        }

        return (
          <SummaryFrame emoji="💪">
            Today's milestone passed!{' '}
            <SummaryFrameDuration
              value={allocatedMinutesPerWeek - doneMinutesThisWeek}
            />{' '}
            to reach your weekly target.
          </SummaryFrame>
        )
      }}
      doLess={() => {
        if (doneMinutesThisWeek === allocatedMinutesPerWeek) {
          return (
            <SummaryFrame weight="semibold" color="contrast" emoji="🔖">
              On target! You've stuck precisely to your work limit."
            </SummaryFrame>
          )
        }

        if (doneMinutesThisWeek > allocatedMinutesPerWeek) {
          return (
            <SummaryFrame emoji="🛑">
              <SummaryFrameDuration
                value={doneMinutesThisWeek - allocatedMinutesPerWeek}
              />{' '}
              over this week. Time to relax and recharge!
            </SummaryFrame>
          )
        }

        if (
          doneMinutesThisWeek <= allocatedMinutesPerWeek &&
          hasReachedFinalDay
        ) {
          if (doneMinutesThisWeek === allocatedMinutesPerWeek) {
            return (
              <SummaryFrame weight="semibold" color="contrast" emoji="👌">
                Exactly met your week's maximum work limit!
              </SummaryFrame>
            )
          }
          return (
            <SummaryFrame emoji="👍">
              Under limit by{' '}
              <SummaryFrameDuration
                value={allocatedMinutesPerWeek - doneMinutesThisWeek}
              />
              ! Great job this week.
            </SummaryFrame>
          )
        }

        if (doneMinutesThisWeek <= target) {
          if (doneMinutesThisWeek === target) {
            return (
              <SummaryFrame weight="semibold" color="contrast" emoji="✅">
                Spot on! Worked just up to today's cap.
              </SummaryFrame>
            )
          }

          return (
            <SummaryFrame emoji="🌿">
              <SummaryFrameDuration value={target - doneMinutesThisWeek} />{' '}
              under today’s milestone—well done!
            </SummaryFrame>
          )
        }

        if (doneMinutesThisWeek > target) {
          return (
            <SummaryFrame emoji="🚨">
              You've gone over today's work limit by{' '}
              <SummaryFrameDuration value={doneMinutesThisWeek - target} />.
              Time to unwind!
            </SummaryFrame>
          )
        }
      }}
    />
  )
}
