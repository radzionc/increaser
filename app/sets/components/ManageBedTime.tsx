import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { range } from '@increaser/utils/array/range'
import { ManageDayMoment } from './ManageDayMoment'
import { dayMomentStep } from '@increaser/entities/DayMoments'

const maxOption = convertDuration(24, 'h', 'min')

export const ManageBedTime = () => {
  const { finishWorkAt, goToBedAt } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const minOption = finishWorkAt
  const options = range(
    Math.round((maxOption - minOption) / dayMomentStep) + 1,
  ).map((step) => minOption + dayMomentStep * step)

  return (
    <ManageDayMoment
      dayMoment="goToBedAt"
      value={goToBedAt}
      onChange={(value) => updateUser({ goToBedAt: value })}
      options={options}
    />
  )
}
