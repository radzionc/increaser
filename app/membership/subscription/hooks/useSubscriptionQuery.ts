import { graphql } from '@increaser/api-interface/client'
import { useApi } from 'api/useApi'
import { useQuery } from 'react-query'
import { useUserState } from 'user/state/UserStateContext'

const subscriptionQueryDocument = graphql(`
  query subscription($input: SubscriptionInput!) {
    subscription(input: $input) {
      id
      provider
      planId
      status
      nextBilledAt
      endsAt
    }
  }
`)

export const useSubscriptionQuery = (id: string) => {
  const { query } = useApi()
  const { updateState } = useUserState()

  return useQuery(
    'subscription',
    async () => {
      const { subscription } = await query(subscriptionQueryDocument, {
        input: { id },
      })

      updateState({ subscription })

      return subscription
    },
    {},
  )
}
