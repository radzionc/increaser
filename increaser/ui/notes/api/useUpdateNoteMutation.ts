import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { recordMap } from '@lib/utils/record/recordMap'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'

export const useUpdateNoteMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { notes } = useAssertUserState()

  return useMutation({
    mutationFn: async (input: ApiInterface['updateNote']['input']) => {
      updateState({
        notes: recordMap(notes, (value) =>
          value.id === input.id ? { ...value, ...input.fields } : value,
        ),
      })

      return api.call('updateNote', input)
    },
  })
}
