import { Button } from '@lib/ui/buttons/Button'
import {
  ClickableComponentProps,
  ComponentWithChildrenProps,
  UIComponentProps,
} from '@lib/ui/props'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'

type ShyFocusButtonProps = UIComponentProps &
  ComponentWithChildrenProps &
  ClickableComponentProps & {
    icon?: React.ReactNode
  }

const Container = styled(Button)`
  color: ${getColor('text')};
  font-weight: 600;
  background: ${getColor('background')};
  border: 1px solid ${getColor('mist')};
  height: 32px;
  &:hover {
    color: ${getColor('contrast')};
    background: ${getColor('foreground')};
  }

  svg {
    color: ${getColor('textShy')};
    margin-right: 4px;
  }
`

export const ShyFocusButton = ({
  children,
  icon,
  ...rest
}: ShyFocusButtonProps) => (
  <Container size="xs" {...rest} kind="secondary">
    {icon && <IconWrapper>{icon}</IconWrapper>}
    {children}
  </Container>
)
