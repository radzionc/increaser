import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { order } from '@lib/utils/array/order'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { productUpdates } from '@product/changelog/productUpdates'
import { ProductUpdateItem } from '@product/ui/changelog/ProductUpdateItem'
import styled from 'styled-components'

const Container = styled(SeparatedByLine)`
  max-width: 640px;
`

export const ProductUpdatesList = () => {
  const items = order(
    productUpdates.filter((update) => update.releasedAt),
    (v) => shouldBePresent(v.releasedAt),
    'desc',
  )

  return (
    <Container gap={40}>
      {items.map((value, index) => (
        <ProductUpdateItem key={index} value={value} />
      ))}
    </Container>
  )
}
