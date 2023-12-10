import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { range } from '@increaser/utils/array/range'
import { ManageDayMoment } from './ManageDayMoment'
import { dayMomentStepInMinutes } from '@increaser/entities/User'

const minOption = convertDuration(16, 'h', 'min')

export const ManageEndOfWorkday = () => {
  const { goalToFinishWorkBy, goalToGoToBedAt } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const maxOption = goalToGoToBedAt
  const options = range(
    Math.round((maxOption - minOption) / dayMomentStepInMinutes) + 1,
  ).map((step) => minOption + dayMomentStepInMinutes * step)

  return (
    <ManageDayMoment
      dayMoment="goalToFinishWorkBy"
      value={goalToFinishWorkBy}
      onChange={(value) => updateUser({ goalToFinishWorkBy: value })}
      options={options}
    />
  )
}
