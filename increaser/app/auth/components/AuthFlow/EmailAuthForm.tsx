import { useForm } from 'react-hook-form'
import { Button } from '@lib/ui/buttons/Button'
import { Form } from '@lib/ui/form/components/Form'
import { TextInput } from '@lib/ui/inputs/TextInput'

import { useRouter } from 'next/router'
import { validateEmail } from '@lib/utils/validation/validateEmail'
import { addQueryParams } from '@lib/utils/query/addQueryParams'
import { Field } from '@lib/ui/inputs/Field'
import { useApiMutation } from '@increaser/api-ui/hooks/useApiMutation'
import { getAppPath } from '@increaser/ui/navigation/app'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'

interface EmailFormState {
  email: string
}

export const EmailAuthForm = () => {
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormState>({
    mode: 'onSubmit',
  })

  const analytics = useAnalytics()

  const { mutate: sendAuthLinkByEmail, isPending } = useApiMutation(
    'sendAuthLinkByEmail',
  )

  return (
    <Form
      gap={4}
      onSubmit={handleSubmit((data) => {
        analytics.trackEvent('Start identification with email')

        sendAuthLinkByEmail(data, {
          onSuccess: () => {
            push(
              addQueryParams(getAppPath('emailConfirm'), {
                email: data.email,
              }),
            )
          },
        })
      })}
      content={
        <Field error={errors.email?.message}>
          <TextInput
            label="Email address"
            type="email"
            autoFocus
            placeholder="john@gmail.com"
            {...register('email', {
              required: 'Please enter your email',
              validate: validateEmail,
            })}
          />
        </Field>
      }
      actions={
        <Button size="l" isLoading={isPending}>
          Continue
        </Button>
      }
    />
  )
}
