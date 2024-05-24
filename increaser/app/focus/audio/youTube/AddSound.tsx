import { analytics } from '@increaser/app/analytics'
import { FinishableComponentProps } from '@lib/ui/props'
import { validateUrl } from '@lib/utils/validation/validateUrl'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { getUniqueValueValidator } from '@lib/utils/validation/getUniqueValueValidator'
import { combineValidators } from '@lib/utils/validation/combineValidators'
import { VStack } from '@lib/ui/layout/Stack'
import { Field } from '@lib/ui/inputs/Field'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { useState } from 'react'
import { validate } from '@lib/ui/form/utils/validate'
import { Fields } from '@lib/ui/inputs/Fields'
import { FormActions } from '@lib/ui/form/components/FormActions'
import styled from 'styled-components'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'

type AddSoundFormShape = {
  url: string
  name: string
}

const Container = styled(VStack)`
  ${horizontalPadding(panelDefaultPadding)};
`

export const AddSound = ({ onFinish }: FinishableComponentProps) => {
  const [value, setValue] = useState<AddSoundFormShape>({
    url: '',
    name: '',
  })

  const { focusSounds } = useAssertUserState()
  const { mutate: updateUser } = useUpdateUserMutation()

  const validateUnique = getUniqueValueValidator(
    new Set(focusSounds.map((sound) => sound.url)),
    'sound',
  )

  const errors = validate(value, {
    url: combineValidators(validateUrl, validateUnique),
    name: (name) => {
      if (!name) {
        return 'Give your sound a name'
      }
    },
  })

  const [isDisabled] = Object.values(errors)

  return (
    <>
      <Container
        gap={28}
        as="form"
        {...getFormProps({
          isDisabled,
          onClose: onFinish,
          onSubmit: () => {
            updateUser({
              focusSounds: [
                {
                  ...value,
                  favourite: true,
                },
                ...focusSounds,
              ],
            })
            analytics.trackEvent('Add sound', value)
            onFinish()
          },
        })}
      >
        <Fields>
          <Field>
            <TextInput
              label="Focus music name"
              autoFocus
              placeholder="My focus music"
              value={value.name}
              onValueChange={(name) => setValue({ ...value, name })}
            />
          </Field>
          <Field>
            <TextInput
              label="YouTube video URL"
              placeholder="https://youtu.be/..."
              value={value.url}
              onValueChange={(url) => setValue({ ...value, url })}
            />
          </Field>
        </Fields>
        <FormActions isDisabled={isDisabled} onCancel={onFinish} />
      </Container>
    </>
  )
}
