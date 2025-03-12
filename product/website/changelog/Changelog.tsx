import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ProductUpdatesList } from '@product/ui/changelog/ProductUpdatesList'
import styled from 'styled-components'

const Container = styled(WebsiteSlice)`
  ${centeredContentColumn({
    contentMaxWidth: 640,
  })}
`

export const Changelog = () => {
  return (
    <Container>
      <WebsiteSliceContent>
        <WebsiteSectionHeader title="What's New" />
        <ProductUpdatesList />
      </WebsiteSliceContent>
    </Container>
  )
}
