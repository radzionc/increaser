import { VStack } from '@lib/ui/css/stack'

import { OAuthOptions } from '../OAuthOptions'
import { OptionsDivider } from '../OptionsDivider'

import { EmailAuthForm } from './EmailAuthForm'

export const AuthProviders = () => {
  return (
    <VStack gap={20}>
      <OAuthOptions />
      <OptionsDivider />
      <EmailAuthForm />
    </VStack>
  )
}
