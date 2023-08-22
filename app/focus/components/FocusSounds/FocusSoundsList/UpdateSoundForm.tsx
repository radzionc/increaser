import { useForm } from 'react-hook-form'
import { FinishableComponentProps } from 'shared/props'
import { combineValidators } from 'shared/utils/combineValidators'
import { getUniqueValueValidator } from 'shared/utils/getUniqueValueValidator'
import { validateUrl } from 'shared/utils/validateUrl'
import { without } from 'shared/utils/without'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { Form } from '@increaser/ui/ui/Form/Form'
import { TextInput } from '@increaser/ui/ui/inputs/TextInput'

import { FocusSound } from '../FocusSoundsContext'
import { useFocusSounds } from '../useFocusSounds'
import { pick } from '@increaser/utils/pick'

interface UpdateSoundFormProps extends FinishableComponentProps {
  sound: FocusSound
}

type FocusSoundFormShape = Pick<FocusSound, 'name' | 'url'>

export const UpdateSoundForm = ({ onFinish, sound }: UpdateSoundFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FocusSoundFormShape>({
    mode: 'onSubmit',
    defaultValues: pick(sound, ['name', 'url']),
  })

  const { updateSounds, sounds } = useFocusSounds()

  const validateUnique = getUniqueValueValidator(
    new Set(
      without(
        sounds.map((sound) => sound.url),
        sound.url,
      ),
    ),
    'sound',
  )

  return (
    <Form
      gap={8}
      onSubmit={handleSubmit(({ name, url }) => {
        updateSounds(
          sounds.map((s) =>
            s.url === sound.url ? { ...sound, name, url } : sound,
          ),
        )
        onFinish()
      })}
      actions={
        <Button size="l" kind="reversed">
          Update
        </Button>
      }
      content={
        <>
          {' '}
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
          <TextInput
            error={errors.name?.message}
            label="Name"
            placeholder="My sound"
            {...register('name', {
              required: 'Give your sound a name',
            })}
          />
        </>
      }
    />
  )
}
