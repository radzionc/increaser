import { MainApiError, useMainApi } from 'api/hooks/useMainApi'
import { useAuth } from 'auth/hooks/useAuth'
import { MembershipProvider } from 'membership'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Path } from 'router/Path'
import { SubmitFormButton } from '@increaser/ui/ui/buttons/SubmitFormButton'
import { Form } from '@increaser/ui/ui/Form/Form'
import { EditIcon } from '@increaser/ui/ui/icons/EditIcon'
import { TextInput } from '@increaser/ui/ui/inputs/TextInput'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useUserState } from 'user/state/UserStateContext'
import { IconButton } from '@increaser/ui/ui/buttons/IconButton'
import { useRouter } from 'next/router'

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
  const router = useRouter()

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

        router.push(Path.Home)
      } catch (error) {
        const { message } = error as MainApiError
        setError('code', { type: 'custom', message })
      }
    },
  )

  const { state: userState } = useUserState()
  const { unauthorize } = useAuth()

  return (
    <VStack gap={20} fullWidth>
      <HStack alignItems="center" gap={12}>
        <Text>
          <Text as="span" color="supporting">
            Email:
          </Text>{' '}
          {userState?.email || ''}
        </Text>
        <IconButton
          title="Edit"
          size="s"
          icon={<EditIcon />}
          onClick={unauthorize}
        />
      </HStack>
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
