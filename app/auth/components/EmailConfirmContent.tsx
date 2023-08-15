import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useState } from 'react'
import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { CheckInboxLink } from './AuthFlow/CheckInboxLink'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { useRouter } from 'next/router'
import { AuthView } from './AuthView'

interface EmailConfirmQueryParams {
  email: string
}

export const EmailConfirmContent = () => {
  const [email, setEmail] = useState<string | undefined>()
  useHandleQueryParams<EmailConfirmQueryParams>(({ email }) => setEmail(email))

  const { back } = useRouter()

  return (
    <AuthView title="Confirm your email">
      {email && (
        <>
          <Text height="large" centered size={18}>
            We emailed a magic link to <br />
            <Text as="span" weight="bold">
              {email}
            </Text>
            <br />
            Click the link to log in or sign up.
          </Text>

          <VStack gap={4} fullWidth>
            <CheckInboxLink email={email} />
            <Button onClick={back} size="xl" kind="ghostSecondary">
              Back
            </Button>
          </VStack>
        </>
      )}
    </AuthView>
  )
}
