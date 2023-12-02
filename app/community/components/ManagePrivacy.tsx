import { useAssertUserState, useUserState } from 'user/state/UserStateContext'
import { RadioInput } from '@increaser/ui/inputs/RadioInput'
import { capitalizeFirstLetter } from '@increaser/utils/capitalizeFirstLetter'
import { useRefetchQueries } from '@increaser/ui/query/hooks/useRefetchQueries'
import { useApiMutation } from 'api/hooks/useApiMutation'
import { getApiQueryKey } from 'api/hooks/useApiQuery'
import { scoreboardPeriods } from '@increaser/entities/PerformanceScoreboard'

const privacyOptions = ['public', 'anonymous'] as const
type PrivacyOption = (typeof privacyOptions)[number]

export const ManagePrivacy = () => {
  const { isAnonymous } = useAssertUserState()
  const refetch = useRefetchQueries()
  const { updateState } = useUserState()

  const { mutate: updateUser } = useApiMutation('updateUser', {
    onSuccess: () => {
      refetch(
        ...scoreboardPeriods.map((id) => getApiQueryKey('scoreboard', { id })),
      )
    },
  })

  return (
    <RadioInput<PrivacyOption>
      renderOption={capitalizeFirstLetter}
      options={privacyOptions}
      value={isAnonymous ? 'anonymous' : 'public'}
      onChange={(value) => {
        const fields = { isAnonymous: value === 'anonymous' }
        updateUser(fields)
        updateState(fields)
      }}
    />
  )
}
