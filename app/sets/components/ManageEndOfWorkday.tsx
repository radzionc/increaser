import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { range } from '@increaser/utils/array/range'
import { ManageDayMoment } from './ManageDayMoment'
import { dayMomentStep } from '@increaser/entities/DayMoments'

const minOption = convertDuration(16, 'h', 'min')

export const ManageEndOfWorkday = () => {
  const { finishWorkAt, goToBedAt } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const maxOption = goToBedAt
  const options = range(
    Math.round((maxOption - minOption) / dayMomentStep) + 1,
  ).map((step) => minOption + dayMomentStep * step)

  return (
    <ManageDayMoment
      dayMoment="finishWorkAt"
      value={finishWorkAt}
      onChange={(value) => updateUser({ finishWorkAt: value })}
      options={options}
    />
  )
}
