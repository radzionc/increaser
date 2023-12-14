import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { range } from '@increaser/utils/array/range'
import { ManageDayMoment } from './ManageDayMoment'
import { dayMomentStepInMinutes } from '@increaser/entities/User'

export const ManageFirstMealStartsAt = () => {
  const { firstMealStartsAt, goalToWakeUpAt, lastMealStartsAt } =
    useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const minOption = goalToWakeUpAt
  const maxOption = lastMealStartsAt
  const options = range(
    Math.round((maxOption - minOption) / dayMomentStepInMinutes) + 1,
  ).map((step) => minOption + dayMomentStepInMinutes * step)

  return (
    <ManageDayMoment
      dayMoment="firstMealStartsAt"
      value={firstMealStartsAt}
      onChange={(value) => updateUser({ firstMealStartsAt: value })}
      options={options}
    />
  )
}
