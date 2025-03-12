import { VStack } from '@lib/ui/css/stack'
import { oAuthProviders } from '@product/entities/OAuthProvider'

import { OAuthOption } from './OAuthOption'

export const OAuthOptions = () => (
  <VStack gap={12}>
    {oAuthProviders.map((provider) => (
      <OAuthOption key={provider} provider={provider} />
    ))}
  </VStack>
)
