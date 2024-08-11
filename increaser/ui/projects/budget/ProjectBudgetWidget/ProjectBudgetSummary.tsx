import { Match } from '@lib/ui/base/Match'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useCurrentDayTarget } from '../hooks/useCurrentDayTarget'
import { SummaryFrame, SummaryFrameDuration } from './SummaryFrame'
import { useHasReachedFinalWorkday } from '../hooks/useHasReachedFinalWorkday'
import { useProjectDoneMinutesThisWeek } from '../../hooks/useProjectDoneMinutesThisWeek'
import { CheckDoubleIcon } from '@lib/ui/icons/CheckDoubleIcon'
import { CheckIcon } from '@lib/ui/icons/CheckIcon'
import { OctagonXIcon } from '@lib/ui/icons/OctagonXIcon'
import { ThumbsUpIcon } from '@lib/ui/icons/ThumbsUpIcon'
import { useProjectBudgetOffsetColor } from '../hooks/useProjectBudgetOffsetColor'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { TargetIcon } from '@lib/ui/icons/TargetIcon'

export const ProjectBudgetSummary = () => {
  const { goal, id, allocatedMinutesPerWeek } = useCurrentProject()

  const target = useCurrentDayTarget()

  const hasReachedFinalDay = useHasReachedFinalWorkday()

  const doneMinutesThisWeek = useProjectDoneMinutesThisWeek(id)

  const color = useProjectBudgetOffsetColor(id)

  const renderIcon = (Icon: React.FC) => (
    <IconWrapper style={{ color: color.toCssValue() }}>
      <Icon />
    </IconWrapper>
  )

  return (
    <Match
      value={shouldBePresent(goal)}
      doMore={() => {
        if (doneMinutesThisWeek === allocatedMinutesPerWeek) {
          return (
            <SummaryFrame
              weight="500"
              color="contrast"
              icon={renderIcon(CheckDoubleIcon)}
            >
              Congrats! Weekly goal reached!
            </SummaryFrame>
          )
        }

        if (doneMinutesThisWeek > allocatedMinutesPerWeek) {
          return (
            <SummaryFrame icon={renderIcon(CheckDoubleIcon)}>
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
            <SummaryFrame icon={renderIcon(TargetIcon)}>
              <SummaryFrameDuration value={target - doneMinutesThisWeek} /> left
              to reach today's milestone!
            </SummaryFrame>
          )
        }

        return (
          <SummaryFrame icon={renderIcon(CheckIcon)}>
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
            <SummaryFrame weight="500" color="contrast">
              On target! You've stuck precisely to your work limit."
            </SummaryFrame>
          )
        }

        if (doneMinutesThisWeek > allocatedMinutesPerWeek) {
          return (
            <SummaryFrame icon={renderIcon(OctagonXIcon)}>
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
              <SummaryFrame weight="500" color="contrast">
                Exactly met your week's maximum work limit!
              </SummaryFrame>
            )
          }
          return (
            <SummaryFrame icon={renderIcon(ThumbsUpIcon)}>
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
              <SummaryFrame weight="500" color="contrast">
                Spot on! Worked just up to today's cap.
              </SummaryFrame>
            )
          }

          return (
            <SummaryFrame icon={renderIcon(ThumbsUpIcon)}>
              <SummaryFrameDuration value={target - doneMinutesThisWeek} />{' '}
              under today’s limit!
            </SummaryFrame>
          )
        }

        if (doneMinutesThisWeek > target) {
          return (
            <SummaryFrame icon={renderIcon(OctagonXIcon)}>
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
