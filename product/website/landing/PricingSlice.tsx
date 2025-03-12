import { SubscriptionBillingCycleProvider } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { Panel } from '@lib/ui/css/panel'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { freeTrialDays } from '@product/config'
import { SubscriptionBillingCycleSelector } from '@product/ui/subscription/SubscriptionBillingCycleSelector'
import { SubscriptionFeatures } from '@product/ui/subscription/SubscriptionFeatures'
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
          title="Affordable Plans for Unmatched Productivity Gains"
          subtitle={`Start your journey risk-free with a ${freeTrialDays}-day free trial,
          no card required`}
        />
        <SubscriptionBillingCycleProvider>
          <Container withSections kind="secondary">
            <SubscriptionBillingCycleSelector />
            <SubscriptionFeatures />
            <PrimaryCallToAction>Start free trial</PrimaryCallToAction>
          </Container>
        </SubscriptionBillingCycleProvider>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
