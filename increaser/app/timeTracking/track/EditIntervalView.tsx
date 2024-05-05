import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { useEffect } from 'react'
import { IntervalInput } from '@lib/ui/timeline/IntervalInput'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useTrackTime } from './TrackTimeProvider'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { Sessions } from './Sessions'
import { defaultIntervalDuration } from './config'

export const EditIntervalView = () => {
  const currentWeekday = useWeekday()
  const { projectsRecord } = useProjects()

  const {
    dayInterval,
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
      renderContent={() => <Sessions />}
    />
  )
}
