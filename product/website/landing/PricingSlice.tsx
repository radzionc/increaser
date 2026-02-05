import { Panel } from '@lib/ui/css/panel'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import styled from 'styled-components'

import { PrimaryCallToAction } from './PrimaryCallToAction'

const Container = styled(Panel)`
  max-width: 400px;
  width: 100%;
`

export const PricingSlice = () => {
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title="Completely Free Productivity Tools"
          subtitle="Increaser is now free for everyone. Enjoy all premium features without any cost."
        />
        <Container withSections kind="secondary">
          <PrimaryCallToAction>Start using for free</PrimaryCallToAction>
        </Container>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
