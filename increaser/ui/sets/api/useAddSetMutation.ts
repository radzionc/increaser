import { useMutation } from '@tanstack/react-query'
import { Set } from '@increaser/entities/User'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { addSet } from '@increaser/entities-utils/set/addSet'
import { useUpdateUser, useUser } from '../../user/state/user'

export const useAddSetMutation = () => {
  const api = useApi()
  const updateState = useUpdateUser()
  const { sets } = useUser()

  return useMutation({
    mutationFn: (value: Set) => {
      updateState({ sets: addSet({ sets, value }) })

      return api.call('addSet', value)
    },
  })
}
