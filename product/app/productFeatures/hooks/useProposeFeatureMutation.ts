import { ApiInterface } from '@product/api-interface/ApiInterface'
import { ProductFeatureResponse } from '@product/api-interface/ProductFeatureResponse'
import { getApiQueryKey } from '@product/api-ui/hooks/useApiQuery'
import { useApi } from '@product/api-ui/state/ApiContext'
import { useUser } from '@product/ui/user/state/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useProposeFeatureMutation = () => {
  const api = useApi()
  const queryClient = useQueryClient()
  const { id } = useUser()

  return useMutation({
    mutationFn: async (input: ApiInterface['proposeFeature']['input']) => {
      queryClient.setQueryData(
        getApiQueryKey('features', undefined),
        (features: ApiInterface['features']['output'] = []) => {
          const newFeature: ProductFeatureResponse = {
            ...input,
            upvotedByMe: true,
            proposedBy: id,
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
