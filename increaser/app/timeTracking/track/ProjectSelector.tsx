import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { useTrackTime } from './TrackTimeProvider'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export const ProjectSelector = () => {
  const { currentSet, setState } = useTrackTime()
  const { projectId } = shouldBePresent(currentSet)
  const { activeProjects, projectsRecord } = useProjects()

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
      renderOption={(option) => (
        <>
          <Text color="contrast">{projectsRecord[option].emoji}</Text>
          <Text>{option ? projectsRecord[option].name : 'All projects'}</Text>
        </>
      )}
    />
  )
}
