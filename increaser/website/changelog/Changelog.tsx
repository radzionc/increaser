import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { productUpdates } from '@increaser/changelog/productUpdates'
import { order } from '@lib/utils/array/order'
import { VStack } from '@lib/ui/layout/Stack'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import styled from 'styled-components'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { ProductUpdateItem } from '@increaser/ui/changelog/ProductUpdateItem'

export const Container = styled(WebsiteSlice)`
  ${centeredContentColumn({
    contentMaxWidth: 640,
  })}
`

export const Changelog = () => {
  const items = order(productUpdates, (v) => v.releasedAt, 'desc')

  return (
    <Container>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title="What's New"
          // subtitle="Discover the latest updates, new features, and improvements to enhance your productivity experience."
        />
        <VStack gap={40}>
          {items.map((value, index) => (
            <ProductUpdateItem key={index} value={value} />
          ))}
        </VStack>
      </WebsiteSliceContent>
    </Container>
  )
}
