import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { signUpUrl } from '../config'
import { Button } from '@lib/ui/buttons/Button'
import styled from 'styled-components'
import { websiteConfig } from '@lib/ui/website/config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'

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
            <br /> Transforms Your Workday
            <br /> into Productive Bliss
          </>
        }
        subtitle="Crafted with Remote Workers' Needs at the Forefront"
      />
      <ExternalLink isReferring openInSameTab to={signUpUrl}>
        <Button as="div" kind="primary" size="xl">
          Start now
        </Button>
      </ExternalLink>
    </WebsiteSliceContent>
  </Container>
)
