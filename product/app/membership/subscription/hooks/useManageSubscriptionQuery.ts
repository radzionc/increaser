import { useApiQuery } from '@product/api-ui/hooks/useApiQuery'

export const useManageSubscriptionQuery = () => {
  return useApiQuery('manageSubscription', undefined)
}
