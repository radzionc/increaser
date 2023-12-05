import { useAssertUserState } from 'user/state/UserStateContext'
import { RadioInput } from '@increaser/ui/inputs/RadioInput'
import { capitalizeFirstLetter } from '@increaser/utils/capitalizeFirstLetter'
import { useUpdateUserProfileMutation } from 'community/hooks/useUpdateUserProfileMutation'

const privacyOptions = ['public', 'anonymous'] as const
type PrivacyOption = (typeof privacyOptions)[number]

export const ManagePrivacy = () => {
  const { isAnonymous } = useAssertUserState()
  const { mutate: updateUser } = useUpdateUserProfileMutation()

  return (
    <RadioInput<PrivacyOption>
      renderOption={capitalizeFirstLetter}
      options={privacyOptions}
      value={isAnonymous ? 'anonymous' : 'public'}
      onChange={(value) => {
        const fields = { isAnonymous: value === 'anonymous' }
        updateUser(fields)
      }}
    />
  )
}
