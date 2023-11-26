import { VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { useState } from 'react'
import { useHandleQueryParams } from 'navigation/hooks/useHandleQueryParams'
import { Button } from '@increaser/ui/buttons/Button'
import { useRouter } from 'next/router'
import { AuthView } from '@increaser/ui/auth/AuthView'
import { suggestInboxLink } from '@increaser/utils/suggestInboxLink'
import { ExternalLink } from 'router/Link/ExternalLink'

interface EmailConfirmQueryParams {
  email: string
}

export const EmailConfirmContent = () => {
  const [email, setEmail] = useState<string | undefined>()
  useHandleQueryParams<EmailConfirmQueryParams>(({ email }) => setEmail(email))

  const { back } = useRouter()

  const inboxLink = email && suggestInboxLink(email, 'increaser')

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
            {inboxLink && (
              <ExternalLink style={{ width: '100%' }} to={inboxLink}>
                <Button size="xl" as="div">
                  Check your inbox
                </Button>
              </ExternalLink>
            )}
            <Button onClick={back} size="xl" kind="ghostSecondary">
              Back
            </Button>
          </VStack>
        </>
      )}
    </AuthView>
  )
}
