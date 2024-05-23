import { analytics } from '@increaser/app/analytics'
import { useForm } from 'react-hook-form'
import { FinishableComponentProps } from '@lib/ui/props'
import { validateUrl } from '@lib/utils/validation/validateUrl'
import { SubmitFormButton } from '@lib/ui/buttons/SubmitFormButton'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { getUniqueValueValidator } from '@lib/utils/validation/getUniqueValueValidator'
import { combineValidators } from '@lib/utils/validation/combineValidators'
import { VStack } from '@lib/ui/layout/Stack'
import { FocusSound } from '@increaser/entities/FocusSound'
import { Field } from '@lib/ui/inputs/Field'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'

export const AddSound = ({ onFinish }: FinishableComponentProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FocusSound>({
    mode: 'onSubmit',
  })

  const url = watch('url')

  const { focusSounds } = useAssertUserState()
  const { mutate: updateUser } = useUpdateUserMutation()

  const validateUnique = getUniqueValueValidator(
    new Set(focusSounds.map((sound) => sound.url)),
    'sound',
  )

  return (
    <VStack gap={4}>
      <Field error={errors.url?.message}>
        <TextInput
          autoFocus
          label="YouTube video URL"
          placeholder="https://youtu.be/..."
          {...register('url', {
            required: 'Enter a YouTube video URL',
            validate: combineValidators(validateUrl, validateUnique),
          })}
        />
      </Field>
      {url && (
        <>
          <Field error={errors.name?.message}>
            <TextInput
              label="Name"
              placeholder="My sound"
              {...register('name', {
                required: 'Give your sound a name',
              })}
            />
          </Field>
          <SubmitFormButton
            onClick={handleSubmit(({ name, url }) => {
              updateUser({
                focusSounds: [
                  {
                    name,
                    url,
                    favourite: true,
                  },
                  ...focusSounds,
                ],
              })
              analytics.trackEvent('Add sound', { name, url })
              onFinish()
            })}
            text="Add"
          />
        </>
      )}
    </VStack>
  )
}
