import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { range } from '@increaser/utils/array/range'
import { TimeBoundary } from './TimeBoundary'
import { MoonIcon } from '@increaser/ui/icons/MoonIcon'
import styled from 'styled-components'
import { IconWrapper } from '@increaser/ui/icons/IconWrapper'

const optionStep = 30
const maxOption = convertDuration(24, 'h', 'min')

const Icon = styled(IconWrapper)`
  color: ${(p) => p.theme.colors.getLabelColor(9).toCssValue()};
`

export const ManageBedTime = () => {
  const { goalToFinishWorkBy, goalToGoToBedAt } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const minOption = goalToFinishWorkBy
  const options = range(
    Math.round((maxOption - minOption) / optionStep) + 1,
  ).map((step) => minOption + optionStep * step)

  return (
    <TimeBoundary
      label="go to bed"
      value={goalToGoToBedAt}
      onChange={(value) => updateUser({ goalToGoToBedAt: value })}
      options={options}
      icon={
        <Icon>
          <MoonIcon />
        </Icon>
      }
    />
  )
}
