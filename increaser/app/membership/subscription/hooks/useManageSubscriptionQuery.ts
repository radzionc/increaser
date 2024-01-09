import { useApiQuery } from '@increaser/api-ui/hooks/useApiQuery'

export const useManageSubscriptionQuery = () => {
  return useApiQuery('manageSubscription', undefined)
}
