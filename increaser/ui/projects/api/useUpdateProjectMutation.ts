import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'

import { Project } from '@increaser/entities/Project'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'

export const useUpdateProjectMutation = () => {
  const { projects } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async ({
      id,
      fields,
    }: ApiInterface['updateProject']['input']) => {
      updateState({
        projects: {
          ...projects,
          [id]: {
            ...projects[id],
            ...fields,
          },
        },
      })

      const project = await api.call('updateProject', {
        id,
        fields,
      })

      return project as Project | null
    },
  })
}
