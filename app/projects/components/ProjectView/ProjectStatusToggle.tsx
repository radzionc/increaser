import { useUpdateProjectMutation } from 'projects/api/useUpdateProjectMutation'
import { Project, ProjectStatus } from 'projects/Project'
import { Switch } from '@increaser/ui/ui/Switch/Switch'

type ProjectStatusToggleProps = Pick<Project, 'status' | 'id'>

export const ProjectStatusToggle = ({
  id,
  status,
}: ProjectStatusToggleProps) => {
  const { mutate: updateProject } = useUpdateProjectMutation()

  const isActive = status === ProjectStatus.Active

  return (
    <Switch
      kind="primary"
      onChange={() => {
        const fields = isActive
          ? { status: ProjectStatus.Inactive, allocatedMinutesPerWeek: 0 }
          : { status: ProjectStatus.Active }

        updateProject({
          id,
          fields,
        })
      }}
      value={isActive}
      label="Active"
    />
  )
}
