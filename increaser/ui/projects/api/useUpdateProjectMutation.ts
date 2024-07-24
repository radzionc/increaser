import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'

import { Project } from '@increaser/entities/Project'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { UpdateUserEntityParams } from '@increaser/api-ui/UpdateUserEntityParams'

export const useUpdateProjectMutation = () => {
  const { projects } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async ({ id, fields }: UpdateUserEntityParams<'project'>) => {
      updateState({
        projects: {
          ...projects,
          [id]: {
            ...projects[id],
            ...fields,
          },
        },
      })

      const project = await api.call('updateUserEntity', {
        id,
        entity: 'project',
        fields,
      })

      return project as Project | null
    },
  })
}
