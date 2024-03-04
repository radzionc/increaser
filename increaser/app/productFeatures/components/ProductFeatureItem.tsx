import { ProductFeatureResponse } from '@increaser/api-interface/ProductFeatureResponse'
import { HStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { ValueComponentProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { UpvoteButton } from '@lib/ui/buttons/UpvoteButton'

export const ProductFeatureItem = ({
  value,
}: ValueComponentProps<ProductFeatureResponse>) => {
  return (
    <Panel kind="secondary">
      <HStack alignItems="start" fullWidth gap={20}>
        <Text style={{ flex: 1 }} height="large">
          {value.name}
        </Text>
        <UpvoteButton value={value.upvotedByMe} upvotes={value.upvotes} />
      </HStack>
    </Panel>
  )
}
