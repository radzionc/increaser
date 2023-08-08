import { Switch } from '@increaser/ui/ui/Switch/Switch'
import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'

export const ManagePrivacy = () => {
  const { isAnonymous } = useAssertUserState()
  const { mutate: updateUser } = useUpdateUserMutation()

  return (
    <Switch
      kind="primary"
      label="Enabled"
      value={!isAnonymous}
      onChange={() => {
        updateUser({ isAnonymous: !isAnonymous })
      }}
    />
  )
}
