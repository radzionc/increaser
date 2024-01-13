import { freeTrialDays } from '@increaser/config'
import { VStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { SubscriptionOffer } from '@increaser/ui/subscription/SubscriptionOffer'
import { SubscriptionBillingCycleProvider } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { PrimaryCallToAction } from './PrimaryCallToAction'

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
          <Panel>
            <VStack gap={20}>
              <SubscriptionOffer />
              <PrimaryCallToAction size="l">
                Start free trial
              </PrimaryCallToAction>
            </VStack>
          </Panel>
        </SubscriptionBillingCycleProvider>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
