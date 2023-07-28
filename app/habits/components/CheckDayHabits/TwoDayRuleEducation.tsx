import { ExternalLink } from 'router/Link/ExternalLink'
import { PersistentStorageKey } from 'state/persistentStorage'
import styled from 'styled-components'
import { ShyTextButton } from '@increaser/ui/ui/buttons/ShyTextButton'
import { Text } from '@increaser/ui/ui/Text'

import { useHabits } from '../HabitsProvider'
import { ShowOnce } from 'state/ShowOnce'

const Container = styled(ExternalLink)`
  cursor: pointer;

  :hover {
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
    <ShowOnce storageKey={PersistentStorageKey.TwoDayRuleEducation}>
      <Container to="https://youtu.be/bfLHTLQZ5nc">
        <Text color="supporting" size={14}>
          Two-day habit breaks set you back -{}{' '}
          <ShyTextButton text="here's why" />
        </Text>
      </Container>
    </ShowOnce>
  )
}
