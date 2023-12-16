import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { range } from '@increaser/utils/array/range'
import { ManageDayMoment } from './ManageDayMoment'
import { dayMomentStep } from '@increaser/entities/DayMoments'

export const ManageStartOfWorkday = () => {
  const { finishWorkAt, startWorkAt, wakeUpAt } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const maxOption = finishWorkAt
  const options = range(
    Math.round((maxOption - wakeUpAt) / dayMomentStep) + 1,
  ).map((step) => wakeUpAt + dayMomentStep * step)

  return (
    <ManageDayMoment
      dayMoment="startWorkAt"
      value={startWorkAt}
      onChange={(value) => updateUser({ startWorkAt: value })}
      options={options}
    />
  )
}
