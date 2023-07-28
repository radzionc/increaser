import { trackEvent } from 'analytics'
import { useMainApi } from 'api/hooks/useMainApi'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { handleApiError } from 'server/handleApiError'
import { validateEmail } from 'shared/utils/validateEmail'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { Form } from '@increaser/ui/ui/Form/Form'
import { TextInput } from '@increaser/ui/ui/inputs/TextInput'

import { useAuthFlow } from './AuthFlowContext'
import { EmailAuthFlowContext } from './EmailAuthFlowContext'
import { useSnackbar } from 'ui/Snackbar/useSnackbar'

interface EmailFormState {
  email: string
}

const sendAuthLinkByEmailMutation = `
mutation sendAuthLinkByEmail($input: SendAuthLinkByEmailInput!) {
  sendAuthLinkByEmail(input: $input)
}
`

export const EmailAuthForm = () => {
  const { showSnackbar } = useSnackbar()

  const { setEmail } = useContext(EmailAuthFlowContext)
  const { destination } = useAuthFlow()

  const { query } = useMainApi()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormState>({
    mode: 'onSubmit',
  })

  const { mutate: sendAuthLinkByEmail, isLoading } = useMutation(
    async ({ email }: EmailFormState) => {
      try {
        trackEvent('Start sign up with email')

        await query({
          query: sendAuthLinkByEmailMutation,
          variables: {
            input: {
              email,
              destination,
            },
          },
        })

        setEmail(email)
      } catch (error) {
        handleApiError({ error, info: { email } })

        showSnackbar({ text: 'Oops, please try again' })
      }
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
          label="Email"
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
