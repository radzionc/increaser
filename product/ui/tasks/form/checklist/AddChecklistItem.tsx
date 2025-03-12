import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { hStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { OnClickProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

import { checklistConfig } from './config'

const Container = styled(UnstyledButton)`
  width: 100%;
  padding-left: ${toSizeUnit(
    checklistConfig.dragHandleWidth + checklistConfig.dragHandleContentGap,
  )};
  ${verticalPadding(tightListItemConfig.verticalPadding)};
  ${hStack({
    alignItems: 'center',
    gap: tightListItemConfig.gap,
  })}

  color: ${getColor('textSupporting')};

  &:hover {
    color: ${getColor('textPrimary')};
  }
`

const IconContainer = styled(IconWrapper)`
  color: ${getColor('textPrimary')};
  ${sameDimensions(tightListItemConfig.lineHeight)};
  font-size: 16px;
`

export const AddChecklistItem = ({ onClick }: OnClickProp) => {
  return (
    <Container onClick={onClick}>
      <IconContainer>
        <PlusIcon />
      </IconContainer>
      Add a sub-task
    </Container>
  )
}
