import { Button } from '@lib/ui/buttons/Button'
import { TextInput } from '@lib/ui/inputs/TextInput'

import { useRouter } from 'next/router'
import { validateEmail } from '@lib/utils/validation/validateEmail'
import { addQueryParams } from '@lib/utils/query/addQueryParams'
import { useApiMutation } from '@increaser/api-ui/hooks/useApiMutation'
import { getAppPath } from '@increaser/ui/navigation/app'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { useMemo, useState } from 'react'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { VStack } from '@lib/ui/css/stack'

export const EmailAuthForm = () => {
  const { push } = useRouter()

  const [email, setEmail] = useState('')

  const analytics = useAnalytics()

  const { mutate: sendAuthLinkByEmail, isPending } = useApiMutation(
    'sendAuthLinkByEmail',
  )

  const isDisabled = useMemo(() => {
    if (!email) {
      return 'Please enter your email'
    }

    return validateEmail(email)
  }, [email])

  return (
    <VStack
      {...getFormProps({
        isDisabled,
        onSubmit: () => {
          analytics.trackEvent('Start identification with email')

          sendAuthLinkByEmail(
            { email },
            {
              onSuccess: () => {
                push(
                  addQueryParams(getAppPath('emailConfirm'), {
                    email,
                  }),
                )
              },
            },
          )
        },
      })}
      as="form"
      gap={20}
    >
      <TextInput
        label="Email address"
        type="email"
        autoFocus
        placeholder="john@gmail.com"
        value={email}
        onValueChange={setEmail}
      />
      <Button isDisabled={isDisabled} size="l" isLoading={isPending}>
        Continue
      </Button>
    </VStack>
  )
}
