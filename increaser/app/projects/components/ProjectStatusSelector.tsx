import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useUpdateProjectMutation } from '@increaser/ui/projects/api/useUpdateProjectMutation'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'

import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { projectsStatuses } from '@increaser/entities/Project'
import { ProjectStatusOption } from './ProjectStatusOption'

export const ProjectStatusSelector = () => {
  const { mutate } = useUpdateProjectMutation()
  const { status, id } = useCurrentProject()

  return (
    <ExpandableSelector
      style={{ width: 132 }}
      openerContent={<ProjectStatusOption value={status} />}
      value={status}
      onChange={(status) => {
        const input: ApiInterface['updateProject']['input'] = {
          id,
          fields: { status },
        }
        if (status !== 'active') {
          input.fields.allocatedMinutesPerWeek = 0
        }
        mutate(input)
      }}
      options={projectsStatuses}
      getOptionKey={(option) => option}
      renderOption={(option) => <ProjectStatusOption value={option} />}
    />
  )
}
