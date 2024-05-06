import { Button } from '@lib/ui/buttons/Button'
import { useTrackTime } from './TrackTimeProvider'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { defaultIntervalDuration } from './config'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'

export const AddSetPrompt = () => {
  const { activeProjects } = useProjects()
  const { setState, dayInterval } = useTrackTime()

  return (
    <Button
      onClick={() =>
        setState((state) => ({
          ...state,
          currentSet: {
            start:
              dayInterval.end -
              convertDuration(defaultIntervalDuration, 'min', 'ms'),
            end: dayInterval.end,
            projectId: activeProjects[0].id,
          },
        }))
      }
    >
      Add Session
    </Button>
  )
}
