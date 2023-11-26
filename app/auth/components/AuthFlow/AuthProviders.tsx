import { VStack } from '@increaser/ui/layout/Stack'

import { OptionsDivider } from '../OptionsDivider'
import { EmailAuthForm } from './EmailAuthForm'
import { OAuthOptions } from '../OAuthOptions'

export const AuthProviders = () => {
  return (
    <VStack gap={20}>
      <OAuthOptions />
      <OptionsDivider />
      <EmailAuthForm />
    </VStack>
  )
}
