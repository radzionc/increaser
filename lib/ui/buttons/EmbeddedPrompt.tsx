import { ReactNode } from 'react'
import { ClickableComponentProps, ComponentWithChildrenProps } from '../props'
import { UnstyledButton } from './UnstyledButton'
import styled from 'styled-components'
import { interactive } from '../css/interactive'
import { verticalPadding } from '../css/verticalPadding'
import { getColor } from '../theme/getters'
import { PrefixedItemFrame } from '../list/PrefixedItemFrame'

type EmbeddedPromptProps = ComponentWithChildrenProps &
  ClickableComponentProps & {
    icon: ReactNode
  }

const Container = styled(UnstyledButton)`
  ${interactive};
  ${verticalPadding(12)};

  &:hover {
    background: ${getColor('foreground')};
    color: ${getColor('contrast')};
  }
`

export const EmbeddedPrompt = ({
  children,
  icon,
  onClick,
}: EmbeddedPromptProps) => (
  <Container onClick={onClick}>
    <PrefixedItemFrame prefix={icon}>{children}</PrefixedItemFrame>
  </Container>
)
