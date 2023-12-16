import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { range } from '@increaser/utils/array/range'
import { ManageDayMoment } from './ManageDayMoment'
import { dayMomentStep } from '@increaser/entities/DayMoments'

export const ManageLastMealStartsAt = () => {
  const { firstMealAt, lastMealAt, goToBedAt } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const minOption = firstMealAt
  const maxOption = goToBedAt
  const options = range(
    Math.round((maxOption - minOption) / dayMomentStep) + 1,
  ).map((step) => minOption + dayMomentStep * step)

  return (
    <ManageDayMoment
      dayMoment="lastMealAt"
      value={lastMealAt}
      onChange={(value) => updateUser({ lastMealAt: value })}
      options={options}
    />
  )
}
