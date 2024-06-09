import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { usePWA } from '@increaser/app/pwa/PWAContext'
import { Button } from '@lib/ui/buttons/Button'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { productName } from '@increaser/config'

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
    <Text as="div" size={18} weight="semibold">
      <VStack gap={8}>
        <Text>1. Open the "Options" menu</Text>
        <Text>2. Press "Add to Home Screen"</Text>
      </VStack>
    </Text>
  )
}
