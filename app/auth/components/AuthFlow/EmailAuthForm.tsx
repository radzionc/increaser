import { trackEvent } from 'analytics'
import { useMainApi } from 'api/hooks/useMainApi'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { Form } from '@increaser/ui/ui/Form/Form'
import { TextInput } from '@increaser/ui/ui/inputs/TextInput'

import { useRouter } from 'next/router'
import { Path } from 'router/Path'
import { validateEmail } from '@increaser/utils/validation/validateEmail'
import { addQueryParams } from '@increaser/utils/addQueryParams'

interface EmailFormState {
  email: string
}

const sendAuthLinkByEmailMutation = `
mutation sendAuthLinkByEmail($input: SendAuthLinkByEmailInput!) {
  sendAuthLinkByEmail(input: $input)
}
`

export const EmailAuthForm = () => {
  const { query } = useMainApi()

  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormState>({
    mode: 'onSubmit',
  })

  const { mutate: sendAuthLinkByEmail, isLoading } = useMutation(
    async ({ email }: EmailFormState) => {
      trackEvent('Start identification with email')

      await query({
        query: sendAuthLinkByEmailMutation,
        variables: {
          input: {
            email,
          },
        },
      })

      return email
    },
    {
      onSuccess: (email) => {
        push(addQueryParams(Path.EmailConfirm, { email }))
      },
    },
  )

  return (
    <Form
      gap={4}
      onSubmit={handleSubmit((data) => {
        sendAuthLinkByEmail(data)
      })}
      content={
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
      }
      actions={
        <Button size="l" isLoading={isLoading}>
          Continue
        </Button>
      }
    />
  )
}
