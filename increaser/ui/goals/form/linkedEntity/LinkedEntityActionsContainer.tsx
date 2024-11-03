import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

const Separator = styled.div`
  width: 1px;
  height: 28px;
  background: ${getColor('mistExtra')};
`

export const LinkedEntityActionsContainer: React.FC<
  ComponentWithChildrenProps
> = ({ children }) => (
  <HStackSeparatedBy
    style={{ marginLeft: -tightListItemConfig.horizontalOffset }}
    alignItems="center"
    separator={<Separator />}
    gap={4}
  >
    {children}
  </HStackSeparatedBy>
)
