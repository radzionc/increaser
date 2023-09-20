import { VStack } from '@increaser/ui/ui/Stack'

import { OptionsDivider } from '../OptionsDivider'
import { EmailAuthForm } from './EmailAuthForm'
import { AuthProvider } from '@increaser/api-interface/client/graphql'
import { OAuthOption } from '../OAuthOption'

const supportedOAuthProviders: AuthProvider[] = ['google', 'facebook']

export const AuthProviders = () => {
  return (
    <VStack gap={20}>
      <VStack gap={12}>
        {supportedOAuthProviders.map((provider) => (
          <OAuthOption key={provider} provider={provider} />
        ))}
      </VStack>
      <OptionsDivider />
      <EmailAuthForm />
    </VStack>
  )
}
