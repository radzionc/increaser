import { PersistentStateKey } from '@increaser/app/state/persistentState'
import styled from 'styled-components'
import { ShyTextButton } from '@lib/ui/buttons/ShyTextButton'
import { Text } from '@lib/ui/text'

import { useHabits } from '../HabitsProvider'
import { ShowOnce } from '@increaser/app/state/ShowOnce'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'

const Container = styled(ExternalLink)`
  cursor: pointer;

  &:hover {
    button {
      color: ${({ theme }) => theme.colors.contrast.toCssValue()};
    }
  }
`

export const TwoDayRuleEducation = () => {
  const { habits } = useHabits()
  const couldShow = habits.some(
    (habit) => habit.passedDays.length > 0 && habit.streak === 0,
  )
  if (!couldShow) return null

  return (
    <ShowOnce storageKey={PersistentStateKey.TwoDayRuleEducation}>
      <Container to="https://youtu.be/bfLHTLQZ5nc">
        <Text color="supporting" size={14}>
          Two-day habit breaks set you back -{}{' '}
          <ShyTextButton text="here's why" />
        </Text>
      </Container>
    </ShowOnce>
  )
}
