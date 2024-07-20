import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { omit } from '@lib/utils/record/omit'

interface DeleteIdeaParams {
  id: string
}

export const useDeleteIdeaMutation = () => {
  const { ideas } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (input: DeleteIdeaParams) => {
      updateState({
        ideas: omit(ideas, input.id),
      })

      await api.call('deleteIdea', input)
    },
  })
}
