import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { range } from '@increaser/utils/array/range'
import { TimeBoundary } from './TimeBoundary'
import styled from 'styled-components'
import { IconWrapper } from '@increaser/ui/icons/IconWrapper'
import { SunIcon } from '@increaser/ui/icons/SunIcon'

const optionStep = 30
const minOption = convertDuration(4, 'h', 'min')

const Icon = styled(IconWrapper)`
  color: ${(p) => p.theme.colors.getLabelColor(2).toCssValue()};
`

export const ManageStartOfWorkday = () => {
  const { goalToFinishWorkBy, goalToStartWorkAt } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const maxOption = goalToFinishWorkBy
  const options = range(
    Math.round((maxOption - minOption) / optionStep) + 1,
  ).map((step) => minOption + optionStep * step)

  return (
    <TimeBoundary
      label="start work"
      value={goalToStartWorkAt}
      onChange={(value) => updateUser({ goalToStartWorkAt: value })}
      options={options}
      icon={
        <Icon>
          <SunIcon />
        </Icon>
      }
    />
  )
}
