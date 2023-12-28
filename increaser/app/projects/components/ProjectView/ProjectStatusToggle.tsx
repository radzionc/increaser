import { useUpdateProjectMutation } from '@increaser/app/projects/api/useUpdateProjectMutation'
import { Switch } from '@lib/ui/inputs/Switch/Switch'
import { Project } from '@increaser/entities/Project'

type ProjectStatusToggleProps = Pick<Project, 'status' | 'id'>

export const ProjectStatusToggle = ({
  id,
  status,
}: ProjectStatusToggleProps) => {
  const { mutate: updateProject } = useUpdateProjectMutation()

  const isActive = status === 'ACTIVE'

  return (
    <Switch
      kind="primary"
      onChange={() => {
        const fields: Partial<Project> = isActive
          ? { status: 'INACTIVE', allocatedMinutesPerWeek: 0 }
          : { status: 'ACTIVE' }

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
