import styled from 'styled-components'
import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'
import { hStack, vStack } from '@lib/ui/css/stack'
import { sidebarConfig } from '@increaser/app/navigation/Sidebar/config'
import { GoalsEducationItems } from './GoalsEducationItems'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { PageTitle } from '@lib/ui/text/PageTitle'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'

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
