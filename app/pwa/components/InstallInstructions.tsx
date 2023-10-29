import { analytics } from 'analytics'
import { usePWA } from 'pwa/PWAContext'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { productName } from '@increaser/entities'

export const InstallInstructions = () => {
  const { installPromptEvent } = usePWA()

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
