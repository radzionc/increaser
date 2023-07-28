import { trackEvent } from 'analytics'
import { useForm } from 'react-hook-form'
import { FinishableComponentProps } from 'shared/props'
import { combineValidators } from 'shared/utils/combineValidators'
import { getUniqueValueValidator } from 'shared/utils/getUniqueValueValidator'
import { validateUrl } from 'shared/utils/validateUrl'
import { SubmitFormButton } from '@increaser/ui/ui/buttons/SubmitFormButton'
import { TextInput } from '@increaser/ui/ui/inputs/TextInput'
import { VStack } from '@increaser/ui/ui/Stack'

import { FocusSound } from './FocusSoundsContext'
import { useFocusSounds } from './useFocusSounds'

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
              trackEvent('Add sound', { name, url })
              onFinish()
            })}
            text="Add"
          />
        </>
      )}
    </VStack>
  )
}
