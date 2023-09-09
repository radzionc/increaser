import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { SubmitFormButton } from '@increaser/ui/ui/buttons/SubmitFormButton'
import { Form } from '@increaser/ui/ui/Form/Form'
import { TextInput } from '@increaser/ui/ui/inputs/TextInput'
import { VStack } from '@increaser/ui/ui/Stack'
import { useUserState } from 'user/state/UserStateContext'
import { ApiError, useApi } from 'api/useApi'
import { graphql } from '@increaser/api-interface/client'

interface RedeemCodeFormState {
  code: string
}

const redeemAppSumoCodeMutationDocument = graphql(`
  mutation redeemAppSumoCode($input: RedeemAppSumoCodeInput!) {
    redeemAppSumoCode(input: $input)
  }
`)

export const AppSumoCodeRedemption = () => {
  const [code, setCode] = useState('')

  const { updateState: updateUserState } = useUserState()

  const { query } = useApi()

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
        await query(redeemAppSumoCodeMutationDocument, {
          input: {
            code,
          },
        })

        updateUserState({
          membership: { provider: 'AppSumo' },
        })
      } catch (error) {
        const { message } = error as ApiError
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
