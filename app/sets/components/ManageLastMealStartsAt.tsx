import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { range } from '@increaser/utils/array/range'
import { ManageDayMoment } from './ManageDayMoment'
import { dayMomentStepInMinutes } from '@increaser/entities/User'

export const ManageLastMealStartsAt = () => {
  const { firstMealStartsAt, goalToGoToBedAt, lastMealStartsAt } =
    useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const minOption = firstMealStartsAt
  const maxOption = goalToGoToBedAt
  const options = range(
    Math.round((maxOption - minOption) / dayMomentStepInMinutes) + 1,
  ).map((step) => minOption + dayMomentStepInMinutes * step)

  return (
    <ManageDayMoment
      dayMoment="lastMealStartsAt"
      value={lastMealStartsAt}
      onChange={(value) => updateUser({ lastMealStartsAt: value })}
      options={options}
    />
  )
}
