import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { VStack } from '@lib/ui/css/stack'
import { FormActions } from '@lib/ui/form/components/FormActions'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { validate } from '@lib/ui/form/utils/validate'
import { OnFinishProp } from '@lib/ui/props'
import { combineValidators } from '@lib/utils/validation/combineValidators'
import { getUniqueValueValidator } from '@lib/utils/validation/getUniqueValueValidator'
import { validateUrl } from '@lib/utils/validation/validateUrl'
import { useUpdateUserMutation } from '@product/ui/user/mutations/useUpdateUserMutation'
import { useUser } from '@product/ui/user/state/user'
import { useState } from 'react'
import styled from 'styled-components'

import { MusicFormFields } from './musicForm/MusicFormFields'
import { MusicFormShape } from './musicForm/MusicFormShape'

const Container = styled(VStack)`
  ${horizontalPadding(panelDefaultPadding)};
`

export const AddSound = ({ onFinish }: OnFinishProp) => {
  const [value, setValue] = useState<MusicFormShape>({
    url: '',
    name: '',
  })

  const { focusSounds } = useUser()
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

  const analytics = useAnalytics()

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
            analytics.trackEvent('Add a sound', value)
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
