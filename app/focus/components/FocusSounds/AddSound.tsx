import { analytics } from 'analytics'
import { useForm } from 'react-hook-form'
import { FinishableComponentProps } from '@increaser/ui/props'
import { validateUrl } from '@increaser/utils/validation/validateUrl'
import { SubmitFormButton } from '@increaser/ui/ui/buttons/SubmitFormButton'
import { TextInput } from '@increaser/ui/ui/inputs/TextInput'
import { getUniqueValueValidator } from '@increaser/utils/validation/getUniqueValueValidator'
import { combineValidators } from '@increaser/utils/validation/combineValidators'
import { VStack } from '@increaser/ui/ui/Stack'

import { useFocusSounds } from './useFocusSounds'
import { FocusSound } from '@increaser/entities/FocusSound'

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
      <TextInput
        autoFocus
        error={errors.url?.message}
        label="YouTube video URL"
        placeholder="https://youtu.be/..."
        {...register('url', {
          required: 'Enter a YouTube video URL',
          validate: combineValidators(validateUrl, validateUnique),
        })}
      />
      {url && (
        <>
          <TextInput
            error={errors.name?.message}
            label="Name"
            placeholder="My sound"
            {...register('name', {
              required: 'Give your sound a name',
            })}
          />
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
