import { analytics } from '@increaser/app/analytics'
import { useForm } from 'react-hook-form'
import { FinishableComponentProps } from '@lib/ui/props'
import { validateUrl } from '@lib/utils/validation/validateUrl'
import { SubmitFormButton } from '@lib/ui/buttons/SubmitFormButton'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { getUniqueValueValidator } from '@lib/utils/validation/getUniqueValueValidator'
import { combineValidators } from '@lib/utils/validation/combineValidators'
import { VStack } from '@lib/ui/layout/Stack'

import { useFocusSounds } from './useFocusSounds'
import { FocusSound } from '@increaser/entities/FocusSound'
import { Field } from '@lib/ui/inputs/Field'

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

  const { updateSounds, sounds } = useFocusSounds()

  const validateUnique = getUniqueValueValidator(
    new Set(sounds.map((sound) => sound.url)),
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
              updateSounds([
                {
                  name,
                  url,
                  favourite: true,
                },
                ...sounds,
              ])
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
