import { ApiInterface } from '@product/api-interface/ApiInterface'
import { getApiQueryKey } from '@product/api-ui/hooks/useApiQuery'
import { useApi } from '@product/api-ui/state/ApiContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useVoteForFeatureMutation = () => {
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: ApiInterface['voteForFeature']['input']) => {
      queryClient.setQueryData(
        getApiQueryKey('features', undefined),
        (features: ApiInterface['features']['output'] = []) => {
          return features.map((feature) =>
            feature.id === input.id
              ? {
                  ...feature,
                  upvotedByMe: !feature.upvotedByMe,
                  upvotes: feature.upvotes + (feature.upvotedByMe ? -1 : 1),
                }
              : feature,
          )
        },
      )

      await api.call('voteForFeature', input)
    },
  })
}
