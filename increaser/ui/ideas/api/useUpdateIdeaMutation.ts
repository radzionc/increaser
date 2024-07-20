import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { recordMap } from '@lib/utils/record/recordMap'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'

export const useUpdateIdeaMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { ideas } = useAssertUserState()

  return useMutation({
    mutationFn: async (input: ApiInterface['updateIdea']['input']) => {
      updateState({
        ideas: recordMap(ideas, (value) =>
          value.id === input.id ? { ...value, ...input.fields } : value,
        ),
      })

      return api.call('updateIdea', input)
    },
  })
}
