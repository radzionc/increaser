import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { IntervalInput } from '@lib/ui/timeline/IntervalInput'
import { useTrackTime } from './TrackTimeProvider'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { Sessions } from './Sessions'

export const EditIntervalView = () => {
  const { projectsRecord } = useProjects()

  const {
    dayInterval,
    currentSet: potentialCurrentSet,
    setState,
  } = useTrackTime()
  const currentSet = shouldBePresent(potentialCurrentSet)

  return (
    <IntervalInput
      pxInHour={100}
      timelineStartsAt={dayInterval.start}
      timelineEndsAt={dayInterval.end}
      color={projectsRecord[currentSet.projectId].hslaColor}
      value={currentSet}
      onChange={(interval) => setState((state) => ({ ...state, interval }))}
      renderContent={() => <Sessions />}
    />
  )
}
