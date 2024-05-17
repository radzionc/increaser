import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { PrimaryWebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { PrimaryCallToAction } from './PrimaryCallToAction'
import { ToolkitPanel } from './toolkit/ToolkitPanel'

export const PrimarySlice = () => (
  <PrimaryWebsiteSlice>
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
  </PrimaryWebsiteSlice>
)
