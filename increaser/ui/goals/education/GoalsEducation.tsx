import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { VStack } from '@lib/ui/layout/Stack'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'
import { ComponentWithActiveState } from '@lib/ui/props'
import { PageTitle } from '@increaser/app/ui/page/PageTitle'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { GoalsEducationItems } from './GoalsEducationItems'

const Container = styled(VStack)<ComponentWithActiveState>`
  gap: 40px;
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
  ${borderRadius.s};
  ${sameDimensions(40)};
  border: 1px solid ${getColor('mistExtra')};

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

  &:hover ${Toggle} {
    color: ${getColor('contrast')};
    background: ${getColor('mist')};
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
        <PageTitle>Wisdom</PageTitle>
        <Toggle isOpen={isGoalsEducationOpen} />
      </Header>
      {isGoalsEducationOpen && <GoalsEducationItems />}
    </Container>
  )
}
