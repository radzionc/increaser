import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import styled from 'styled-components'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { ProductUpdatesList } from '@increaser/ui/changelog/ProductUpdatesList'

const Container = styled(WebsiteSlice)`
  ${centeredContentColumn({
    contentMaxWidth: 640,
  })}
`

export const Changelog = () => {
  return (
    <Container>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title="What's New"
          // subtitle="Discover the latest updates, new features, and improvements to enhance your productivity experience."
        />
        <ProductUpdatesList />
      </WebsiteSliceContent>
    </Container>
  )
}
