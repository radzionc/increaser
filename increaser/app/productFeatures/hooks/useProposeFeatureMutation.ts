import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { ProductFeatureResponse } from '@increaser/api-interface/ProductFeatureResponse'
import { useApi } from '@increaser/api-ui/hooks/useApi'
import { getApiQueryKey } from '@increaser/api-ui/hooks/useApiQuery'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useProposeFeatureMutation = () => {
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: ApiInterface['proposeFeature']['input']) => {
      queryClient.setQueryData(
        getApiQueryKey('features', undefined),
        (features: ApiInterface['features']['output'] = []) => {
          const newFeature: ProductFeatureResponse = {
            ...input,
            upvotedByMe: true,
            proposedByMe: true,
            upvotes: 1,
            status: 'idea',
            isApproved: false,
          }
          return [...features, newFeature]
        },
      )

      await api.call('proposeFeature', input)
    },
  })
}
