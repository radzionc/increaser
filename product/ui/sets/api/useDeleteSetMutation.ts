import { Interval } from '@lib/utils/interval/Interval'
import { useApi } from '@product/api-ui/state/ApiContext'
import { deleteSet } from '@product/entities-utils/set/deleteSet'
import { useMutation } from '@tanstack/react-query'

import { useUpdateUser, useUser } from '../../user/state/user'

export const useDeleteSetMutation = () => {
  const api = useApi()
  const updateState = useUpdateUser()
  const { sets } = useUser()

  return useMutation({
    mutationFn: (value: Interval) => {
      updateState({ sets: deleteSet({ sets, value }) })

      return api.call('deleteSet', value)
    },
  })
}
