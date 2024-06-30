import { Button } from '@lib/ui/buttons/Button'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { defaultIntervalDuration } from './config'
import { useTrackTime } from './state/TrackTimeContext'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'

export const AddSetPrompt = () => {
  const activeProjects = useActiveProjects()
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
