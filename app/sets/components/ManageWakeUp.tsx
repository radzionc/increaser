import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { range } from '@increaser/utils/array/range'
import { ManageDayMoment } from './ManageDayMoment'
import { dayMomentStep } from '@increaser/entities/DayMoments'

const minOption = convertDuration(4, 'h', 'min')

export const ManageWakeUp = () => {
  const { wakeUpAt, startWorkAt } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const maxOption = startWorkAt
  const options = range(
    Math.round((maxOption - minOption) / dayMomentStep) + 1,
  ).map((step) => minOption + dayMomentStep * step)

  return (
    <ManageDayMoment
      dayMoment="wakeUpAt"
      value={wakeUpAt}
      onChange={(value) => updateUser({ wakeUpAt: value })}
      options={options}
    />
  )
}
