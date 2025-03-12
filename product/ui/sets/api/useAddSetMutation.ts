import { useApi } from '@product/api-ui/state/ApiContext'
import { Set } from '@product/entities/User'
import { addSet } from '@product/entities-utils/set/addSet'
import { useMutation } from '@tanstack/react-query'

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
