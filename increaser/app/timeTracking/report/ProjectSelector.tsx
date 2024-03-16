import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { Text } from '@lib/ui/text'

export const ProjectSelector = () => {
  const { activeProjects, inactiveProjects, projectsRecord } = useProjects()
  const { activeProjectId, setState } = useTrackedTimeReport()

  return (
    <ExpandableSelector
      style={{ width: 132 }}
      value={activeProjectId}
      onChange={(activeProjectId) =>
        setState((state) => ({ ...state, activeProjectId }))
      }
      options={[
        null,
        ...[...activeProjects, ...inactiveProjects].map(
          (project) => project.id,
        ),
      ]}
      getOptionKey={(option) => (option ? option : 'all')}
      renderOption={(option) => (
        <>
          {option && (
            <Text color="contrast">{projectsRecord[option].emoji}</Text>
          )}
          <Text>{option ? projectsRecord[option].name : 'All projects'}</Text>
        </>
      )}
    />
  )
}
