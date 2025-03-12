import { CountryInput } from '@lib/countries-ui/CountryInput'
import { Panel } from '@lib/ui/css/panel'
import { VStack } from '@lib/ui/css/stack'
import { EditFormFooter } from '@lib/ui/form/components/EditFormFooter'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { Fields } from '@lib/ui/inputs/Fields'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { useUpdateUserMutation } from '@product/ui/user/mutations/useUpdateUserMutation'
import { useUser } from '@product/ui/user/state/user'
import { useMemo, useState } from 'react'

import { ProfileFormShape } from './ProfileFormShape'

export const ProfileForm = () => {
  const { name, country } = useUser()
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
            label="Country"
            value={value.country}
            onChange={(country) => setValue((prev) => ({ ...prev, country }))}
          />
        </Fields>
        <EditFormFooter onCancel={onCancel} isDisabled={isDisabled} />
      </VStack>
    </Panel>
  )
}
