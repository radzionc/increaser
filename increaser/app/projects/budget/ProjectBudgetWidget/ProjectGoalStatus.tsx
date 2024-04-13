import { Match } from '@lib/ui/base/Match'
import { useCurrentProject } from '../../components/ProjectView/CurrentProjectProvider'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useCurrentDayTarget } from '../hooks/useCurrentDayTarget'
import { SummaryFrame, SummaryFrameDuration } from './SummaryFrame'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { useProjectDaysAllocation } from '../hooks/useProjectDaysAllocation'

export const ProjectBudgetSummary = () => {
  const { goal, doneMinutesThisWeek, allocatedMinutesPerWeek } =
    useCurrentProject()

  const target = useCurrentDayTarget()

  const weekday = useWeekday()
  const allocation = useProjectDaysAllocation()

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
          doneMinutesThisWeek < allocatedMinutesPerWeek &&
          weekday + 1 >= allocation.length
        ) {
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

        if (doneMinutesThisWeek < target) {
          return (
            <SummaryFrame emoji="🌿">
              <SummaryFrameDuration value={target - doneMinutesThisWeek} />{' '}
              under today’s milestone—well done!
            </SummaryFrame>
          )
        }
      }}
    />
  )
}
