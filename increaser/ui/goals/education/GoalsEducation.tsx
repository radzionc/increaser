import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { VStack } from '@lib/ui/layout/Stack'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'
import { Text } from '@lib/ui/text'
import { ComponentWithActiveState } from '@lib/ui/props'

const Container = styled(VStack)<ComponentWithActiveState>`
  gap: 20px;
  flex: 1;
  border-left: 1px dashed transparent;

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${getColor('mistExtra')};
    `}
  padding-left: 20px;
`

const Toggle = styled(CollapsableStateIndicator)`
  font-size: 16px;

  color: ${getColor('textSupporting')};
`

const Header = styled(UnstyledButton)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: space-between;

  ${Toggle} {
    color: ${getColor('contrast')};
  }
`

export const GoalsEducation = () => {
  const [isGoalsEducationOpen, setIsGoalsEducationOpen] = usePersistentState(
    PersistentStateKey.IsGoalsEducationOpen,
    true,
  )
  return (
    <Container isActive={isGoalsEducationOpen}>
      <Header onClick={() => setIsGoalsEducationOpen(!isGoalsEducationOpen)}>
        <SectionTitle>Goals wisdom</SectionTitle>
        <Toggle isOpen={isGoalsEducationOpen} />
      </Header>
      {isGoalsEducationOpen && (
        <Text size={14} height="large">
          Set practical and achievable goals that will bring you closer to your
          perfect life vision. Break down each goal into manageable steps, and
          focus on consistent progress rather than perfection. Remember to track
          your progress and adjust your goals as needed to stay aligned with
          your evolving vision.
        </Text>
      )}
    </Container>
  )
}
