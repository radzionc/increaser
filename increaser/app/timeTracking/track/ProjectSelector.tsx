import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { useTrackTime } from './state/TrackTimeContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'

export const ProjectSelector = () => {
  const { currentSet, setState } = useTrackTime()
  const { projectId } = shouldBePresent(currentSet)
  const { projects } = useAssertUserState()
  const activeProjects = useActiveProjects()

  return (
    <ExpandableSelector
      style={{ width: 142 }}
      value={projectId}
      onChange={(projectId) =>
        setState((state) => ({
          ...state,
          currentSet: {
            ...shouldBePresent(state.currentSet),
            projectId,
          },
        }))
      }
      options={activeProjects.map((project) => project.id)}
      getOptionKey={(option) => option}
      getOptionName={(option) => projects[option].name}
      renderOption={(option) => (
        <>
          {option && <Text color="contrast">{projects[option].emoji}</Text>}
          <Text>{option ? projects[option].name : 'All projects'}</Text>
        </>
      )}
    />
  )
}
