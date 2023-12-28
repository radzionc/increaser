import { VStack } from '@lib/ui/layout/Stack'
import { OAuthOption } from './OAuthOption'
import { oAuthProviders } from '@increaser/entities/OAuthProvider'

export const OAuthOptions = () => (
  <VStack gap={12}>
    {oAuthProviders.map((provider) => (
      <OAuthOption key={provider} provider={provider} />
    ))}
  </VStack>
)
