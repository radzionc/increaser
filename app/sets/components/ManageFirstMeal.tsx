import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { range } from '@increaser/utils/array/range'
import { ManageDayMoment } from './ManageDayMoment'
import { dayMomentStep } from '@increaser/entities/DayMoments'

export const ManageFirstMealStartsAt = () => {
  const { firstMealAt, wakeUpAt, lastMealAt } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const minOption = wakeUpAt
  const maxOption = lastMealAt
  const options = range(
    Math.round((maxOption - minOption) / dayMomentStep) + 1,
  ).map((step) => minOption + dayMomentStep * step)

  return (
    <ManageDayMoment
      dayMoment="firstMealAt"
      value={firstMealAt}
      onChange={(value) => updateUser({ firstMealAt: value })}
      options={options}
    />
  )
}
