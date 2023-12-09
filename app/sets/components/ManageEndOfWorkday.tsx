import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { range } from '@increaser/utils/array/range'
import { TimeBoundary } from './TimeBoundary'
import styled from 'styled-components'
import { IconWrapper } from '@increaser/ui/icons/IconWrapper'
import { FlagIcon } from '@increaser/ui/icons/FlagIcon'
const optionStep = 30
const minOption = convertDuration(16, 'h', 'min')

const Icon = styled(IconWrapper)`
  color: ${(p) => p.theme.colors.getLabelColor(4).toCssValue()};
`

export const ManageEndOfWorkday = () => {
  const { goalToFinishWorkBy, goalToGoToBedAt } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const maxOption = goalToGoToBedAt
  const options = range(
    Math.round((maxOption - minOption) / optionStep) + 1,
  ).map((step) => minOption + optionStep * step)

  return (
    <TimeBoundary
      label="finish work"
      value={goalToFinishWorkBy}
      onChange={(value) => updateUser({ goalToFinishWorkBy: value })}
      options={options}
      icon={
        <Icon>
          <FlagIcon />
        </Icon>
      }
    />
  )
}
