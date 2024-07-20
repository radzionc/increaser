import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { omit } from '@lib/utils/record/omit'

interface DeleteNoteParams {
  id: string
}

export const useDeleteNoteMutation = () => {
  const { notes } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (input: DeleteNoteParams) => {
      updateState({
        notes: omit(notes, input.id),
      })

      await api.call('deleteNote', input)
    },
  })
}
