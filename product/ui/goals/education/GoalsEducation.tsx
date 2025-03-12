import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { hStack, vStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { PageTitle } from '@lib/ui/text/PageTitle'
import { sidebarConfig } from '@product/app/navigation/Sidebar/config'
import styled from 'styled-components'

import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'

import { GoalsEducationItems } from './GoalsEducationItems'

const Container = styled.div`
  ${vStack({
    gap: sidebarConfig.gap,
  })}
`

const Collapse = styled(CollapsableStateIndicator)`
  font-size: 16px;
`

const Header = styled(UnstyledButton)`
  height: ${toSizeUnit(sidebarConfig.headerHeight)};

  ${hStack({
    justifyContent: 'space-between',
    alignItems: 'center',
    fullWidth: true,
  })}
`

export const GoalsEducation = () => {
  const [isOpen, setIsOpen] = usePersistentState<boolean>(
    PersistentStateKey.IsGoalsEducationOpen,
    true,
  )

  return (
    <Container>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <PageTitle>Wisdom</PageTitle>
        <Collapse isOpen={isOpen} />
      </Header>
      {isOpen && <GoalsEducationItems />}
    </Container>
  )
}
