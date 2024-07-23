import { productUpdates } from '@increaser/changelog/productUpdates'
import { ProductUpdateItem } from '@increaser/ui/changelog/ProductUpdateItem'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { order } from '@lib/utils/array/order'
import styled from 'styled-components'

const Container = styled(SeparatedByLine)`
  max-width: 640px;
`

export const ProductUpdatesList = () => {
  const items = order(productUpdates, (v) => v.releasedAt, 'desc')

  return (
    <Container gap={40}>
      {items.map((value, index) => (
        <ProductUpdateItem key={index} value={value} />
      ))}
    </Container>
  )
}
