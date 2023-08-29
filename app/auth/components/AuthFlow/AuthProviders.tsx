import { VStack } from '@increaser/ui/ui/Stack'

import { OptionsDivider } from '../OptionsDivider'
import { EmailAuthForm } from './EmailAuthForm'
import { OAuthProviderButton } from './OAuthProviderButton'
import { AuthProvider } from '@increaser/api-interface/client/graphql'

const supportedOAuthProviders: AuthProvider[] = ['facebook', 'google']

export const AuthProviders = () => {
  return (
    <VStack fullWidth gap={20}>
      <VStack fullWidth gap={12}>
        {supportedOAuthProviders.map((provider) => (
          <OAuthProviderButton key={provider} provider={provider} />
        ))}
      </VStack>
      <OptionsDivider />
      <EmailAuthForm />
    </VStack>
  )
}
