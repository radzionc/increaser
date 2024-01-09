import { freeTrialDays } from '@increaser/config'
import { VStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { SubscriptionOffer } from '@increaser/ui/subscription/SubscriptionOffer'
import { SubscriptionBillingCycleProvider } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { Button } from '@lib/ui/buttons/Button'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { AppLink } from '../navigation/AppLink'
import { AppPath } from '@increaser/ui/navigation/AppPath'

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
              <AppLink to={AppPath.SignUp}>
                <Button size="l" as="div" kind="primary">
                  Start free trial
                </Button>
              </AppLink>
            </VStack>
          </Panel>
        </SubscriptionBillingCycleProvider>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
