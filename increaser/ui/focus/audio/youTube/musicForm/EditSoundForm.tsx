import { ValueProp, OnFinishProp } from '@lib/ui/props'
import { validateUrl } from '@lib/utils/validation/validateUrl'
import { getUniqueValueValidator } from '@lib/utils/validation/getUniqueValueValidator'
import { combineValidators } from '@lib/utils/validation/combineValidators'
import { VStack } from '@lib/ui/css/stack'
import { useUser } from '@increaser/ui/user/state/user'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { useState } from 'react'
import { validate } from '@lib/ui/form/utils/validate'
import { FormActions } from '@lib/ui/form/components/FormActions'
import styled from 'styled-components'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { MusicFormShape } from './MusicFormShape'
import { MusicFormFields } from './MusicFormFields'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(VStack)`
  padding: ${toSizeUnit(panelDefaultPadding)};
  width: 100%;
  border-bottom: 2px solid ${getColor('mist')};
  border-top: 2px solid ${getColor('mist')};
`

export const EditSoundForm = ({
  onFinish,
  value: initialValue,
}: OnFinishProp & ValueProp<MusicFormShape>) => {
  const [value, setValue] = useState<MusicFormShape>(initialValue)

  const { focusSounds } = useUser()
  const { mutate: updateUser } = useUpdateUserMutation()

  const validateUnique = getUniqueValueValidator(
    new Set(
      focusSounds
        .filter((sound) => sound.url !== initialValue.url)
        .map((sound) => sound.url),
    ),
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
              focusSounds: focusSounds.map((sound) =>
                sound.url === initialValue.url ? { ...sound, ...value } : sound,
              ),
            })
            onFinish()
          },
        })}
      >
        <MusicFormFields value={value} onChange={(value) => setValue(value)} />
        <FormActions isDisabled={isDisabled} onCancel={onFinish} />
      </Container>
    </>
  )
}
