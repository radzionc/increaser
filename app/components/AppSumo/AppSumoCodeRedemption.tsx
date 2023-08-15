import { MainApiError, useMainApi } from 'api/hooks/useMainApi'
import { MembershipProvider } from 'membership'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { SubmitFormButton } from '@increaser/ui/ui/buttons/SubmitFormButton'
import { Form } from '@increaser/ui/ui/Form/Form'
import { TextInput } from '@increaser/ui/ui/inputs/TextInput'
import { VStack } from '@increaser/ui/ui/Stack'
import { useUserState } from 'user/state/UserStateContext'

interface RedeemCodeFormState {
  code: string
}

const redeemAppSumoCodeMutation = `
mutation redeemAppSumoCode($input: RedeemAppSumoCodeInput!) {
  redeemAppSumoCode(input: $input)
}
`

export const AppSumoCodeRedemption = () => {
  const [code, setCode] = useState('')

  const { updateState: updateUserState } = useUserState()

  const { query } = useMainApi()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RedeemCodeFormState>({
    mode: 'onSubmit',
  })

  const { mutate: redeemCode, isLoading } = useMutation(
    async ({ code }: RedeemCodeFormState) => {
      try {
        await query({
          query: redeemAppSumoCodeMutation,
          variables: {
            input: {
              code,
            },
          },
        })

        updateUserState({
          membership: { provider: MembershipProvider.AppSumo },
        })
      } catch (error) {
        const { message } = error as MainApiError
        setError('code', { type: 'custom', message })
      }
    },
  )

  return (
    <VStack gap={20} fullWidth>
      <Form
        gap={4}
        onSubmit={handleSubmit((data) => {
          redeemCode(data)
        })}
        content={
          <TextInput
            label="AppSumo code"
            formNoValidate
            value={code || ''}
            {...register('code', {
              required: 'Please enter your AppSumo code',
            })}
            onValueChange={(value: string) => setCode(value?.trim())}
            error={errors.code?.message}
            autoFocus
          />
        }
        actions={<SubmitFormButton isLoading={isLoading} text={'Continue'} />}
      />
    </VStack>
  )
}
