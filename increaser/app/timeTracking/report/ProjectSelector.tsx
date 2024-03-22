import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { Text } from '@lib/ui/text'
import { order } from '@lib/utils/array/order'

export const ProjectSelector = () => {
  const { projects, projectsRecord } = useProjects()
  const { activeProjectId, setState } = useTrackedTimeReport()

  const options = [
    null,
    ...order(projects, (p) => p.total, 'desc').map((project) => project.id),
  ]

  return (
    <ExpandableSelector
      value={activeProjectId}
      onChange={(activeProjectId) =>
        setState((state) => ({ ...state, activeProjectId }))
      }
      options={options}
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
