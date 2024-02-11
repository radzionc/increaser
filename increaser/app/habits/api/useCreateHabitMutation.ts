import { useMutation } from '@tanstack/react-query'
import { getId } from '@increaser/entities-utils/shared/getId'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { MS_IN_SEC } from '@lib/utils/time'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { useApi } from '@increaser/api-ui/hooks/useApi'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'

export const useCreateHabitMutation = () => {
  const { habits } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async ({
      name,
      color,
      emoji,
    }: Pick<
      ApiInterface['createHabit']['input'],
      'name' | 'color' | 'emoji'
    >) => {
      const input = {
        id: getId(),
        startedAt: Math.round(Date.now() / MS_IN_SEC),
        color,
        emoji,
        name,
        order: getLastItemOrder(Object.values(habits).map((h) => h.order)),
      }

      const habit = {
        ...input,
        successes: [],
      }

      updateState({ habits: { ...habits, [habit.id]: habit } })

      await api.call('createHabit', input)
    },
  })
}
