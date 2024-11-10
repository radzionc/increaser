import styled from 'styled-components'
import { ComponentWithChildrenProps, UIComponentProps } from '../props'
import { getColor } from '../theme/getters'
import { borderRadius } from '../css/borderRadius'
import { HStack } from '@lib/ui/css/stack'
import { UnstyledButton } from '../buttons/UnstyledButton'
import { transition } from '../css/transition'
import { CloseIcon } from '../icons/CloseIcon'
import { centerContent } from '../css/centerContent'
import { sameDimensions } from '../css/sameDimensions'
import { toSizeUnit } from '../css/toSizeUnit'

type IncludedItemProps = ComponentWithChildrenProps &
  UIComponentProps & {
    onRemove?: () => void
  }

const closeButtonSize = 36
const offset = 2

const Container = styled(HStack)`
  background: ${getColor('foreground')};
  ${borderRadius.s}
  align-items: center;
  justify-content: space-between;
  padding: ${toSizeUnit(offset)};
  padding-left: 12px;
  height: ${toSizeUnit(closeButtonSize + offset * 2)};
  gap: 8px;
`

const Button = styled(UnstyledButton)`
  height: 100%;
  ${sameDimensions(closeButtonSize)};
  ${borderRadius.s}
  ${transition};
  ${centerContent};
  font-size: 18px;
  flex-shrink: 0;
  &:hover {
    background: ${getColor('mist')};
    color: ${getColor('contrast')};
  }
`

export const IncludedItem = ({
  children,
  onRemove,
  ...rest
}: IncludedItemProps) => {
  return (
    <Container {...rest}>
      {children}
      {onRemove && (
        <Button onClick={onRemove}>
          <CloseIcon />
        </Button>
      )}
    </Container>
  )
}
