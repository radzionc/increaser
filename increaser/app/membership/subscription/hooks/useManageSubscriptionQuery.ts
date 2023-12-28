import { useApiQuery } from '@increaser/app/api/hooks/useApiQuery'

export const useManageSubscriptionQuery = () => {
  return useApiQuery('manageSubscription', undefined)
}
