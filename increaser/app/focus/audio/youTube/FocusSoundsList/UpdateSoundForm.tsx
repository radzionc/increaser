import { useForm } from 'react-hook-form'
import { FinishableComponentProps } from '@lib/ui/props'
import { Button } from '@lib/ui/buttons/Button'
import { Form } from '@lib/ui/form/components/Form'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { without } from '@lib/utils/array/without'

import { pick } from '@lib/utils/record/pick'
import { combineValidators } from '@lib/utils/validation/combineValidators'
import { validateUrl } from '@lib/utils/validation/validateUrl'
import { getUniqueValueValidator } from '@lib/utils/validation/getUniqueValueValidator'
import { FocusSound } from '@increaser/entities/FocusSound'
import { Field } from '@lib/ui/inputs/Field'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'

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

  const { focusSounds } = useAssertUserState()
  const { mutate: updateUser } = useUpdateUserMutation()

  const validateUnique = getUniqueValueValidator(
    new Set(
      without(
        focusSounds.map((sound) => sound.url),
        sound.url,
      ),
    ),
    'sound',
  )

  return (
    <Form
      gap={8}
      onSubmit={handleSubmit(({ name, url }) => {
        updateUser({
          focusSounds: focusSounds.map((s) =>
            s.url === sound.url ? { ...s, name, url } : s,
          ),
        })
        onFinish()
      })}
      actions={
        <Button size="l" kind="reversed">
          Update
        </Button>
      }
      content={
        <>
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
          <Field error={errors.name?.message}>
            <TextInput
              label="Name"
              placeholder="My sound"
              {...register('name', {
                required: 'Give your sound a name',
              })}
            />
          </Field>
        </>
      }
    />
  )
}
