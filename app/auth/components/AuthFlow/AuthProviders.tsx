import { OAuthProvider } from 'auth/OAuthProvider'
import { VStack } from '@increaser/ui/ui/Stack'

import { OptionsDivider } from '../OptionsDivider'
import { EmailAuthForm } from './EmailAuthForm'
import { OAuthProviderButton } from './OAuthProviderButton'

const supportedOAuthProviders = [OAuthProvider.Google, OAuthProvider.Facebook]

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
