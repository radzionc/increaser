import { ProductFeatureResponse } from '@increaser/api-interface/ProductFeatureResponse'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { ValueComponentProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { UpvoteButton } from '@lib/ui/buttons/UpvoteButton'
import { useVoteForFeatureMutation } from '../hooks/useVoteForFeatureMutation'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'

export const ProductFeatureItem = ({
  value,
}: ValueComponentProps<ProductFeatureResponse>) => {
  const { mutate } = useVoteForFeatureMutation()

  return (
    <Panel kind="secondary">
      <VStack gap={8}>
        <HStack alignItems="start" fullWidth gap={20}>
          <Text style={{ flex: 1 }} height="large">
            {value.name}
          </Text>
          <UpvoteButton
            onClick={() => {
              mutate({
                id: value.id,
              })
            }}
            value={value.upvotedByMe}
            upvotes={value.upvotes}
          />
        </HStack>
        {!value.isApproved && (
          <ShyInfoBlock>
            Thank you! Your feature is awaiting approval and will be open for
            voting soon."
          </ShyInfoBlock>
        )}
      </VStack>
    </Panel>
  )
}
