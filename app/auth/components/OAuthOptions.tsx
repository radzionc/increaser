import { AuthProvider } from '@increaser/api-interface/client/graphql'
import { VStack } from '@increaser/ui/ui/Stack'
import { OAuthOption } from './OAuthOption'

const options: AuthProvider[] = ['google', 'facebook']

export const OAuthOptions = () => (
  <VStack gap={12}>
    {options.map((provider) => (
      <OAuthOption key={provider} provider={provider} />
    ))}
  </VStack>
)
