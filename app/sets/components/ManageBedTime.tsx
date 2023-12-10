import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { range } from '@increaser/utils/array/range'
import { ManageDayMoment } from './ManageDayMoment'
import { dayMomentStepInMinutes } from '@increaser/entities/User'

const maxOption = convertDuration(24, 'h', 'min')

export const ManageBedTime = () => {
  const { goalToFinishWorkBy, goalToGoToBedAt } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const minOption = goalToFinishWorkBy
  const options = range(
    Math.round((maxOption - minOption) / dayMomentStepInMinutes) + 1,
  ).map((step) => minOption + dayMomentStepInMinutes * step)

  return (
    <ManageDayMoment
      dayMoment="goalToGoToBedAt"
      value={goalToGoToBedAt}
      onChange={(value) => updateUser({ goalToGoToBedAt: value })}
      options={options}
    />
  )
}
