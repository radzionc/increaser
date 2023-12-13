import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { range } from '@increaser/utils/array/range'
import { ManageDayMoment } from './ManageDayMoment'
import { dayMomentStepInMinutes } from '@increaser/entities/User'

const minOption = convertDuration(4, 'h', 'min')

export const ManageWakeUp = () => {
  const { goalToWakeUpAt, goalToStartWorkAt } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const maxOption = goalToStartWorkAt
  const options = range(
    Math.round((maxOption - minOption) / dayMomentStepInMinutes) + 1,
  ).map((step) => minOption + dayMomentStepInMinutes * step)

  return (
    <ManageDayMoment
      dayMoment="goalToWakeUpAt"
      value={goalToWakeUpAt}
      onChange={(value) => updateUser({ goalToWakeUpAt: value })}
      options={options}
    />
  )
}
