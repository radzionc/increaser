import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { hStack } from '@lib/ui/css/stack'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { ProgressProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

import { checklistConfig } from './config'
import { useIsChecklistOpen } from './state/isChecklistOpen'

const IconContainer = styled(IconWrapper)`
  ${sameDimensions(checklistConfig.dragHandleWidth)};
  font-size: 16px;
`

const Container = styled(UnstyledButton)`
  ${hStack({
    alignItems: 'center',
    gap: checklistConfig.dragHandleContentGap,
  })}
  ${verticalPadding(tightListItemConfig.verticalPadding)};

  &:hover ${IconContainer} {
    color: ${getColor('contrast')};
  }
`

export const TaskChecklistHeader = ({ target, current }: ProgressProps) => {
  const [isOpen, setIsOpen] = useIsChecklistOpen()

  return (
    <Container onClick={() => setIsOpen(!isOpen)}>
      <IconContainer>
        <CollapsableStateIndicator isOpen={isOpen} />
      </IconContainer>
      <Text weight="600">Sub-tasks</Text>
      <Text size={12} color="supporting">
        {current}/{target}
      </Text>
    </Container>
  )
}
