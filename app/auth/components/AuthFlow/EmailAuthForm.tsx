import { analytics } from 'analytics'
import { useForm } from 'react-hook-form'
import { Button } from '@increaser/ui/buttons/Button'
import { Form } from '@increaser/ui/form/components/Form'
import { TextInput } from '@increaser/ui/inputs/TextInput'

import { useRouter } from 'next/router'
import { Path } from 'router/Path'
import { validateEmail } from '@increaser/utils/validation/validateEmail'
import { addQueryParams } from '@increaser/utils/query/addQueryParams'
import { InputWithError } from '@increaser/ui/inputs/InputWithError'
import { useApiMutation } from 'api/hooks/useApiMutation'

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

  const { mutate: sendAuthLinkByEmail, isLoading } = useApiMutation(
    'sendAuthLinkByEmail',
  )

  return (
    <Form
      gap={4}
      onSubmit={handleSubmit((data) => {
        analytics.trackEvent('Start identification with email')

        sendAuthLinkByEmail(data, {
          onSuccess: () => {
            push(addQueryParams(Path.EmailConfirm, { email: data.email }))
          },
        })
      })}
      content={
        <InputWithError error={errors.email?.message}>
          <TextInput
            label="Email address"
            type="email"
            autoFocus
            placeholder="john@gmail.com"
            {...register('email', {
              required: 'Please enter your email',
              validate: validateEmail,
            })}
            error={errors.email?.message}
          />
        </InputWithError>
      }
      actions={
        <Button size="l" isLoading={isLoading}>
          Continue
        </Button>
      }
    />
  )
}
