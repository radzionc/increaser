import { productUpdates } from '@increaser/changelog/productUpdates'
import { VStack } from '@lib/ui/layout/Stack'
import { order } from '@lib/utils/array/order'
import { ChangelogItem } from '@increaser/ui/changelog/ChangelogItem'

export const ProductUpdates = () => {
  const items = order(productUpdates, (v) => v.releasedAt, 'desc')

  return (
    <VStack gap={40}>
      {items.map((value, index) => (
        <ChangelogItem key={index} value={value} />
      ))}
    </VStack>
  )
}
