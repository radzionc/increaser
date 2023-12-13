import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { range } from '@increaser/utils/array/range'
import { ManageDayMoment } from './ManageDayMoment'
import { dayMomentStepInMinutes } from '@increaser/entities/User'

export const ManageStartOfWorkday = () => {
  const { goalToFinishWorkBy, goalToStartWorkAt, goalToWakeUpAt } =
    useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const maxOption = goalToFinishWorkBy
  const options = range(
    Math.round((maxOption - goalToWakeUpAt) / dayMomentStepInMinutes) + 1,
  ).map((step) => goalToWakeUpAt + dayMomentStepInMinutes * step)

  return (
    <ManageDayMoment
      dayMoment="goalToStartWorkAt"
      value={goalToStartWorkAt}
      onChange={(value) => updateUser({ goalToStartWorkAt: value })}
      options={options}
    />
  )
}
