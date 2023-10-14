import { graphql } from '@increaser/api-interface/client'
import { useApi } from 'api/useApi'
import { useQuery } from 'react-query'

const manageSubscriptionQueryDocument = graphql(`
  query manageSubscription {
    manageSubscription {
      updateUrl
      cancelUrl
    }
  }
`)

export const useManageSubscriptionQuery = () => {
  const { query } = useApi()

  return useQuery(
    'manageSubscription',
    async () => {
      const { manageSubscription } = await query(
        manageSubscriptionQueryDocument,
      )

      return manageSubscription
    },
    {},
  )
}
