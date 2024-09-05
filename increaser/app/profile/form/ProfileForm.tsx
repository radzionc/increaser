import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { EditFormFooter } from '@lib/ui/form/components/EditFormFooter'
import { Panel } from '@lib/ui/css/panel'
import { useMemo, useState } from 'react'
import { ProfileFormShape } from './ProfileFormShape'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { VStack } from '@lib/ui/css/stack'
import { Fields } from '@lib/ui/inputs/Fields'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { CountryInput } from '@lib/ui/inputs/CountryInput'

export const ProfileForm = () => {
  const { name, country } = useAssertUserState()
  const initialValue: ProfileFormShape = {
    name: name ?? null,
    country: country ?? null,
  }

  const { mutate: updateUser } = useUpdateUserMutation()

  const [value, setValue] = useState(initialValue)

  const isValueChanged =
    value.country !== initialValue.country || value.name !== initialValue.name

  const isDisabled = useMemo(() => {
    if (!value.name) {
      return 'Name is required'
    }

    if (!isValueChanged) {
      return 'No changes detected'
    }

    return false
  }, [isValueChanged, value.name])

  const onSubmit = () => {
    updateUser(value)
  }

  const onCancel = isValueChanged
    ? () => {
        setValue(initialValue)
      }
    : undefined

  return (
    <Panel
      as="form"
      {...getFormProps({
        onSubmit,
        isDisabled,
        onClose: onCancel,
      })}
      kind="secondary"
    >
      <VStack gap={20}>
        <Fields>
          <TextInput
            label="Name"
            value={value.name ?? ''}
            onValueChange={(name) => setValue((prev) => ({ ...prev, name }))}
          />
          <CountryInput
            label="Ccountry"
            value={value.country}
            onChange={(country) => setValue((prev) => ({ ...prev, country }))}
          />
        </Fields>
        <EditFormFooter onCancel={onCancel} isDisabled={isDisabled} />
      </VStack>
    </Panel>
  )
}
