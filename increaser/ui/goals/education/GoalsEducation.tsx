import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { VStack } from '@lib/ui/layout/Stack'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'
import { ComponentWithActiveState } from '@lib/ui/props'

import { borderRadius } from '@lib/ui/css/borderRadius'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { GoalsEducationItems } from './GoalsEducationItems'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { PageHeader } from '@increaser/app/ui/page/header/PageHeader'
import { interactive } from '@lib/ui/css/interactive'

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

const Header = styled(PageHeader)`
  ${interactive};
  border: none;

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
      <Header
        onClick={() => setIsGoalsEducationOpen(!isGoalsEducationOpen)}
        controls={<Toggle isOpen={isGoalsEducationOpen} />}
      >
        <SectionTitle>Wisdom</SectionTitle>
      </Header>
      {isGoalsEducationOpen && <GoalsEducationItems />}
    </Container>
  )
}
