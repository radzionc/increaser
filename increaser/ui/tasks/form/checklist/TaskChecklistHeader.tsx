import styled from 'styled-components'
import { useIsChecklistOpen } from './state/isChecklistOpen'
import { hStack } from '@lib/ui/css/stack'
import { checklistConfig } from './config'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { getColor } from '@lib/ui/theme/getters'
import { Text } from '@lib/ui/text'
import { ProgressComponentProps } from '@lib/ui/props'

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

export const TaskChecklistHeader = ({
  target,
  current,
}: ProgressComponentProps) => {
  const [isOpen, setIsOpen] = useIsChecklistOpen()

  return (
    <Container onClick={() => setIsOpen(!isOpen)} type="button">
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
