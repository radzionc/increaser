import { panelDefaultPadding } from '@lib/ui/css/panel'
import { VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { FormActions } from '@lib/ui/form/components/FormActions'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { validate } from '@lib/ui/form/utils/validate'
import { ValueProp, OnFinishProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { combineValidators } from '@lib/utils/validation/combineValidators'
import { getUniqueValueValidator } from '@lib/utils/validation/getUniqueValueValidator'
import { validateUrl } from '@lib/utils/validation/validateUrl'
import { useUpdateUserMutation } from '@product/ui/user/mutations/useUpdateUserMutation'
import { useUser } from '@product/ui/user/state/user'
import { useState } from 'react'
import styled from 'styled-components'

import { MusicFormFields } from './MusicFormFields'
import { MusicFormShape } from './MusicFormShape'

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
