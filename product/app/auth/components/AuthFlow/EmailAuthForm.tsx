import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { Button } from '@lib/ui/buttons/Button'
import { VStack } from '@lib/ui/css/stack'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { Text } from '@lib/ui/text'
import { getErrorMessage } from '@lib/utils/getErrorMessage'
import { addQueryParams } from '@lib/utils/query/addQueryParams'
import { validateEmail } from '@lib/utils/validation/validateEmail'
import { useApiMutation } from '@product/api-ui/hooks/useApiMutation'
import { getAppPath } from '@product/ui/navigation/app'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

export const EmailAuthForm = () => {
  const { push } = useRouter()

  const [email, setEmail] = useState('')

  const analytics = useAnalytics()

  const {
    mutate: sendAuthLinkByEmail,
    isPending,
    error,
  } = useApiMutation('sendAuthLinkByEmail')

  const errorMessage = error ? getErrorMessage(error) : undefined

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
      {errorMessage && (
        <Text color="alert" centerHorizontally>
          {errorMessage}
        </Text>
      )}
      <Button
        type="submit"
        isDisabled={isDisabled}
        size="l"
        isLoading={isPending}
      >
        Continue
      </Button>
    </VStack>
  )
}
