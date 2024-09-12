import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'
import { checklistConfig } from './config'
import { hStack } from '@lib/ui/css/stack'
import { ClickableComponentProps } from '@lib/ui/props'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { getColor } from '@lib/ui/theme/getters'
import { verticalPadding } from '@lib/ui/css/verticalPadding'

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

export const AddChecklistItem = ({ onClick }: ClickableComponentProps) => {
  return (
    <Container onClick={onClick} type="button">
      <IconContainer>
        <PlusIcon />
      </IconContainer>
      Add a sub-task
    </Container>
  )
}
