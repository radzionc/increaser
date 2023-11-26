import { ReactNode } from 'react'
import styled from 'styled-components'
import { transition } from '../css/transition'
import { HStack } from '../layout/Stack'
import { Panel, PanelProps } from './Panel'
import { getColor } from '../theme/getters'
import { useBoolean } from '../hooks/useBoolean'
import { centerContent } from '../css/centerContent'
import { sameDimensions } from '../css/sameDimensions'
import { interactive } from '../css/interactive'
import { round } from '../css/round'
import { ChevronDownIcon } from '../icons/ChevronDownIcon'

interface ExpandableProps extends PanelProps {
  header: ReactNode
  renderContent: () => ReactNode
}

const ExpandIconWrapper = styled.div<{ isExpanded: boolean }>`
  ${round};
  ${sameDimensions(40)};
  ${centerContent};

  background: ${getColor('mist')};

  ${transition};

  font-size: 20px;

  transform: rotateZ(${({ isExpanded }) => (isExpanded ? '-180deg' : '0deg')});
`

const Header = styled.div`
  ${interactive};
  ${centerContent};
  ${transition};

  :hover ${ExpandIconWrapper} {
    background: ${({ theme }) => theme.colors.mistExtra.toCssValue()};
  }
`

export const ExpandablePanel = ({
  header,
  renderContent,
  ...panelProps
}: ExpandableProps) => {
  const [isExpanded, { toggle }] = useBoolean(false)

  return (
    <Panel withSections {...panelProps}>
      <Header onClick={toggle}>
        <HStack fullWidth justifyContent="space-between" alignItems="center">
          {header}
          <ExpandIconWrapper isExpanded={isExpanded}>
            <ChevronDownIcon />
          </ExpandIconWrapper>
        </HStack>
      </Header>
      {isExpanded && renderContent()}
    </Panel>
  )
}
