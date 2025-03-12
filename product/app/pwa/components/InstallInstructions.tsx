import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { Button } from '@lib/ui/buttons/Button'
import { VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { usePWA } from '@product/app/pwa/PWAContext'
import { productName } from '@product/config'

export const InstallInstructions = () => {
  const { installPromptEvent } = usePWA()

  const analytics = useAnalytics()

  if (installPromptEvent) {
    return (
      <Button
        onClick={() => {
          installPromptEvent.prompt()
          analytics.trackEvent('Attempt Install')
        }}
      >
        Install {productName}
      </Button>
    )
  }

  return (
    <Text as="div" size={18} weight="500">
      <VStack gap={8}>
        <Text>1. Open the "Options" menu</Text>
        <Text>2. Press "Add to Home Screen"</Text>
      </VStack>
    </Text>
  )
}
