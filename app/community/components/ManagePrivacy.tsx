import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { RadioInput } from '@increaser/ui/ui/inputs/RadioInput'
import { capitalizeFirstLetter } from '@increaser/utils/capitalizeFirstLetter'

const privacyOptions = ['public', 'anonymous'] as const
type PrivacyOption = (typeof privacyOptions)[number]

export const ManagePrivacy = () => {
  const { isAnonymous } = useAssertUserState()
  const { mutate: updateUser } = useUpdateUserMutation()

  return (
    <RadioInput<PrivacyOption>
      renderOption={capitalizeFirstLetter}
      options={privacyOptions}
      value={isAnonymous ? 'anonymous' : 'public'}
      onChange={(value) => {
        updateUser({ isAnonymous: value === 'anonymous' })
      }}
    />
  )
}
