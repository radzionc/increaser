import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { PrimaryWebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { PrimaryCallToAction } from './PrimaryCallToAction'
import { ToolkitPanel } from './toolkit/ToolkitPanel'
import { VStack } from '@lib/ui/css/stack'
import { uniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import styled from 'styled-components'

const Container = styled.div`
  ${uniformColumnGrid({
    gap: 40,
    minChildrenWidth: 340,
  })}

  align-items: center;
`

export const PrimarySlice = () => (
  <PrimaryWebsiteSlice>
    <Container>
      <VStack alignItems="center" gap={40}>
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
        <PrimaryCallToAction />
      </VStack>
      <ToolkitPanel />
    </Container>
  </PrimaryWebsiteSlice>
)
