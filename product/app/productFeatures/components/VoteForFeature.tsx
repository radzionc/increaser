import { UpvoteButton } from '@lib/ui/buttons/UpvoteButton'

import { useVoteForFeatureMutation } from '../hooks/useVoteForFeatureMutation'

import { useCurrentProductFeature } from './CurrentProductFeatureProvider'

export const VoteForFeature = () => {
  const { id, upvotedByMe, upvotes } = useCurrentProductFeature()
  const { mutate } = useVoteForFeatureMutation()

  return (
    <UpvoteButton
      onClick={() => {
        mutate({
          id,
        })
      }}
      value={upvotedByMe}
      upvotes={upvotes}
    />
  )
}
