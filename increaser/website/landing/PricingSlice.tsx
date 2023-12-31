import { freeTrialDays } from '@increaser/config'
import { centeredContentColumn } from '@lib/ui/css/slice'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { websiteConfig } from '@lib/ui/website/config'
import styled from 'styled-components'
import { Panel } from '@lib/ui/panel/Panel'
import { SubscriptionOffer } from '@increaser/ui/subscription/SubscriptionOffer'
import { SubscriptionBillingCycleProvider } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { signUpUrl } from '../config'
import { Button } from '@lib/ui/buttons/Button'

const Container = styled.div`
  ${centeredContentColumn({
    contentMaxWidth: websiteConfig.contentMaxWidth,
  })}

  ${verticalPadding(80)}
`

export const PricingSlice = () => {
  return (
    <Container>
      <VStack alignItems="center" gap={40}>
        <VStack alignItems="center" gap={8}>
          <Text centered color="contrast" as="h2">
            Affordable Plans for Unmatched Productivity Gains
          </Text>
          <Text height="large" style={{ maxWidth: 600 }} centered>
            Start your journey risk-free with a {freeTrialDays}-day free trial,
            no card required
          </Text>
        </VStack>
        <SubscriptionBillingCycleProvider>
          <Panel>
            <VStack gap={20}>
              <SubscriptionOffer />
              <ExternalLink to={signUpUrl}>
                <Button size="l" as="div" kind="primary">
                  Start free trial
                </Button>
              </ExternalLink>
            </VStack>
          </Panel>
        </SubscriptionBillingCycleProvider>
      </VStack>
    </Container>
  )
}
