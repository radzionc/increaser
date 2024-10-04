import { useMutation } from '@tanstack/react-query'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { deleteSet } from '@increaser/entities-utils/set/deleteSet'
import { Interval } from '@lib/utils/interval/Interval'
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
