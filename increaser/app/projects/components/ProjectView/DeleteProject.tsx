import { useDeleteProjectMutation } from '@increaser/app/projects/api/userDeleteProjectMutation'
import { Button } from '@lib/ui/buttons/Button'

import { useCurrentProject } from './CurrentProjectProvider'

export const DeleteProject = () => {
  const { id } = useCurrentProject()

  const { mutate: deleteProject, isPending } = useDeleteProjectMutation()

  return (
    <Button
      kind="outlinedAlert"
      isLoading={isPending}
      onClick={() => {
        deleteProject({
          id,
        })
      }}
    >
      Delete forever
    </Button>
  )
}
