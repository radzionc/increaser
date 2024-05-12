import styled from 'styled-components'
import { websiteConfig } from '@lib/ui/website/config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { PrimaryCallToAction } from './PrimaryCallToAction'
import { ToolkitPanel } from './toolkit/ToolkitPanel'

const Container = styled(WebsiteSlice)`
  min-height: calc(100vh - ${toSizeUnit(websiteConfig.headerHeight)});
`

export const PrimarySlice = () => (
  <Container>
    <WebsiteSliceContent>
      <WebsiteSectionHeader
        titleAs="h1"
        title={
          <>
            From Chaos to Clarity
            <br /> Transform Your Workday
            <br /> into Productive Bliss
          </>
        }
        subtitle="Crafted with Remote Workers' Needs at the Forefront"
      />
      <ToolkitPanel />
      <PrimaryCallToAction />
    </WebsiteSliceContent>
  </Container>
)
