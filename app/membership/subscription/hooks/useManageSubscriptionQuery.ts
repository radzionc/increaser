import { useApiQuery } from 'api/hooks/useApiQuery'

export const useManageSubscriptionQuery = () => {
  return useApiQuery('manageSubscription', undefined)
}
