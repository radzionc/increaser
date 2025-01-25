import { useMutation } from '@tanstack/react-query'
import { Set } from '@increaser/entities/User'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { addSets } from '@increaser/entities-utils/set/addSets'
import { useUpdateUser, useUser } from '../../user/state/user'

type UseAddSetsMutationConfig = {
  onOptimisticUpdate?: () => void
}

export const useAddSetsMutation = (config?: UseAddSetsMutationConfig) => {
  const api = useApi()
  const updateState = useUpdateUser()
  const { sets } = useUser()

  return useMutation({
    mutationFn: (value: Set[]) => {
      updateState({ sets: addSets({ prev: sets, value }) })
      config?.onOptimisticUpdate?.()

      return api.call('addSets', value)
    },
    onSuccess: (sets) => {
      updateState({ sets })
    },
  })
}
