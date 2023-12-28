import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitFormButton } from '@lib/ui/buttons/SubmitFormButton'
import { Form } from '@lib/ui/form/components/Form'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { VStack } from '@lib/ui/layout/Stack'
import { useUserState } from '@increaser/app/user/state/UserStateContext'
import { getErrorMessage } from '@lib/utils/getErrorMessage'
import { useApiMutation } from '@increaser/app/api/hooks/useApiMutation'
import { Field } from '@lib/ui/inputs/Field'

interface RedeemCodeFormState {
  code: string
}

export const AppSumoCodeRedemption = () => {
  const [code, setCode] = useState('')

  const { updateState: updateUserState } = useUserState()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RedeemCodeFormState>({
    mode: 'onSubmit',
  })

  const { mutate: redeemCode, isLoading } = useApiMutation(
    'redeemAppSumoCode',
    {
      onSuccess: () => {
        updateUserState({
          lifeTimeDeal: {
            provider: 'appsumo',
          },
        })
      },
      onError: (error) => {
        setError('code', { type: 'custom', message: getErrorMessage(error) })
      },
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
          <Field error={errors.code?.message}>
            <TextInput
              label="AppSumo code"
              formNoValidate
              value={code || ''}
              {...register('code', {
                required: 'Please enter your AppSumo code',
              })}
              onValueChange={(value: string) => setCode(value?.trim())}
              autoFocus
            />
          </Field>
        }
        actions={<SubmitFormButton isLoading={isLoading} text={'Continue'} />}
      />
    </VStack>
  )
}
