import { freeTrialDays } from '@increaser/config'
import { VStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { SubscriptionOffer } from '@increaser/ui/subscription/SubscriptionOffer'
import { SubscriptionBillingCycleProvider } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { signUpUrl } from '../config'
import { Button } from '@lib/ui/buttons/Button'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'

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
              <ExternalLink isReferring openInSameTab to={signUpUrl}>
                <Button size="l" as="div" kind="primary">
                  Start free trial
                </Button>
              </ExternalLink>
            </VStack>
          </Panel>
        </SubscriptionBillingCycleProvider>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
