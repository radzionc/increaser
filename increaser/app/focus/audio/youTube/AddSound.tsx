import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { NoValueFinishProps } from '@lib/ui/props'
import { validateUrl } from '@lib/utils/validation/validateUrl'
import { getUniqueValueValidator } from '@lib/utils/validation/getUniqueValueValidator'
import { combineValidators } from '@lib/utils/validation/combineValidators'
import { VStack } from '@lib/ui/css/stack'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { useState } from 'react'
import { validate } from '@lib/ui/form/utils/validate'
import { FormActions } from '@lib/ui/form/components/FormActions'
import styled from 'styled-components'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { MusicFormShape } from './musicForm/MusicFormShape'
import { MusicFormFields } from './musicForm/MusicFormFields'

const Container = styled(VStack)`
  ${horizontalPadding(panelDefaultPadding)};
`

export const AddSound = ({ onFinish }: NoValueFinishProps) => {
  const [value, setValue] = useState<MusicFormShape>({
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
