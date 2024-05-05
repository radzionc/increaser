import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { useEffect } from 'react'
import { IntervalInput } from '@lib/ui/timeline/IntervalInput'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { WorkSession } from '../../sets/components/DayOverview/WorkBlocks/WorkSession'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useTrackTime } from './TrackTimeProvider'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

const defaultIntervalDuration = 30

export const AddSessionView = () => {
  const currentWeekday = useWeekday()
  const { projectsRecord } = useProjects()

  const {
    dayInterval,
    sets,
    weekday,
    projectId,
    interval: potentialInterval,
    setState,
  } = useTrackTime()

  const interval = shouldBePresent(potentialInterval)

  const { finishWorkAt } = useAssertUserState()

  useEffect(() => {
    if (interval.start < dayInterval.start || interval.end > dayInterval.end) {
      const end =
        weekday < currentWeekday
          ? dayInterval.start + convertDuration(finishWorkAt, 'min', 'ms')
          : Date.now()
      const interval = {
        end,
        start: end - convertDuration(defaultIntervalDuration, 'min', 'ms'),
      }

      setState((state) => ({ ...state, interval }))
    }
  }, [
    currentWeekday,
    dayInterval.end,
    dayInterval.start,
    finishWorkAt,
    interval,
    setState,
    weekday,
  ])

  return (
    <IntervalInput
      pxInHour={100}
      timelineStartsAt={dayInterval.start}
      timelineEndsAt={dayInterval.end}
      color={projectsRecord[projectId].hslaColor}
      value={interval}
      onChange={(interval) => setState((state) => ({ ...state, interval }))}
      renderContent={({ msToPx }) => {
        return sets.map((set, index) => {
          return (
            <WorkSession
              key={index}
              set={set}
              showIdentifier
              style={{
                top: msToPx(set.start - dayInterval.start),
                height: msToPx(set.end - set.start),
              }}
            />
          )
        })
      }}
    />
  )
}
