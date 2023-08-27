import { analytics } from 'analytics'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { Form } from '@increaser/ui/ui/Form/Form'
import { TextInput } from '@increaser/ui/ui/inputs/TextInput'

import { useRouter } from 'next/router'
import { Path } from 'router/Path'
import { validateEmail } from '@increaser/utils/validation/validateEmail'
import { addQueryParams } from '@increaser/utils/addQueryParams'
import { useApi } from 'api/useApi'
import { graphql } from '@increaser/api-interface/client'

interface EmailFormState {
  email: string
}

const sendAuthLinkByEmailMutationDocument = graphql(`
  mutation sendAuthLinkByEmail($input: SendAuthLinkByEmailInput!) {
    sendAuthLinkByEmail(input: $input)
  }
`)

export const EmailAuthForm = () => {
  const { query } = useApi()

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
      analytics.trackEvent('Start identification with email')

      await query(sendAuthLinkByEmailMutationDocument, {
        input: {
          email,
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
