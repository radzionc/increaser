import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { useTrackTime } from './TrackTimeProvider'

export const ProjectSelector = () => {
  const { projectId, setState } = useTrackTime()
  const { activeProjects, projectsRecord } = useProjects()

  return (
    <ExpandableSelector
      style={{ width: 142 }}
      value={projectId}
      onChange={(projectId) => setState((state) => ({ ...state, projectId }))}
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
